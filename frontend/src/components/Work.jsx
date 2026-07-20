import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import { WORK } from '@/constants/testIds';

const IMG = {
  a: 'https://images.unsplash.com/photo-1747058964292-da7b5a4bf1cf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBzdHJlZXQlMjBuZW9uJTIwbmlnaHR8ZW58MHx8fHwxNzg0NTM2NjkwfDA&ixlib=rb-4.1.0&q=85',
  b: 'https://images.unsplash.com/photo-1703698144961-3386ae9b3598?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzdHJlZXQlMjBuZW9uJTIwbmlnaHR8ZW58MHx8fHwxNzg0NTM2NjkwfDA&ixlib=rb-4.1.0&q=85',
  c: 'https://images.unsplash.com/photo-1656665508464-9c7a0046459d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwzfHxpbmRpYW4lMjBzdHJlZXQlMjBuZW9uJTIwbmlnaHR8ZW58MHx8fHwxNzg0NTM2NjkwfDA&ixlib=rb-4.1.0&q=85',
  d: 'https://images.pexels.com/photos/17195067/pexels-photo-17195067.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  e: 'https://images.unsplash.com/photo-1548317202-26d94742e8d8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxjeWJlcnB1bmslMjBuZW9uJTIwc3RyZWV0fGVufDB8fHx8MTc4NDUzNjY5MHww&ixlib=rb-4.1.0&q=85',
  f: 'https://images.pexels.com/photos/20278552/pexels-photo-20278552.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  g: 'https://images.unsplash.com/photo-1765445773906-64a36ecfd20e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwzfHxjcnQlMjBtb25pdG9yJTIwZ2xpdGNoJTIwYWJzdHJhY3R8ZW58MHx8fHwxNzg0NTM2NjkwfDA&ixlib=rb-4.1.0&q=85',
  h: 'https://images.unsplash.com/photo-1610337673044-720471f83677?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwyfHxjcnQlMjBtb25pdG9yJTIwZ2xpdGNoJTIwYWJzdHJhY3R8ZW58MHx8fHwxNzg0NTM2NjkwfDA&ixlib=rb-4.1.0&q=85',
};

const SECTORS = [
  {
    n: '01',
    code: 'SECTOR_01',
    label: 'Posters',
    caption: 'street-culture · film-teasers · gig-flyers',
    tools: 'ps · ai · ae',
    pieces: [
      { kind: 'image', title: 'Neon Bazaar Vol.03', concept: 'A speculative Diwali arcade poster \u2014 lakshmi meets laser.', src: IMG.a, ratio: 'ratio-3-4', anchor: true },
      { kind: 'image', title: 'Bombay 2087', concept: 'Rickshaw grid, dot-matrix headline, rain of magenta.', src: IMG.b, ratio: 'ratio-3-4' },
      { kind: 'signal', title: 'Untitled // dropping soon' },
    ],
  },
  {
    n: '02',
    code: 'SECTOR_02',
    label: 'Game UI',
    caption: 'HUDs · menus · shader vibes',
    tools: 'figma · ae · ps',
    pieces: [
      { kind: 'image', title: 'CAVE//RUN — Boot HUD', concept: 'A CRT boot HUD for a 2D speedrunner. Diagetic UI, subtle chroma.', src: IMG.d, ratio: 'ratio-16-10', anchor: true },
      { kind: 'image', title: 'Signal Sync — Menu', concept: 'Main menu with hard grid, magenta accents, keyboard-first nav.', src: IMG.e, ratio: 'ratio-4-5' },
      { kind: 'signal', title: 'Rogue.Prakash // decrypting' },
    ],
  },
  {
    n: '03',
    code: 'SECTOR_03',
    label: 'Merch',
    caption: 'tees · caps · zines',
    tools: 'ai · id · ps',
    pieces: [
      { kind: 'image', title: 'Cave Crew Tee — Drop 01', concept: 'Type-driven tee, bilingual back-print, glow-in-the-dark neon.', src: IMG.f, ratio: 'ratio-4-5', anchor: true },
      { kind: 'image', title: 'Manifesto Zine', concept: '24-page riso zine \u2014 process shots, sketches, glossary.', src: IMG.c, ratio: 'ratio-4-5' },
      { kind: 'signal', title: 'CAVE 002 // in transmission' },
    ],
  },
  {
    n: '04',
    code: 'SECTOR_04',
    label: 'Album & Motion',
    caption: 'covers · loops · lyric films',
    tools: 'ps · ae',
    pieces: [
      { kind: 'image', title: 'Static / Sitar EP', concept: 'Cover art for an experimental EP \u2014 static-torn silhouette + sitar rig.', src: IMG.g, ratio: 'ratio-4-5', anchor: true },
      { kind: 'image', title: 'Loop_014', concept: 'Looping motion piece \u2014 chromatic scan + kanji-style devanagari.', src: IMG.h, ratio: 'ratio-4-5' },
      { kind: 'signal', title: 'Untitled Lyric Film' },
    ],
  },
];

export default function Work() {
  return (
    <section
      id="work"
      data-testid={WORK.root}
      className="relative w-full bg-[#020403] py-28 md:py-40 border-t border-[#132b1a]"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#3b5e45]">/ sector_04</div>
            <div className="mt-2 font-mono text-[13px] text-[#00FF41]">$ ls ./work/ --curated</div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2
              className="font-display uppercase tracking-[-0.02em] text-[#E4EDE6] glitch-hover"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4.2rem)', lineHeight: 0.95 }}
            >
              Field Archive
            </h2>
            <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.28em] text-[#3b5e45]">
              four sectors · anchor pieces · in-transmission slots
            </div>
          </div>
        </div>

        {/* Sectors */}
        <div className="mt-20 md:mt-28 flex flex-col gap-24 md:gap-40">
          {SECTORS.map((s, i) => (
            <SectorBlock key={s.n} sector={s} flip={i % 2 === 1} />
          ))}
        </div>
      </div>

      {/* Editorial marquee */}
      <div className="mt-28 md:mt-40 border-y border-[#132b1a] py-6 bg-[#040805]" data-testid={WORK.marquee}>
        <div className="marquee-mask">
          <Marquee gradient={false} speed={35} pauseOnHover>
            {[
              'CREATIVES_CAVE',
              'DESIGN@INTERSECTION',
              'INDIAN_VISUAL_CULTURE',
              'RETRO_FUTURISM',
              'POSTERS',
              'GAME_UI',
              'MERCH',
              'MOTION',
              'SIGNAL_SYNCING',
              'NEW_DELHI//2087',
            ].map((w, i) => (
              <span key={i} className="mx-10 md:mx-14 font-display font-black uppercase tracking-[-0.02em] text-[#E4EDE6]" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', lineHeight: 1 }}>
                <span className="text-[#00FF41] mr-6">◈</span>{w}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

function SectorBlock({ sector, flip }) {
  const anchor = sector.pieces.find((p) => p.anchor) || sector.pieces[0];
  const rest = sector.pieces.filter((p) => p !== anchor);

  return (
    <div data-testid={WORK.sector} className="grid grid-cols-12 gap-6">
      {/* Header */}
      <div className="col-span-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="flex items-baseline gap-5">
          <div className="chapter-num">{sector.n}</div>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#00FF41]">{sector.code}</div>
            <h3 className="font-display uppercase text-[#E4EDE6]" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)', lineHeight: 1 }}>
              {sector.label}
            </h3>
          </div>
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#3b5e45]">
          {sector.caption} · tools: <span className="text-[#E4EDE6]">{sector.tools}</span>
        </div>
      </div>

      {/* Anchor piece — big */}
      <div className={`col-span-12 lg:col-span-8 ${flip ? 'lg:order-2' : ''}`}>
        <Piece piece={anchor} big />
      </div>

      {/* Secondary column */}
      <div className={`col-span-12 lg:col-span-4 flex flex-col gap-6 ${flip ? 'lg:order-1' : ''}`}>
        {rest.map((p, i) => (
          <Piece key={i} piece={p} />
        ))}
      </div>
    </div>
  );
}

function Piece({ piece, big = false }) {
  if (piece.kind === 'signal') return <SignalTile title={piece.title} big={big} />;

  return (
    <motion.figure
      data-testid={WORK.anchorTile}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className={`relative overflow-hidden border border-[#132b1a] ${piece.ratio || 'ratio-4-5'} bg-[#040805]`}>
        {/* Clipped frame corners */}
        <span aria-hidden className="absolute z-20 top-2 left-2 w-4 h-[1px] bg-[#00FF41]" />
        <span aria-hidden className="absolute z-20 top-2 left-2 w-[1px] h-4 bg-[#00FF41]" />
        <span aria-hidden className="absolute z-20 top-2 right-2 w-4 h-[1px] bg-[#00FF41]" />
        <span aria-hidden className="absolute z-20 top-2 right-2 w-[1px] h-4 bg-[#00FF41]" />
        <span aria-hidden className="absolute z-20 bottom-2 left-2 w-4 h-[1px] bg-[#00FF41]" />
        <span aria-hidden className="absolute z-20 bottom-2 left-2 w-[1px] h-4 bg-[#00FF41]" />
        <span aria-hidden className="absolute z-20 bottom-2 right-2 w-4 h-[1px] bg-[#00FF41]" />
        <span aria-hidden className="absolute z-20 bottom-2 right-2 w-[1px] h-4 bg-[#00FF41]" />

        {/* Spotlight vignette */}
        <div aria-hidden className="absolute inset-0 z-10 pointer-events-none"
             style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(0,0,0,0.55) 100%)' }} />
        {/* Scanline overlay per-tile (light) */}
        <div aria-hidden className="absolute inset-0 z-10 pointer-events-none opacity-60"
             style={{ background: 'repeating-linear-gradient(to bottom, rgba(0,255,65,0.05) 0 1px, transparent 1px 3px)' }} />

        <motion.img
          src={piece.src}
          alt={piece.title}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1.0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter: 'saturate(0.85) contrast(1.05)' }}
        />
        {/* Hover glitch layer */}
        <span aria-hidden className="absolute inset-0 z-[5] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ boxShadow: 'inset 3px 0 0 rgba(255,0,255,0.35), inset -3px 0 0 rgba(0,255,255,0.35)' }} />

        {/* Meta bar */}
        <div className="absolute z-20 left-3 top-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#00FF41]">
          {piece.title}
        </div>
        <div className="absolute z-20 right-3 top-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#3b5e45]">
          {big ? 'anchor' : 'iter'}
        </div>
      </div>
      <figcaption className="mt-4 flex items-start justify-between gap-6">
        <p className="max-w-[520px] font-mono text-[13px] text-[#E4EDE6]/80 leading-[1.7]">
          <span className="text-[#00FF41]">&gt; </span>{piece.concept}
        </p>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.28em] text-[#3b5e45]">read_case &nbsp;→</span>
      </figcaption>
    </motion.figure>
  );
}

function SignalTile({ title, big }) {
  return (
    <div
      data-testid={WORK.signalTile}
      className={`signal-tile relative ${big ? 'ratio-16-10' : 'ratio-4-5'}`}
    >
      <div className="absolute inset-0 flex flex-col items-start justify-between p-5">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#00FF41]">
          <span className="inline-block w-1.5 h-1.5 bg-[#00FF41] animate-pulse shadow-[0_0_10px_#00FF41]" />
          signal_loading
        </div>
        <div>
          <div className="font-display uppercase text-[#E4EDE6]" style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)', lineHeight: 1.05 }}>
            {title}
          </div>
          <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.28em] text-[#3b5e45]">
            in_transmission · eta_soon
          </div>
        </div>
      </div>
    </div>
  );
}
