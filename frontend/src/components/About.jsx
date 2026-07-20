import { motion } from 'framer-motion';
import { ABOUT } from '@/constants/testIds';

const CHAPTERS = [
  {
    n: '01',
    title: 'Origin',
    body: 'Engineer by training. Designer by obsession. I spent years reading blueprints before I learned that grids, hierarchy and rhythm were the same language spoken differently.',
  },
  {
    n: '02',
    title: 'Method',
    body: 'I don\u2019t chase trends. I compress cultural signal \u2014 Indian typography, streetwear, arcade posters, cassette-tape covers \u2014 and reroute it through a CRT.',
  },
  {
    n: '03',
    title: 'Creatives Cave',
    body: 'The cave is the studio. Dim room. Loud color. A machine humming. Everything I ship starts here \u2014 posters, game UI, album art, merch drops, motion.',
  },
  {
    n: '04',
    title: 'Off-Grid',
    body: 'When the screens go dark: cricket highlights, half-finished sketchbooks, playlists that lean 80s Bollywood into vaporwave. I design better when I\u2019m curious about something else.',
  },
];

const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.05 + i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function About() {
  return (
    <section
      id="about"
      data-testid={ABOUT.root}
      className="relative w-full bg-[#020403] py-28 md:py-40 border-t border-[#132b1a]"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <SectionHeader
          index="02"
          label="cat ./about.txt"
          title="Field notes from the cave"
          caption="a first-person system log, four chapters"
        />

        {/* Dossier card + chapters */}
        <div className="mt-16 md:mt-24 grid grid-cols-12 gap-6">
          {/* Left — ID / dossier card */}
          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 md:col-span-4 lg:col-span-3"
          >
            <div className="border border-[#132b1a] bg-[#080c09]">
              <div className="flex items-center justify-between px-4 py-2 border-b border-[#132b1a] text-[10px] uppercase tracking-[0.28em] text-[#3b5e45]">
                <span className="text-[#00FF41]">ID // 0x-ABK</span>
                <span>rev.3.1</span>
              </div>
              <div className="p-5 space-y-4 font-mono text-[12px]">
                <PortraitBox />
                <DossierRow k="callsign" v="@also.abhiishek" />
                <DossierRow k="class" v="designer" />
                <DossierRow k="specialization" v="posters // game_ui // merch" />
                <DossierRow k="tools" v="ps · ai · id · ae · figma · canva" />
                <DossierRow k="signal" v="online" green />
                <DossierRow k="base" v="new_delhi · in" />
              </div>
              <div className="border-t border-[#132b1a] px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[#3b5e45]">
                &gt; end_of_file
              </div>
            </div>
          </motion.aside>

          {/* Right — numbered manifesto */}
          <div className="col-span-12 md:col-span-8 lg:col-span-9 flex flex-col gap-14 md:gap-20">
            {CHAPTERS.map((c, i) => (
              <motion.div
                key={c.n}
                data-testid={ABOUT.chapter}
                variants={revealVariants}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-15%' }}
                className="grid grid-cols-12 gap-6"
              >
                <div className="col-span-3 md:col-span-2">
                  <div className="chapter-num">{c.n}</div>
                </div>
                <div className="col-span-9 md:col-span-10 md:pl-6 border-l border-[#132b1a]">
                  <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#00FF41] mb-3">
                    chapter_{c.n} · {c.title.toLowerCase()}
                  </div>
                  <h3 className="font-display uppercase tracking-tight text-[#E4EDE6]" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', lineHeight: 1 }}>
                    {c.title}
                  </h3>
                  <p className="mt-5 max-w-[620px] font-mono text-[14px] leading-[1.75] text-[#E4EDE6]/80">
                    {c.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ index, label, title, caption }) {
  return (
    <div className="grid grid-cols-12 gap-6 items-end">
      <div className="col-span-12 md:col-span-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#3b5e45]">
          / sector_{index}
        </div>
        <div className="mt-2 font-mono text-[13px] text-[#00FF41]">$ {label}</div>
      </div>
      <div className="col-span-12 md:col-span-8">
        <h2
          className="font-display uppercase tracking-[-0.02em] text-[#E4EDE6] glitch-hover"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 4.2rem)', lineHeight: 0.95 }}
        >
          {title}
        </h2>
        {caption && (
          <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.28em] text-[#3b5e45]">
            {caption}
          </div>
        )}
      </div>
    </div>
  );
}

function DossierRow({ k, v, green }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="text-[#3b5e45] uppercase tracking-[0.22em] text-[10px] shrink-0 w-20">{k}</span>
      <span className={`${green ? 'text-[#00FF41]' : 'text-[#E4EDE6]'} truncate`}>{v}</span>
    </div>
  );
}

function PortraitBox() {
  // A stylized ASCII / block portrait — placeholder that feels intentional
  return (
    <div className="ratio-4-5 relative overflow-hidden border border-[#132b1a] bg-[#040805]">
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          background:
            'repeating-linear-gradient(0deg, rgba(0,255,65,0.10) 0 2px, transparent 2px 5px)',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <pre className="font-mono text-[10px] leading-[1.05] text-[#00FF41] whitespace-pre">
{`   ▓▓▓▓▓▓▓▓▓▓
  ▓          ▓
  ▓  ◉    ◉  ▓
  ▓          ▓
  ▓    ══    ▓
  ▓          ▓
   ▓▓▓▓▓▓▓▓▓▓
    ██████
   ████████
  █████████ 
  █████████
`}
        </pre>
      </div>
      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[9px] uppercase tracking-[0.28em]">
        <span className="text-[#3b5e45]">portrait_v2</span>
        <span className="text-[#00FF41]">•REC</span>
      </div>
    </div>
  );
}
