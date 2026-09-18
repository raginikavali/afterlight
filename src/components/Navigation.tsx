import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-afterlight-bg/90 backdrop-blur-md border-b border-afterlight-line/50'
          : 'bg-transparent'
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 h-16 flex items-center justify-between">
        {/* Left — Brand */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 text-afterlight-text-primary hover:text-afterlight-amber transition-colors"
        >
          <span className="text-sm font-semibold tracking-[0.1em]">AFTERLIGHT</span>
          <span className="text-afterlight-text-muted text-xs">/</span>
          <span className="text-xs text-afterlight-text-muted tracking-[0.1em]">URBAN CAPACITY</span>
        </button>

        {/* Center — Links (desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'THE IDEA', id: 'insight' },
            { label: 'THE MODEL', id: 'how-it-works' },
            { label: 'PILOT', id: 'pilot' },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-xs tracking-[0.15em] text-afterlight-text-muted hover:text-afterlight-text-primary transition-colors duration-300"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right — CTA */}
        <button
          onClick={() => scrollTo('hero-city')}
          className="hidden sm:flex items-center gap-2 text-xs tracking-[0.1em] text-afterlight-amber hover:text-afterlight-amber-bright transition-colors duration-300"
        >
          EXPLORE TONIGHT
          <span className="text-base">→</span>
        </button>
      </div>
    </motion.nav>
  );
}
