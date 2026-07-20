import { useEffect, useRef, useState } from 'react';

/**
 * Terminal-block custom cursor with a trailing crosshair ring.
 * Grows / turns magenta on interactive hover, hides when leaving window.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hidden, setHidden] = useState(true);
  const [hot, setHot] = useState(false);

  useEffect(() => {
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      setHidden(false);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx - 6}px, ${my - 6}px, 0)`;
      }
    };
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const isInteractive = (el) => {
      if (!el) return false;
      const tag = el.tagName;
      if (['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'LABEL', 'SELECT'].includes(tag)) return true;
      if (el.getAttribute?.('role') === 'button') return true;
      if (el.dataset?.cursor === 'hot') return true;
      return false;
    };
    const onOver = (e) => setHot(isInteractive(e.target));

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('mouseenter', onEnter);
    window.addEventListener('mouseover', onOver);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  const baseDot = {
    position: 'fixed', top: 0, left: 0, width: 12, height: 12,
    background: hot ? '#FF00FF' : '#00FF41',
    boxShadow: hot ? '0 0 14px rgba(255,0,255,.7)' : '0 0 14px rgba(0,255,65,.7)',
    zIndex: 9999, pointerEvents: 'none',
    transition: 'background-color .15s ease, box-shadow .15s ease, opacity .15s ease',
    opacity: hidden ? 0 : 1,
    mixBlendMode: 'screen',
  };
  const baseRing = {
    position: 'fixed', top: 0, left: 0, width: 36, height: 36,
    border: `1px solid ${hot ? '#FF00FF' : '#00FF41'}`,
    zIndex: 9998, pointerEvents: 'none',
    opacity: hidden ? 0 : 0.75,
    transition: 'opacity .15s ease, border-color .15s ease, transform .05s linear',
    mixBlendMode: 'screen',
  };

  return (
    <>
      <div ref={dotRef} style={baseDot} aria-hidden />
      <div ref={ringRef} style={baseRing} aria-hidden />
    </>
  );
}
