import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const TIMELINE = [
  { time: '09:00', label: 'OFFICE', fill: '#7E8792', active: true },
  { time: '13:00', label: 'CAFETERIA', fill: '#7E8792', active: true },
  { time: '18:00', label: 'EMPTY', fill: '#242A31', active: false },
  { time: '22:00', label: 'AVAILABLE', fill: '#F4B860', active: false },
  { time: '00:00', label: 'AVAILABLE', fill: '#F4B860', active: false },
  { time: '06:00', label: 'RESET', fill: '#242A31', active: true },
];

export default function InsightSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-20%' });
  const [activeIndex, setActiveIndex] = useState(3);

  const current = TIMELINE[activeIndex];

  return (
    <section id="insight" className="section-spacing relative" ref={ref}>
      <div className="section-container">
        {/* Label */}
        <motion.div
          className="arch-label mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          01 / THE INSIGHT
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="text-display font-bold tracking-display leading-[0.95] mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          SPACE HAS A CLOCK.
        </motion.h2>

        {/* Supporting copy */}
        <motion.p
          className="text-lg md:text-xl text-afterlight-text-secondary max-w-lg leading-relaxed mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          A room can be full at noon,
          <br />empty at 9 PM,
          <br />and useful again by morning.
        </motion.p>

        {/* Building + Timeline */}
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-4xl">
          {/* Architectural building */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <svg viewBox="0 0 300 240" className="w-full max-w-sm">
              {/* Building shell */}
              <rect x="40" y="30" width="220" height="180" fill="#101419" stroke="#242A31" strokeWidth="0.5" rx="1" />

              {/* Floor lines */}
              {[70, 110, 150].map(y => (
                <line key={y} x1="40" y1={y} x2="260" y2={y} stroke="#1e2329" strokeWidth="0.5" />
              ))}

              {/* Windows - light up based on state */}
              {[0, 1, 2, 3].map(row =>
                [0, 1, 2, 3, 4].map(col => (
                  <rect
                    key={`${row}-${col}`}
                    x={60 + col * 40}
                    y={40 + row * 40}
                    width={16}
                    height={20}
                    fill={current.active
                      ? current.fill
                      : (current.label === 'AVAILABLE' ? '#F4B860' : '#151A20')
                    }
                    opacity={current.active
                      ? (0.3 + (row * 0.15))
                      : (current.label === 'AVAILABLE' ? 0.2 + Math.random() * 0.4 : 0.1)
                    }
                    rx="0.5"
                    style={{ transition: 'all 0.6s ease' }}
                  />
                ))
              )}

              {/* Building label */}
              <text x="150" y="225" textAnchor="middle" className="text-[9px] fill-afterlight-text-muted font-mono">
                BUILDING / 014 — {current.label}
              </text>

              {/* Amber glow when available */}
              {current.label === 'AVAILABLE' && (
                <rect
                  x="38" y="28" width="224" height="184" fill="none"
                  stroke="#F4B860" strokeWidth="0.75" rx="2"
                  opacity="0.4"
                  style={{ transition: 'opacity 0.6s ease' }}
                />
              )}
            </svg>
          </motion.div>

          {/* Timeline */}
          <div className="space-y-3">
            {TIMELINE.map((item, i) => (
              <motion.button
                key={item.time}
                className={`w-full flex items-center gap-4 p-3 rounded-sm transition-all duration-300 text-left ${
                  i === activeIndex
                    ? 'bg-afterlight-surface-elevated border border-afterlight-line'
                    : 'hover:bg-afterlight-surface'
                }`}
                onClick={() => setActiveIndex(i)}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              >
                <span className="font-mono text-sm text-afterlight-text-muted w-12 shrink-0">
                  {item.time}
                </span>
                <span
                  className={`text-xs tracking-[0.15em] font-medium ${
                    item.label === 'AVAILABLE'
                      ? 'text-afterlight-amber'
                      : item.label === 'EMPTY'
                        ? 'text-afterlight-text-muted'
                        : 'text-afterlight-text-secondary'
                  }`}
                >
                  {item.label}
                </span>
                {i === activeIndex && (
                  <motion.div
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-afterlight-amber"
                    layoutId="timeline-dot"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
