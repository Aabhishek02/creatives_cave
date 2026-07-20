import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { CONTACT } from '@/constants/testIds';
import { Instagram, Mail, ExternalLink, Send } from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SOCIALS = [
  { key: 'instagram', label: '@also.abhiishek', href: 'https://instagram.com/also.abhiishek', icon: Instagram, testid: CONTACT.socialInstagram },
  { key: 'behance',   label: 'behance.net',      href: 'https://www.behance.net/',            icon: ExternalLink, testid: CONTACT.socialBehance },
  { key: 'fiverr',    label: 'fiverr.com',       href: 'https://www.fiverr.com/',             icon: ExternalLink, testid: CONTACT.socialFiverr },
  { key: 'email',     label: 'hello@cave.dev',   href: 'mailto:hello@creativescave.dev',      icon: Mail, testid: CONTACT.socialEmail },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '', callsign: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Signal incomplete — fill all channels.');
      return;
    }
    setStatus('sending');
    try {
      await axios.post(`${API}/contact`, form);
      toast.success('Signal received. I\u2019ll answer within 24h.');
      setStatus('success');
      setForm({ name: '', email: '', message: '', callsign: '' });
    } catch (err) {
      console.error(err);
      toast.error('Transmission failed. Try again.');
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      data-testid={CONTACT.root}
      className="relative w-full bg-[#020403] py-28 md:py-40 border-t border-[#132b1a]"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#3b5e45]">/ sector_05</div>
            <div className="mt-2 font-mono text-[13px] text-[#00FF41]">$ ./connect --open-channel</div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2
              className="font-display uppercase tracking-[-0.02em] text-[#E4EDE6] glitch-hover"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4.2rem)', lineHeight: 0.95 }}
            >
              Open the Channel
            </h2>
            <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.28em] text-[#3b5e45]">
              posters · game_ui · album_art · merch · motion — freelance slots open
            </div>
          </div>
        </div>

        {/* Status badge */}
        <div className="mt-8">
          <span
            data-testid={CONTACT.statusBadge}
            className="inline-flex items-center gap-2 border border-[#132b1a] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#E4EDE6]"
          >
            <span className="w-1.5 h-1.5 bg-[#00FF41] shadow-[0_0_10px_#00FF41] animate-pulse" />
            status: available · avg response 24h
          </span>
        </div>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-12 gap-6">
          {/* Form */}
          <motion.form
            data-testid={CONTACT.form}
            onSubmit={submit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 lg:col-span-8 border border-[#132b1a] bg-[#080c09]"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#132b1a] text-[10px] uppercase tracking-[0.28em] text-[#3b5e45]">
              <span className="text-[#00FF41]">terminal // /contact</span>
              <span>encoding: utf-8</span>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <Field label="callsign" prompt="name">
                <input
                  data-testid={CONTACT.nameInput}
                  className="term-input"
                  placeholder="type your name_"
                  value={form.name}
                  onChange={set('name')}
                  autoComplete="name"
                />
              </Field>
              <Field label="channel" prompt="email">
                <input
                  data-testid={CONTACT.emailInput}
                  className="term-input"
                  placeholder="you@domain_"
                  value={form.email}
                  onChange={set('email')}
                  type="email"
                  autoComplete="email"
                />
              </Field>
              <Field label="payload" prompt="msg">
                <textarea
                  data-testid={CONTACT.messageInput}
                  className="term-input resize-none"
                  placeholder="brief · project scope · timing_"
                  value={form.message}
                  onChange={set('message')}
                  rows={5}
                />
              </Field>

              {/* Honeypot — hidden from real users */}
              <input
                type="text"
                value={form.callsign}
                onChange={set('callsign')}
                autoComplete="off"
                tabIndex={-1}
                aria-hidden
                style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }}
              />

              <div className="pt-2 flex items-center justify-between gap-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#3b5e45]">
                  &gt; press submit_ to transmit
                </div>
                <button
                  data-testid={CONTACT.submitButton}
                  type="submit"
                  disabled={status === 'sending'}
                  className="term-btn term-btn--hot disabled:opacity-60"
                >
                  <span>{status === 'sending' ? 'transmitting_' : status === 'success' ? 're_send' : 'transmit'}</span>
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.form>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div className="border border-[#132b1a] bg-[#060a07] p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#3b5e45]">> direct_lines</div>
              <div className="mt-4 flex flex-col gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.key}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    data-testid={s.testid}
                    className="group flex items-center justify-between border border-[#132b1a] px-4 py-3 hover:border-[#00FF41] hover:bg-[#080c09] transition-colors"
                  >
                    <span className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.22em] text-[#E4EDE6] group-hover:text-[#00FF41]">
                      <s.icon size={14} />
                      {s.label}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#3b5e45] group-hover:text-[#00FF41]">→</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="border border-[#132b1a] bg-[#060a07] p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#3b5e45]">> operating_window</div>
              <div className="mt-4 space-y-2 font-mono text-[12px] text-[#E4EDE6]">
                <div><span className="text-[#3b5e45]">mon–fri</span> · 10:00–20:00 IST</div>
                <div><span className="text-[#3b5e45]">sat</span> · quiet hours · async only</div>
                <div><span className="text-[#3b5e45]">sun</span> · off-grid</div>
              </div>
              <div className="mt-6 text-[10px] uppercase tracking-[0.28em] text-[#00FF41]">
                &gt; end_transmission
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, prompt, children }) {
  return (
    <label className="block">
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-[#3b5e45]">
        <span>&gt;</span>
        <span>{label}</span>
        <span className="text-[#00FF41]">// {prompt}</span>
      </div>
      <div className="mt-1">{children}</div>
    </label>
  );
}
