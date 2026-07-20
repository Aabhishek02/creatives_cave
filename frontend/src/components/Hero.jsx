import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HERO } from '@/constants/testIds';
import { ArrowDownRight, Terminal } from 'lucide-react';

const BOOT_LINES = [
  { cmd: '> boot creatives_cave.exe', out: 'loading kernel ......................... [ok]' },
  { cmd: '> auth --user=abhishek --role=designer', out: 'handshake complete // access granted' },
  { cmd: '> whoami', out: 'abhishek // graphic designer // creatives_cave' },
  { cmd: '> load_portfolio.exe', out: 'decrypting archive ..................... 100%' },
];

const HEADLINE = [
  'DESIGN AT THE',
  'INTERSECTION OF',
  'INDIAN VISUAL',
  'CULTURE //',
  'RETRO-FUTURISM',
];

function useTyping(lines, onKeystroke) {
  const [state, setState] = useState({ i: 0, cmd: '', out: '', phase: 'cmd', done: false });

  useEffect(() => {
    if (state.done) return;
    const line = lines[state.i];
    if (!line) return;

    if (state.phase === 'cmd') {
      if (state.cmd.length < line.cmd.length) {
        const t = setTimeout(() => {
          onKeystroke?.();
          setState((s) => ({ ...s, cmd: line.cmd.slice(0, s.cmd.length + 1) }));
        }, 22 + Math.random() * 30);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setState((s) => ({ ...s, phase: 'out' })), 220);
      return () => clearTimeout(t);
    }

    if (state.phase === 'out') {
      if (state.out.length < line.out.length) {
        const t = setTimeout(() => {
          setState((s) => ({ ...s, out: line.out.slice(0, s.out.length + 1) }));
        }, 8);
        return () => clearTimeout(t);
      }
      const isLast = state.i === lines.length - 1;
      const t = setTimeout(() => {
        if (isLast) setState((s) => ({ ...s, done: true }));
        else setState((s) => ({ i: s.i + 1, cmd: '', out: '', phase: 'cmd', done: false }));
      }, 380);
      return () => clearTimeout(t);
    }
  }, [state, lines, onKeystroke]);

  return state;
}

export default function Hero({ onKeystroke, onClick }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const chroma = useTransform(scrollYProgress, [0, 1], [0, 4]);

  const typing = useTyping(BOOT_LINES, onKeystroke);
  const bootDone = typing.done;

  const scrollNext = () => {
    const el = document.getElementById('about');
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -20 });
    else el.scrollIntoView({ behavior: 'smooth' });
    onClick?.();
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      data-testid={HERO.root}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#020403] crt-flicker"
    >
      {/* Synthwave grid horizon */}
      <div className="synth-sun" aria-hidden />
      <div className="synth-grid" aria-hidden>
        <div className="synth-grid-inner" />
      </div>

      {/* Corner brackets */}
      <CornerBracket className="top-16 left-6 md:top-20 md:left-10" />
      <CornerBracket className="top-16 right-6 md:top-20 md:right-10" flip="x" />
      <CornerBracket className="bottom-6 left-6 md:bottom-10 md:left-10" flip="y" />
      <CornerBracket className="bottom-6 right-6 md:bottom-10 md:right-10" flip="xy" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-10 pt-28 md:pt-32 pb-24 grid grid-cols-12 gap-6"
      >
        {/* Left column — terminal boot */}
        <div className="col-span-12 md:col-span-5 lg:col-span-5">
          <div className="border border-[#132b1a] bg-[#080c09]/80 backdrop-blur-sm">
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#132b1a] text-[10px] tracking-[0.28em] uppercase text-[#3b5e45]">
              <span className="flex items-center gap-2 text-[#00FF41]">
                <Terminal size={12} /> tty0 // boot_sequence
              </span>
              <span>0x2A</span>
            </div>
            <div className="p-4 font-mono text-[12px] md:text-[13px] leading-relaxed min-h-[220px]">
              {BOOT_LINES.slice(0, typing.i).map((l, idx) => (
                <div key={idx} className="mb-2">
                  <div className="text-[#E4EDE6]">{l.cmd}</div>
                  <div className="text-[#00FF41]">{l.out}</div>
                </div>
              ))}
              <div>
                <div className="text-[#E4EDE6]">{typing.cmd || (typing.i < BOOT_LINES.length ? '' : '')}
                  {typing.phase === 'cmd' && !typing.done && <span className="caret" />}
                </div>
                <div className="text-[#00FF41]">
                  {typing.out}
                  {typing.phase === 'out' && !typing.done && <span className="caret" />}
                </div>
                {typing.done && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
                    className="mt-3 flex items-center gap-2 text-[#00FF41]"
                  >
                    <span className="inline-block w-1.5 h-1.5 bg-[#00FF41] shadow-[0_0_8px_#00FF41]" />
                    <span className="uppercase tracking-[0.22em] text-[11px]">signal locked</span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <span
              data-testid={HERO.statusIndicator}
              className="inline-flex items-center gap-2 border border-[#132b1a] px-3 py-2 text-[10px] uppercase tracking-[0.28em] text-[#E4EDE6]"
            >
              <span className="w-1.5 h-1.5 bg-[#00FF41] shadow-[0_0_10px_#00FF41] animate-pulse" />
              status: available for freelance
            </span>
          </div>
        </div>

        {/* Right column — kinetic masked headline */}
        <div className="col-span-12 md:col-span-7 lg:col-span-7 flex flex-col justify-between min-h-[70svh]">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#3b5e45] mb-6">
              // designer_dossier · v3.1 · self-taught · new_delhi
            </div>

            <h1
              className="font-display font-black uppercase tracking-[-0.03em] text-[#E4EDE6]"
              style={{ fontSize: 'clamp(2.6rem, 6.4vw, 6.4rem)', lineHeight: 0.92 }}
            >
              {HEADLINE.map((line, i) => (
                <span key={i} className="mask-line">
                  <motion.span
                    initial={{ y: '110%' }}
                    animate={{ y: bootDone ? '0%' : '110%' }}
                    transition={{ delay: 0.15 + i * 0.09, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    className={i === 3 ? 'text-[#00FF41] glow-neon' : ''}
                    style={{ display: 'inline-block' }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: bootDone ? 1 : 0, y: bootDone ? 0 : 12 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-8 max-w-[560px] font-mono text-sm md:text-[15px] text-[#E4EDE6]/80 leading-relaxed"
            >
              I&apos;m <span className="text-[#00FF41]">Abhishek</span> — a self-taught designer building the visual layer for
              posters, game UI, album art & merch. Engineer by training. Neon by nature.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: bootDone ? 1 : 0, y: bootDone ? 0 : 12 }}
            transition={{ delay: 1.1, duration: 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              data-testid={HERO.enterButton}
              onClick={scrollNext}
              className="term-btn term-btn--hot"
            >
              <span>enter_the_cave</span>
              <ArrowDownRight size={14} />
            </button>
            <a
              href="#work"
              onClick={(e) => { e.preventDefault(); const el = document.getElementById('work'); if (window.__lenis && el) window.__lenis.scrollTo(el, { offset: -20 }); else el?.scrollIntoView({ behavior: 'smooth' }); }}
              className="term-btn term-btn--ghost"
            >
              <span>view_work</span>
            </a>
            <span className="hidden md:inline font-mono text-[10px] uppercase tracking-[0.28em] text-[#3b5e45]">
              scroll : sync_signal
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom ticker */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-[#132b1a] bg-[#020403]/80 backdrop-blur-sm z-10">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 h-10 flex items-center justify-between font-mono text-[10px] tracking-[0.28em] uppercase text-[#3b5e45]">
          <span>lat_28.61N · lng_77.20E · new_delhi</span>
          <span data-testid={HERO.scrollHint} className="text-[#00FF41]">↓ scroll to decrypt</span>
          <span>build_2087.12.13</span>
        </div>
      </div>

      {/* Scroll-driven subtle chromatic aberration on the whole hero */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5,
          boxShadow: useTransform(chroma, (v) => `inset ${v}px 0 0 rgba(255,0,255,0.06), inset -${v}px 0 0 rgba(0,255,255,0.06)`),
        }}
      />
    </section>
  );
}

function CornerBracket({ className = '', flip }) {
  const style = {
    transform: `${flip === 'x' ? 'scaleX(-1)' : ''} ${flip === 'y' ? 'scaleY(-1)' : ''} ${flip === 'xy' ? 'scale(-1,-1)' : ''}`.trim(),
  };
  return (
    <div className={`absolute z-20 ${className}`} style={style} aria-hidden>
      <div className="w-10 h-[1px] bg-[#00FF41]/70" />
      <div className="w-[1px] h-10 bg-[#00FF41]/70" />
    </div>
  );
}
