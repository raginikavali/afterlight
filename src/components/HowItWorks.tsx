import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const STEPS = [
  {
    num: '01',
    title: 'SEE',
    description: 'Map when spaces actually become available.',
    visual: 'clock',
  },
  {
    num: '02',
    title: 'UNDERSTAND',
    description: 'Understand access, capacity, timing and permitted use.',
    visual: 'data',
  },
  {
    num: '03',
    title: 'MATCH',
    description: 'Connect temporary capacity with nearby demand.',
    visual: 'connection',
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-15%' });

  return (
    <section id="how-it-works" className="section-spacing" ref={ref}>
      <div className="section-container">
        {/* Label */}
        <motion.div
          className="arch-label mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          02 / THE MODEL
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="text-display font-bold tracking-display leading-[0.95] mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          FIND CAPACITY
          <br />
          <span className="text-afterlight-amber">THAT ALREADY EXISTS.</span>
        </motion.h2>

        {/* Steps */}
        <div className="space-y-0">
          {STEPS.map((step, i) => (
            <StepRow key={step.num} step={step} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepRow({ step, index, isInView }: { step: typeof STEPS[0]; index: number; isInView: boolean }) {
  return (
    <motion.div
      className="grid md:grid-cols-[120px_1fr_1fr] gap-8 md:gap-12 items-center py-12 border-t border-afterlight-line"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
    >
      {/* Number */}
      <div className="text-5xl md:text-6xl font-light text-afterlight-line tracking-tight">
        {step.num}
      </div>

      {/* Text */}
      <div>
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
          {step.title}
        </h3>
        <p className="text-afterlight-text-secondary text-base leading-relaxed">
          {step.description}
        </p>
      </div>

      {/* Visual */}
      <div className="flex justify-center md:justify-end">
        <StepVisual type={step.visual} />
      </div>
    </motion.div>
  );
}

function StepVisual({ type }: { type: string }) {
  return (
    <svg viewBox="0 0 120 80" className="w-32 h-auto opacity-60">
      {type === 'clock' && (
        <>
          <circle cx="60" cy="40" r="30" fill="none" stroke="#242A31" strokeWidth="0.5" />
          <line x1="60" y1="40" x2="60" y2="18" stroke="#F4B860" strokeWidth="1" opacity="0.6" />
          <line x1="60" y1="40" x2="78" y2="40" stroke="#AAB2BC" strokeWidth="0.5" />
          <circle cx="60" cy="40" r="2" fill="#F4B860" opacity="0.8" />
          {/* Hour marks */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
            <line
              key={deg}
              x1={60 + 27 * Math.cos((deg - 90) * Math.PI / 180)}
              y1={40 + 27 * Math.sin((deg - 90) * Math.PI / 180)}
              x2={60 + 30 * Math.cos((deg - 90) * Math.PI / 180)}
              y2={40 + 30 * Math.sin((deg - 90) * Math.PI / 180)}
              stroke="#242A31"
              strokeWidth="0.5"
            />
          ))}
        </>
      )}
      {type === 'data' && (
        <>
          {[0, 1, 2, 3].map(i => (
            <g key={i}>
              <rect x={20} y={10 + i * 17} width={80} height={10} fill="#101419" rx="1" />
              <rect x={20} y={10 + i * 17} width={30 + i * 12} height={10} fill="#242A31" rx="1" opacity="0.6" />
              <text x={22} y={18 + i * 17} className="text-[6px] fill-afterlight-text-muted font-mono">
                {['ACCESS', 'CAPACITY', 'TIMING', 'USE'][i]}
              </text>
            </g>
          ))}
        </>
      )}
      {type === 'connection' && (
        <>
          <rect x="10" y="25" width="30" height="30" fill="#101419" stroke="#F4B860" strokeWidth="0.5" rx="1" />
          <rect x="80" y="25" width="30" height="30" fill="#101419" stroke="#B8D8C0" strokeWidth="0.5" rx="1" />
          <line x1="40" y1="40" x2="80" y2="40" stroke="#F4B860" strokeWidth="0.75" strokeDasharray="4 2" />
          <circle cx="60" cy="40" r="3" fill="#F4B860" opacity="0.6" />
          <text x="25" y="65" className="text-[5px] fill-afterlight-text-muted font-mono" textAnchor="middle">SPACE</text>
          <text x="95" y="65" className="text-[5px] fill-afterlight-text-muted font-mono" textAnchor="middle">NEED</text>
        </>
      )}
    </svg>
  );
}
