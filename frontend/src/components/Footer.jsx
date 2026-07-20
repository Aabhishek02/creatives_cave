export default function Footer() {
  return (
    <footer className="w-full border-t border-[#132b1a] bg-[#020403] py-14">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 grid grid-cols-12 gap-6 items-end">
        <div className="col-span-12 md:col-span-6">
          <div className="font-display font-black uppercase text-[#E4EDE6] glow-neon" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 0.95 }}>
            CREATIVES_CAVE
          </div>
          <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.32em] text-[#3b5e45]">
            © 2087 · abhishek · all signals reserved
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 flex md:justify-end">
          <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#3b5e45]">
            <div>build_2087.12.13 · v3.1</div>
            <div className="mt-1 text-[#00FF41]">&gt; connection stable</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
