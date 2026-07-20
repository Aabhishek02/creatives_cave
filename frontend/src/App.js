import { useEffect } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';

import useSmoothScroll from '@/hooks/useSmoothScroll';
import useSoundFx from '@/hooks/useSoundFx';

import CustomCursor from '@/components/CustomCursor';
import TopNav from '@/components/TopNav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Work from '@/components/Work';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

function Portfolio() {
  useSmoothScroll(true);
  const sfx = useSoundFx();

  useEffect(() => {
    // enable CRT scanline overlay on <html> so it survives route unmounts
    document.documentElement.classList.add('crt-scanlines');
    return () => document.documentElement.classList.remove('crt-scanlines');
  }, []);

  return (
    <div className="App min-h-screen bg-[#020403] text-[#E4EDE6]">
      <CustomCursor />
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#080c09',
            color: '#E4EDE6',
            border: '1px solid #132b1a',
            borderRadius: 0,
            fontFamily: 'Azeret Mono, monospace',
            fontSize: 12,
            letterSpacing: '0.06em',
          },
        }}
      />
      <TopNav muted={sfx.muted} onToggleMute={() => { sfx.setMuted((m) => !m); sfx.click(); }} onLinkHover={sfx.hover} />

      <main>
        <Hero onKeystroke={sfx.keystroke} onClick={sfx.click} />
        <About />
        <Skills onHover={sfx.hover} />
        <Work />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="*" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
