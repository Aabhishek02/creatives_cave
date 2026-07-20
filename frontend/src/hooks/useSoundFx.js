import { useEffect, useRef, useState } from 'react';

/**
 * Tiny sound engine using WebAudio — no external files.
 * Emits short "blip" / "keystroke" tones on demand. Muted by default.
 */
export default function useSoundFx() {
  const [muted, setMuted] = useState(true);
  const ctxRef = useRef(null);

  const ensureCtx = () => {
    if (!ctxRef.current) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) ctxRef.current = new AC();
    }
    return ctxRef.current;
  };

  const blip = (freq = 880, dur = 0.045, type = 'square', vol = 0.05) => {
    if (muted) return;
    const ctx = ensureCtx();
    if (!ctx) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + dur);
  };

  const keystroke = () => blip(1400 + Math.random() * 700, 0.02, 'square', 0.035);
  const hover = () => blip(660, 0.03, 'triangle', 0.03);
  const click = () => blip(220, 0.08, 'square', 0.08);

  useEffect(() => () => { if (ctxRef.current) ctxRef.current.close?.(); }, []);

  return { muted, setMuted, blip, keystroke, hover, click };
}
