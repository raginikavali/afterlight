import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const WEEKS = [
  {
    num: '01',
    title: 'MAP',
    description: 'Identify participating spaces.',
    metric: 'SPACES OBSERVED',
    value: '—',
  },
  {
    num: '02',
    title: 'OBSERVE',
    description: 'Understand real availability.',
    metric: 'HOURS ACTIVATED',
    value: '—',
  },
  {
    num: '03',
    title: 'MATCH',
    description: 'Test temporary use cases.',
    metric: 'MATCHES ATTEMPTED',
    value: '—',
  },
  {
    num: '04',
    title: 'MEASURE',
    description: 'Review activated hours, matches and operator decisions.',
    metric: 'OPERATOR OVERRIDES',
    value: '—',
  },
];

export default function PilotSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-15%' });

  return (
    <section id="pilot" className="section-spacing" ref={ref}>
      <div className="section-container max-w-4xl">
        {/* Label */}
        <motion.div
          className="arch-label mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          THE FIRST PILOT
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="text-display font-bold tracking-display leading-[0.95] mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          GIVE US <span className="text-afterlight-amber">ONE DISTRICT.</span>
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-afterlight-text-secondary max-w-md leading-relaxed mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Not the whole city.
          <br />One district.
          <br />Thirty days.
        </motion.p>

        {/* Weeks */}
        <div className="grid md:grid-cols-4 gap-6 md:gap-4">
          {WEEKS.map((week, i) => (
            <motion.div
              key={week.num}
              className="border-t border-afterlight-line pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
            >
              <div className="text-3xl font-light text-afterlight-line mb-4 font-mono">
                W{week.num}
              </div>
              <div className="text-sm font-semibold tracking-tight text-afterlight-text-primary mb-2">
                {week.title}
              </div>
              <p className="text-xs text-afterlight-text-secondary leading-relaxed mb-4">
                {week.description}
              </p>
              <div className="mt-auto">
                <div className="text-[9px] tracking-[0.15em] text-afterlight-text-muted mb-1">
                  {week.metric}
                </div>
                <div className="text-lg font-mono text-afterlight-text-muted">
                  {week.value}
                </div>
                <div className="text-[8px] font-mono text-afterlight-text-muted opacity-40 mt-1">
                  ILLUSTRATIVE
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
