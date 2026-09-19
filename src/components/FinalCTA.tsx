import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-20%' });

  return (
    <section className="relative py-32 md:py-48 overflow-hidden" ref={ref}>
      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Single illuminated building */}
          <motion.div
            className="mb-16 flex justify-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
          >
            <svg viewBox="0 0 120 160" className="w-24 h-auto">
              {/* Dark context buildings */}
              <rect x="5" y="80" width="25" height="70" fill="#0B0E12" stroke="#1a1f26" strokeWidth="0.3" />
              <rect x="90" y="60" width="25" height="90" fill="#0B0E12" stroke="#1a1f26" strokeWidth="0.3" />
              <rect x="35" y="100" width="20" height="50" fill="#0B0E12" stroke="#1a1f26" strokeWidth="0.3" />

              {/* THE building - illuminated */}
              <rect
                x="42" y="30" width="36" height="120" fill="#151A20"
                stroke="#F4B860" strokeWidth="0.75"
                style={{ filter: 'drop-shadow(0 0 12px rgba(244, 184, 96, 0.3))' }}
              />

              {/* Windows */}
              {[0, 1, 2, 3, 4, 5, 6].map(row => (
                [0, 1].map(col => (
                  <rect
                    key={`${row}-${col}`}
                    x={48 + col * 16}
                    y={38 + row * 15}
                    width={8}
                    height={8}
                    fill="#F4B860"
                    opacity={0.3 + Math.random() * 0.5}
                    rx="0.5"
                  />
                ))
              ))}

              {/* Ground line */}
              <line x1="0" y1="150" x2="120" y2="150" stroke="#242A31" strokeWidth="0.5" />
            </svg>
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="text-display font-bold tracking-display leading-[0.95] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            THE NEXT ROOM
            <br />
            <span className="text-afterlight-amber">MIGHT ALREADY EXIST.</span>
          </motion.h2>

          <motion.p
            className="text-lg text-afterlight-text-secondary mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Give us one district.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <button className="btn-primary">
              START A 30-DAY PILOT <span>→</span>
            </button>
            <button
              onClick={() => document.getElementById('operator-review')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary"
            >
              EXPLORE THE MODEL
            </button>
          </motion.div>

          {/* Final label */}
          <motion.div
            className="mt-16 text-[9px] font-mono tracking-[0.15em] text-afterlight-text-muted opacity-50"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.5 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
          >
            SIMULATED CONCEPT / INTERACTIVE PRODUCT PROTOTYPE
          </motion.div>
        </div>
      </div>
    </section>
  );
}
