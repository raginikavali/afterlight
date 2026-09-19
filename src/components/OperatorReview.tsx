import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type Decision = 'pending' | 'approve' | 'hold' | 'reject';

export default function OperatorReview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-15%' });
  const [decision, setDecision] = useState<Decision>('pending');

  const statusMessages: Record<Decision, string> = {
    pending: 'AWAITING OPERATOR DECISION',
    approve: 'MATCH HELD FOR OPERATOR CONFIRMATION',
    hold: 'MATCH ON HOLD — REQUIRES FURTHER REVIEW',
    reject: 'MATCH REJECTED BY OPERATOR',
  };

  const statusColors: Record<Decision, string> = {
    pending: 'text-afterlight-text-muted',
    approve: 'text-afterlight-matched',
    hold: 'text-afterlight-warning',
    reject: 'text-red-400',
  };

  return (
    <section id="operator-review" className="section-spacing" ref={ref}>
      <div className="section-container max-w-3xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-label mb-6">HUMAN OVERRIDE</div>

          <h2 className="text-heading font-bold tracking-heading leading-[1] mb-4">
            THE OPERATOR DECIDES.
          </h2>

          <p className="text-afterlight-text-secondary text-lg mb-12 max-w-lg mx-auto">
            The algorithm proposes — AFTERLIGHT surfaces potential matches based on capacity, timing, and constraints.
            <br />
            A human disposes — every match stops here for an operator to approve, hold, or reject.
          </p>
        </motion.div>

        {/* Review card */}
        <motion.div
          className="bg-afterlight-surface border border-afterlight-line rounded-sm p-8 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-label mb-4">OPERATOR REVIEW</div>

          {/* Match summary */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-afterlight-line">
            <div className="w-8 h-8 rounded-sm bg-afterlight-amber/10 border border-afterlight-amber/30 flex items-center justify-center">
              <span className="text-[8px] font-mono text-afterlight-amber">014</span>
            </div>
            <span className="text-afterlight-text-muted text-xs">→</span>
            <span className="text-xs font-mono text-afterlight-text-secondary tracking-wider">
              EVENING SKILLS PROGRAM
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setDecision('approve')}
              className={`flex-1 py-3 rounded-sm text-xs font-mono tracking-wider transition-all border ${
                decision === 'approve'
                  ? 'bg-afterlight-matched/10 border-afterlight-matched text-afterlight-matched'
                  : 'border-afterlight-line text-afterlight-text-secondary hover:border-afterlight-matched/40'
              }`}
            >
              APPROVE
            </button>
            <button
              onClick={() => setDecision('hold')}
              className={`flex-1 py-3 rounded-sm text-xs font-mono tracking-wider transition-all border ${
                decision === 'hold'
                  ? 'bg-afterlight-warning/10 border-afterlight-warning text-afterlight-warning'
                  : 'border-afterlight-line text-afterlight-text-secondary hover:border-afterlight-warning/40'
              }`}
            >
              HOLD
            </button>
            <button
              onClick={() => setDecision('reject')}
              className={`flex-1 py-3 rounded-sm text-xs font-mono tracking-wider transition-all border ${
                decision === 'reject'
                  ? 'bg-red-400/10 border-red-400 text-red-400'
                  : 'border-afterlight-line text-afterlight-text-secondary hover:border-red-400/40'
              }`}
            >
              REJECT
            </button>
          </div>

          {/* Status */}
          <motion.div
            className={`text-center py-3 border-t border-afterlight-line ${statusColors[decision]}`}
            key={decision}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-[10px] font-mono tracking-[0.15em]">
              {statusMessages[decision]}
            </span>
          </motion.div>
        </motion.div>

        {/* Principle */}
        <motion.p
          className="text-center text-sm text-afterlight-text-muted mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          The system recommends. The operator decides.
        </motion.p>
      </div>
    </section>
  );
}
