import { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '@/constants/testIds';

const TOOLS = [
  { key: 'PS', name: 'Photoshop',      role: 'compositing · texture · retouch',       tier: 'ADVANCED',     level: 92, hours: '3.2k hrs', color: '#31A8FF' },
  { key: 'AI', name: 'Illustrator',    role: 'vector · logos · merch · type work',    tier: 'ADVANCED',     level: 90, hours: '2.8k hrs', color: '#FF9A00' },
  { key: 'ID', name: 'InDesign',       role: 'editorial · zines · layout systems',    tier: 'INTERMEDIATE', level: 72, hours: '1.1k hrs', color: '#FF3379' },
  { key: 'AE', name: 'After Effects',  role: 'motion · game_ui · loops',              tier: 'INTERMEDIATE', level: 76, hours: '1.4k hrs', color: '#B18CFF' },
  { key: 'FG', name: 'Figma',          role: 'ux · component libraries',              tier: 'ADVANCED',     level: 88, hours: '2.2k hrs', color: '#00FFA3' },
  { key: 'CV', name: 'Canva',          role: 'quick decks · social kits · async',     tier: 'FLUENT',       level: 82, hours: '900 hrs', color: '#00E0FF' },
];

const WHY_ME = [
  { n: '01', title: 'Cultural fusion',      body: 'Indian type + neon-future. Not a mood board \u2014 a native language.' },
  { n: '02', title: 'Motion literacy',      body: 'I ship things that move. Static posters, kinetic covers, looping UI.' },
  { n: '03', title: 'Systems thinking',     body: 'Engineer\u2019s brain: grids, tokens, components. Design that scales without losing edge.' },
  { n: '04', title: 'Availability',         body: 'Small studio brain. Fast turnaround. One channel. No hand-offs to lose signal.' },
];

export default function Skills({ onHover }) {
  const [active, setActive] = useState(0);
  const t = TOOLS[active];

  return (
    <section
      id="skills"
      data-testid={SKILLS.root}
      className="relative w-full bg-[#020403] py-28 md:py-40 border-t border-[#132b1a]"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#3b5e45]">/ sector_03</div>
            <div className="mt-2 font-mono text-[13px] text-[#00FF41]">$ ./skills --list</div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2
              className="font-display uppercase tracking-[-0.02em] text-[#E4EDE6] glitch-hover"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4.2rem)', lineHeight: 0.95 }}
            >
              Tool Console
            </h2>
            <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.28em] text-[#3b5e45]">
              hover a module to load stats · six drivers online
            </div>
          </div>
        </div>

        {/* Console */}
        <div className="mt-14 md:mt-20 grid grid-cols-12 gap-6">
          {/* Tools grid */}
          <div className="col-span-12 lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-3">
            {TOOLS.map((tool, i) => {
              const isActive = i === active;
              return (
                <button
                  key={tool.key}
                  data-testid={SKILLS.toolCard}
                  onMouseEnter={() => { setActive(i); onHover?.(); }}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  style={isActive ? { borderColor: tool.color } : undefined}
                  onMouseOver={(e) => { if (!isActive) e.currentTarget.style.borderColor = `${tool.color}99`; }}
                  onMouseOut={(e) => { if (!isActive) e.currentTarget.style.borderColor = ''; }}
                  className={`relative text-left border p-4 md:p-5 transition-colors ${
                    isActive ? 'bg-[#080c09]' : 'border-[#132b1a] bg-[#060a07]'
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <span
                      className="font-display font-black"
                      style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)', lineHeight: 1, color: tool.color, textShadow: `0 0 14px ${tool.color}99` }}
                    >
                      {tool.key}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#3b5e45]">{tool.hours}</span>
                  </div>
                  <div className="mt-3 font-mono text-[13px] text-[#E4EDE6]">{tool.name}</div>
                  <div className="mt-1 font-mono text-[11px] text-[#3b5e45] uppercase tracking-[0.18em]">
                    tier: <span style={{ color: isActive ? tool.color : '#E4EDE6' }}>{tool.tier}</span>
                  </div>
                  <div className="mt-4 h-[2px] w-full bg-[#132b1a] overflow-hidden">
                    <motion.div
                      key={`${tool.key}-${isActive}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: (tool.level) / 100 }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      style={{ transformOrigin: 'left', backgroundColor: tool.color, boxShadow: `0 0 10px ${tool.color}` }}
                      className="h-full"
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em]">
                    <span className="text-[#3b5e45]">load</span>
                    <span style={{ color: isActive ? tool.color : '#E4EDE6' }}>{tool.level}%</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Stat readout */}
          <div className="col-span-12 lg:col-span-5">
            <div className="border transition-colors duration-300" style={{ borderColor: `${t.color}55`, backgroundColor: '#080c09' }}>
              <div className="flex items-center justify-between px-4 py-2 border-b border-[#132b1a] text-[10px] uppercase tracking-[0.28em] text-[#3b5e45]">
                <span>readout // {t.key}</span>
                <span style={{ color: t.color }}>live</span>
              </div>
              <div className="p-6 md:p-8 min-h-[280px]">
                <motion.div
                  key={t.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#3b5e45]">
                    module_{t.key.toLowerCase()}
                  </div>
                  <div className="mt-2 font-display uppercase font-black text-[#E4EDE6]" style={{ fontSize: 'clamp(2rem, 3.4vw, 3.2rem)', lineHeight: 0.95 }}>
                    {t.name}
                  </div>
                  <div className="mt-6 font-mono text-[13px]" style={{ color: t.color }}>&gt; {t.role}</div>

                  <div className="mt-8 grid grid-cols-3 gap-3">
                    <ReadoutStat k="tier" v={t.tier} color={t.color} highlight />
                    <ReadoutStat k="load" v={`${t.level}%`} />
                    <ReadoutStat k="hours" v={t.hours} />
                  </div>

                  {/* Bars */}
                  <div className="mt-8 space-y-4">
                    <PowerBar label="control" pct={Math.min(98, t.level + 6)} color={t.color} />
                    <PowerBar label="fluency" pct={t.level} color={t.color} />
                    <PowerBar label="craft"   pct={Math.max(60, t.level - 5)} color={t.color} />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Me */}
        <div className="mt-24 md:mt-32">
          <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#00FF41] mb-6">
            &gt; why_me.log
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_ME.map((w, i) => (
              <motion.div
                key={w.n}
                data-testid={SKILLS.whyMePoint}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="border border-[#132b1a] p-6 bg-[#060a07] hover:border-[#00FF41]/60 transition-colors"
              >
                <div className="font-display font-black text-[#00FF41] glow-neon" style={{ fontSize: '2.4rem', lineHeight: 1 }}>{w.n}</div>
                <div className="mt-4 font-mono text-[13px] uppercase tracking-[0.22em] text-[#E4EDE6]">{w.title}</div>
                <p className="mt-3 font-mono text-[13px] text-[#E4EDE6]/75 leading-[1.7]">{w.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReadoutStat({ k, v, highlight, color = '#00FF41' }) {
  return (
    <div className="border border-[#132b1a] p-3 bg-[#060a07]">
      <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#3b5e45]">{k}</div>
      <div className="mt-2 font-mono text-[13px]" style={{ color: highlight ? color : '#E4EDE6' }}>{v}</div>
    </div>
  );
}

function PowerBar({ label, pct, color = '#00FF41' }) {
  const cells = 24;
  const filled = Math.round((pct / 100) * cells);
  return (
    <div>
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em]">
        <span className="text-[#3b5e45]">{label}</span>
        <span style={{ color }}>{pct}%</span>
      </div>
      <div className="mt-2 flex gap-[3px]">
        {Array.from({ length: cells }).map((_, i) => (
          <span
            key={i}
            className="h-[10px] flex-1"
            style={i < filled ? { backgroundColor: color, boxShadow: `0 0 6px ${color}` } : { backgroundColor: '#0f1a12' }}
          />
        ))}
      </div>
    </div>
  );
}
