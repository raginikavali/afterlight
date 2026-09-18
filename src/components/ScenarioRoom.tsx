import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { SCENARIOS, type ScenarioConfig } from '../data/scenarios';

export default function ScenarioRoom() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-15%' });
  const [activeIndex, setActiveIndex] = useState(0);

  const scenario = SCENARIOS[activeIndex];

  return (
    <section className="section-spacing" ref={ref}>
      <div className="section-container max-w-5xl">
        {/* Headline */}
        <motion.h2
          className="text-display font-bold tracking-display leading-[0.95] mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          ONE EMPTY ROOM.
          <br />
          <span className="text-afterlight-amber">A DIFFERENT CITY.</span>
        </motion.h2>

        <motion.p
          className="text-afterlight-text-secondary text-lg mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          The same space. Four possibilities.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Room visualization */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <RoomVisualization scenario={scenario} />
              </motion.div>
            </AnimatePresence>

            {/* Room label */}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[9px] font-mono text-afterlight-text-muted tracking-wider">
                ROOM / 02B — CONFIGURED
              </span>
              <span className="text-[9px] font-mono tracking-wider" style={{ color: scenario.color }}>
                {scenario.window}
              </span>
            </div>
          </div>

          {/* Scenario selector + details */}
          <div>
            {/* Tabs */}
            <div className="grid grid-cols-2 gap-2 mb-8">
              {SCENARIOS.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActiveIndex(i)}
                  className={`p-3 rounded-sm border text-left transition-all duration-300 ${
                    i === activeIndex
                      ? 'border-afterlight-amber/40 bg-afterlight-surface-elevated'
                      : 'border-afterlight-line bg-afterlight-surface hover:border-afterlight-line/80'
                  }`}
                >
                  <div className="text-[10px] tracking-[0.12em] text-afterlight-text-primary font-medium">
                    {s.name.toUpperCase()}
                  </div>
                  <div className="text-[9px] font-mono text-afterlight-text-muted mt-1">
                    {s.subtitle}
                  </div>
                </button>
              ))}
            </div>

            {/* Active scenario details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <p className="text-afterlight-text-secondary leading-relaxed">
                  {scenario.description}
                </p>

                <div className="space-y-2">
                  <div className="text-label mb-2">CONFIGURATION</div>
                  <div className="grid grid-cols-2 gap-2">
                    <ConfigItem label="LAYOUT" value={scenario.layout.toUpperCase()} />
                    <ConfigItem label="CAPACITY" value={`${scenario.capacity} SEATS`} />
                    <ConfigItem label="WINDOW" value={scenario.window} />
                    <ConfigItem label="TYPE" value={scenario.name.split(' ').pop()?.toUpperCase() || ''} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-label mb-2">FEATURES</div>
                  {scenario.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs text-afterlight-text-secondary">
                      <div className="w-1 h-1 rounded-full" style={{ backgroundColor: scenario.color }} />
                      {f}
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConfigItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-2 bg-afterlight-bg rounded-sm">
      <div className="text-[8px] tracking-[0.15em] text-afterlight-text-muted">{label}</div>
      <div className="text-[11px] font-mono text-afterlight-text-secondary">{value}</div>
    </div>
  );
}

function RoomVisualization({ scenario }: { scenario: ScenarioConfig }) {
  return (
    <svg viewBox="0 0 400 280" className="w-full h-auto">
      {/* Room shell */}
      <rect x="20" y="20" width="360" height="240" fill="#101419" stroke="#242A31" strokeWidth="0.5" rx="1" />

      {/* Floor */}
      <rect x="20" y="220" width="360" height="40" fill="#0B0E12" />

      {/* Room glow */}
      <rect x="22" y="22" width="356" height="236" fill="none" stroke={scenario.color} strokeWidth="0.5" opacity="0.3" rx="1" />

      {/* Layout-specific elements */}
      {scenario.layout === 'classroom' && (
        <>
          {/* Rows of desks */}
          {[0, 1, 2, 3, 4].map(row => (
            <g key={row}>
              {[0, 1, 2, 3, 4, 5].map(col => (
                <rect
                  key={col}
                  x={55 + col * 52}
                  y={60 + row * 32}
                  width={30}
                  height={14}
                  fill="#151A20"
                  stroke="#242A31"
                  strokeWidth="0.3"
                  rx="1"
                />
              ))}
            </g>
          ))}
          {/* Presentation wall */}
          <rect x="40" y="30" width="320" height="8" fill={scenario.color} opacity="0.3" rx="1" />
        </>
      )}

      {scenario.layout === 'banquet' && (
        <>
          {/* Round tables */}
          {[
            { cx: 100, cy: 100 }, { cx: 200, cy: 80 }, { cx: 300, cy: 100 },
            { cx: 100, cy: 180 }, { cx: 200, cy: 170 }, { cx: 300, cy: 180 },
          ].map((pos, i) => (
            <g key={i}>
              <circle cx={pos.cx} cy={pos.cy} r={25} fill="#151A20" stroke="#242A31" strokeWidth="0.3" />
              {/* Seats */}
              {[0, 60, 120, 180, 240, 300].map(deg => (
                <circle
                  key={deg}
                  cx={pos.cx + 30 * Math.cos(deg * Math.PI / 180)}
                  cy={pos.cy + 30 * Math.sin(deg * Math.PI / 180)}
                  r={4}
                  fill="#1e2329"
                />
              ))}
            </g>
          ))}
          {/* String lights */}
          <line x1="40" y1="32" x2="360" y2="32" stroke={scenario.color} strokeWidth="0.5" opacity="0.4" strokeDasharray="6 8" />
        </>
      )}

      {scenario.layout === 'studio' && (
        <>
          {/* Workbenches */}
          {[0, 1, 2].map(row => (
            <g key={row}>
              {[0, 1].map(col => (
                <rect
                  key={col}
                  x={60 + col * 160}
                  y={50 + row * 60}
                  width={120}
                  height={35}
                  fill="#151A20"
                  stroke="#242A31"
                  strokeWidth="0.3"
                  rx="2"
                />
              ))}
            </g>
          ))}
          {/* Tool wall */}
          {[0, 1, 2, 3, 4, 5].map(i => (
            <rect key={i} x={370} y={40 + i * 32} width={6} height={20} fill="#1e2329" rx="1" />
          ))}
        </>
      )}

      {scenario.layout === 'open' && (
        <>
          {/* Vendor stalls along perimeter */}
          {[0, 1, 2, 3].map(i => (
            <rect key={`left-${i}`} x={30} y={50 + i * 45} width={50} height={30} fill="#151A20" stroke="#242A31" strokeWidth="0.3" rx="1" />
          ))}
          {[0, 1, 2, 3].map(i => (
            <rect key={`right-${i}`} x={320} y={50 + i * 45} width={50} height={30} fill="#151A20" stroke="#242A31" strokeWidth="0.3" rx="1" />
          ))}
          {/* Central aisle line */}
          <line x1="200" y1="40" x2="200" y2="240" stroke="#242A31" strokeWidth="0.5" strokeDasharray="4 4" />
          {/* Street entrance */}
          <rect x="170" y="230" width="60" height="30" fill="none" stroke={scenario.color} strokeWidth="0.75" opacity="0.5" rx="1" />
          <text x="200" y="250" textAnchor="middle" className="text-[7px] fill-afterlight-text-muted font-mono">STREET</text>
        </>
      )}

      {/* Ambient light points */}
      {[1, 2, 3, 4, 5].map(i => (
        <circle
          key={i}
          cx={60 + i * 60}
          cy={35}
          r={2}
          fill={scenario.color}
          opacity={0.3}
        />
      ))}

      {/* Label */}
      <text x="30" y="268" className="text-[8px] fill-afterlight-text-muted font-mono">
        ROOM / 02B — {scenario.name.toUpperCase()}
      </text>
      <text x="370" y="268" textAnchor="end" className="text-[8px] font-mono" fill={scenario.color}>
        {scenario.capacity} CAPACITY
      </text>
    </svg>
  );
}
