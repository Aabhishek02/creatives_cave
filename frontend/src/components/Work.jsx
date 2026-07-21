import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import { WORK } from '@/constants/testIds';

const IMG = {
  sangeet: '/work/sangeet-tee.jpg',
  lust: '/work/lust-poster.jpg',
  dream: '/work/dream1-poster.jpg',
};

const SECTORS = [
  {
    n: '01',
    code: 'SECTOR_01',
    label: 'Posters',
    caption: 'concept art · editorial · dark narrative',
    tools: 'ps · ai',
    pieces: [
      { kind: 'image', title: 'Dream I', concept: 'Placeholder title — send over the real name + a one-line concept and I\u2019ll swap it in.', src: IMG.dream, ratio: 'ratio-3-4', anchor: true },
      { kind: 'image', title: 'Lust', concept: 'An intense, often overwhelming craving \u2014 for power, money, or experience.', src: IMG.lust, ratio: 'ratio-3-4' },
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
      { kind: 'signal', title: 'Menu concept // pending' },
      { kind: 'signal', title: 'HUD study // pending' },
      { kind: 'signal', title: 'Untitled // dropping soon' },
    ],
  },
  {
    n: '03',
    code: 'SECTOR_03',
    label: 'Merch',
    caption: 'tees · caps · zines',
    tools: 'ai · id · ps',
    pieces: [
      { kind: 'image', title: 'Sangeet — Play/Pause/Repeat', concept: 'Devanagari lockup on an oversized tee \u2014 music as a marionette string to the soul.', src: IMG.sangeet, ratio: 'ratio-16-10', anchor: true },
      { kind: 'signal', title: 'Drop 02 // in transmission' },
      { kind: 'signal', title: 'Untitled // dropping soon' },
    ],
  },
  {
    n: '04',
    code: 'SECTOR_04',
    label: 'Album & Motion',
    caption: 'covers · loops · lyric films',
    tools: 'ps · ae',
    pieces: [
      { kind: 'signal', title: 'Cover concept // in progress' },
      { kind: 'signal', title: 'Loop study // pending' },
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
