from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import httpx
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Emergent managed email (constant base URL — do NOT read from env)
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "Creatives Cave")
OWNER_EMAIL = os.environ.get("OWNER_EMAIL", "abhishek@creativescave.dev")

app = FastAPI(title="Creatives Cave // Terminal API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactMessageCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(min_length=1, max_length=4000)
    callsign: Optional[str] = None  # honeypot field — must be empty


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    email_sent: bool = False


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "creatives_cave://online", "status": "available"}


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check.get('timestamp'), str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(inp: StatusCheckCreate):
    obj = StatusCheck(**inp.model_dump())
    doc = obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return obj


def _build_email_html(name: str, email: str, message: str) -> str:
    safe_msg = (message or "").replace("<", "&lt;").replace(">", "&gt;").replace("\n", "<br/>")
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#020403;padding:32px 0;font-family:'Azeret Mono',monospace;">
      <tr><td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#080c09;border:1px solid #132b1a;color:#E4EDE6;">
          <tr><td style="padding:24px 28px;border-bottom:1px solid #132b1a;">
            <div style="color:#00FF41;font-size:12px;letter-spacing:.24em;text-transform:uppercase;">creatives_cave // incoming_transmission</div>
            <div style="color:#E4EDE6;font-size:22px;margin-top:8px;">New signal from <span style="color:#00FF41">{name}</span></div>
          </td></tr>
          <tr><td style="padding:24px 28px;">
            <div style="color:#3b5e45;font-size:11px;letter-spacing:.2em;text-transform:uppercase;">> callsign</div>
            <div style="color:#E4EDE6;font-size:14px;margin:6px 0 18px;">{name}</div>
            <div style="color:#3b5e45;font-size:11px;letter-spacing:.2em;text-transform:uppercase;">> channel</div>
            <div style="color:#00FF41;font-size:14px;margin:6px 0 18px;">{email}</div>
            <div style="color:#3b5e45;font-size:11px;letter-spacing:.2em;text-transform:uppercase;">> payload</div>
            <div style="color:#E4EDE6;font-size:14px;line-height:1.7;margin-top:8px;border-left:2px solid #00FF41;padding:6px 0 6px 14px;">{safe_msg}</div>
          </td></tr>
          <tr><td style="padding:16px 28px;border-top:1px solid #132b1a;color:#3b5e45;font-size:11px;">
            connection_established @ {datetime.now(timezone.utc).isoformat()}
          </td></tr>
        </table>
      </td></tr>
    </table>
    """


async def _send_notification_email(msg: ContactMessage):
    if not EMAIL_KEY:
        logger.warning("EMERGENT_EMAIL_KEY not configured — skipping email notification")
        return False
    payload = {
        "to": [OWNER_EMAIL],
        "subject": f"[creatives_cave] Incoming transmission — {msg.name}",
        "html": _build_email_html(msg.name, msg.email, msg.message),
        "from_name": EMAIL_FROM_NAME,
        "contact_email": msg.email,
    }
    try:
        async with httpx.AsyncClient(timeout=30) as http:
            resp = await http.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return True
    except httpx.HTTPStatusError as e:
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        return False
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        return False


@api_router.post("/contact", response_model=ContactMessage)
async def submit_contact(payload: ContactMessageCreate):
    # honeypot — silently reject
    if payload.callsign:
        raise HTTPException(status_code=400, detail="Signal rejected")

    msg = ContactMessage(
        name=payload.name.strip(),
        email=payload.email,
        message=payload.message.strip(),
    )
    email_ok = await _send_notification_email(msg)
    msg.email_sent = email_ok

    doc = msg.model_dump()
    await db.contact_messages.insert_one(doc)
    return msg


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contact_messages(limit: int = 50):
    items = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return items


# Include router + CORS
app.include_router(api_router)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
