import { useEffect, useState } from 'react';
import { NAV, HERO } from '@/constants/testIds';
import { Volume2, VolumeX } from 'lucide-react';

const links = [
  { id: 'about', label: 'about', testid: NAV.linkAbout },
  { id: 'skills', label: 'skills', testid: NAV.linkSkills },
  { id: 'work', label: 'work', testid: NAV.linkWork },
  { id: 'contact', label: 'contact', testid: NAV.linkContact },
];

export default function TopNav({ muted, onToggleMute, onLinkHover }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getUTCHours()).padStart(2, '0');
      const mm = String(d.getUTCMinutes()).padStart(2, '0');
      const ss = String(d.getUTCSeconds()).padStart(2, '0');
      setTime(`${hh}:${mm}:${ss} UTC`);
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -20 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      data-testid={NAV.root}
      className="fixed top-0 left-0 right-0 z-50 border-b border-[#132b1a] bg-[#020403]/70 backdrop-blur-md"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 bg-[#00FF41] shadow-[0_0_10px_#00FF41]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#E4EDE6]">
            creatives_cave<span className="text-[#3b5e45]">://</span>abhishek
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <button
              key={l.id}
              data-testid={l.testid}
              onMouseEnter={onLinkHover}
              onClick={() => scrollTo(l.id)}
              className="group font-mono text-[11px] uppercase tracking-[0.28em] text-[#E4EDE6] hover:text-[#00FF41] transition-colors"
            >
              <span className="text-[#3b5e45] group-hover:text-[#00FF41]">&gt; </span>{l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline font-mono text-[10px] tracking-[0.28em] text-[#3b5e45]">
            {time}
          </span>
          <button
            data-testid={HERO.soundToggle}
            aria-label={muted ? 'Unmute UI sound' : 'Mute UI sound'}
            onClick={onToggleMute}
            className="term-btn term-btn--ghost !py-1.5 !px-2.5 !text-[10px]"
          >
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            <span className="hidden sm:inline">{muted ? 'sound:off' : 'sound:on'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
