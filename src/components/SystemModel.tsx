import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const STAGES = [
  { label: 'SPACE DATA', description: 'Building inventories, floor plans, schedules' },
  { label: 'AVAILABILITY', description: 'Time-based capacity windows' },
  { label: 'CONSTRAINTS', description: 'Access, use type, security, distance' },
  { label: 'DEMAND', description: 'Nearby needs and requirements' },
  { label: 'MATCH', description: 'Deterministic compatibility check' },
  { label: 'OPERATOR REVIEW', description: 'Human approval, hold, or rejection' },
  { label: 'ACTIVATION', description: 'Temporary use begins' },
];

export default function SystemModel() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-15%' });

  return (
    <section className="section-spacing" ref={ref}>
      <div className="section-container max-w-3xl">
        {/* Headline */}
        <motion.h2
          className="text-display font-bold tracking-display leading-[0.95] mb-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          FROM EMPTY HOURS
          <br />
          <span className="text-afterlight-amber">TO MEASURABLE CAPACITY.</span>
        </motion.h2>

        <motion.p
          className="text-lg text-afterlight-text-secondary text-center mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          A system, not a feature.
        </motion.p>

        {/* System diagram */}
        <div className="relative max-w-sm mx-auto">
          {STAGES.map((stage, i) => (
            <motion.div
              key={stage.label}
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
            >
              {/* Node */}
              <div className="flex items-center gap-6 py-4">
                {/* Dot */}
                <div className="relative shrink-0">
                  <motion.div
                    className="w-3 h-3 rounded-full border border-afterlight-line"
                    animate={isInView ? {
                      borderColor: '#F4B860',
                      backgroundColor: 'rgba(244, 184, 96, 0.2)',
                    } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.2 }}
                  />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <div className="text-xs font-mono tracking-[0.15em] text-afterlight-text-primary">
                    {stage.label}
                  </div>
                  <div className="text-[11px] text-afterlight-text-muted mt-0.5">
                    {stage.description}
                  </div>
                </div>
              </div>

              {/* Connector line */}
              {i < STAGES.length - 1 && (
                <motion.div
                  className="absolute left-[5px] top-[42px] w-px h-[28px]"
                  initial={{ backgroundColor: '#242A31' }}
                  animate={isInView ? { backgroundColor: 'rgba(244, 184, 96, 0.3)' } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.2 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
