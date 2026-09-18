import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-20%' });

  return (
    <section className="section-spacing" ref={ref}>
      <div className="section-container max-w-4xl">
        {/* Headline */}
        <motion.h2
          className="text-display font-bold tracking-display leading-[0.95] mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          WE KEEP SOLVING SCARCITY
          <br />
          <span className="text-afterlight-text-secondary">BY BUILDING MORE.</span>
        </motion.h2>

        <motion.p
          className="text-heading font-semibold tracking-heading leading-[1.1] text-afterlight-amber mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          WHAT IF SOME OF THE CAPACITY
          <br />
          WE NEED ALREADY EXISTS?
        </motion.p>

        {/* Comparison */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Old way */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="text-label text-afterlight-text-muted mb-4">THE DEFAULT RESPONSE</div>
            {['BUILD', 'BUY', 'WAIT'].map((item, i) => (
              <div key={item} className="flex items-center gap-4">
                <div className="w-8 h-px bg-afterlight-line" />
                <span className="text-xl font-light text-afterlight-text-muted tracking-wider">
                  {item}
                </span>
              </div>
            ))}
          </motion.div>

          {/* New way */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="text-label text-afterlight-amber mb-4">THE AFTERLIGHT APPROACH</div>
            {['OBSERVE', 'MATCH', 'USE'].map((item, i) => (
              <div key={item} className="flex items-center gap-4">
                <div className="w-8 h-px bg-afterlight-amber/40" />
                <span className="text-xl font-light text-afterlight-text-primary tracking-wider">
                  {item}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Supporting line */}
        <motion.p
          className="mt-16 text-lg text-afterlight-text-secondary max-w-lg"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          We don't need to build another room.
          <br />
          <span className="text-afterlight-text-primary">
            We need to use the rooms we already have.
          </span>
        </motion.p>
      </div>
    </section>
  );
}
