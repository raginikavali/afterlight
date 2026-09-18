import { motion } from 'framer-motion';
import { type MatchResult } from '../engine/matching';

interface MatchVisualizerProps {
  result: MatchResult;
  onClearMatch: () => void;
}

export default function MatchVisualizer({ result, onClearMatch }: MatchVisualizerProps) {
  const { isMatch, building, need, reasons } = result;

  return (
    <motion.div
      className={`border rounded-sm p-6 md:p-8 ${
        isMatch
          ? 'bg-afterlight-surface border-afterlight-amber/30'
          : 'bg-afterlight-surface border-afterlight-line'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className={`text-label mb-2 ${isMatch ? 'text-afterlight-amber' : 'text-afterlight-text-muted'}`}>
            {isMatch ? 'POTENTIAL MATCH' : 'MATCH BLOCKED'}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono text-afterlight-text-primary">
              {building.name.toUpperCase()}
            </span>
            <span className="text-afterlight-text-muted">→</span>
            <span className="text-sm font-mono text-afterlight-text-primary">
              {need.name.toUpperCase()}
            </span>
          </div>
        </div>
        <button
          onClick={onClearMatch}
          className="text-afterlight-text-muted hover:text-afterlight-text-primary text-xs tracking-wider transition-colors"
        >
          CLEAR
        </button>
      </div>

      {/* Match visual */}
      <div className="flex items-center gap-4 mb-6">
        {/* Space node */}
        <div className="flex flex-col items-center gap-1">
          <div className={`w-12 h-12 rounded-sm border flex items-center justify-center ${
            isMatch ? 'border-afterlight-amber bg-afterlight-amber/10' : 'border-afterlight-line bg-afterlight-surface'
          }`}>
            <span className="text-[9px] font-mono text-afterlight-text-muted">{building.id}</span>
          </div>
          <span className="text-[8px] text-afterlight-text-muted tracking-wider">SPACE</span>
        </div>

        {/* Connection line */}
        <div className="flex-1 relative h-[2px]">
          <div className={`absolute inset-0 ${isMatch ? 'bg-afterlight-amber/40' : 'bg-afterlight-line'}`} />
          {isMatch && (
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-afterlight-amber"
              animate={{ left: ['0%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          )}
        </div>

        {/* Need node */}
        <div className="flex flex-col items-center gap-1">
          <div className={`w-12 h-12 rounded-sm border flex items-center justify-center ${
            isMatch ? 'border-afterlight-matched bg-afterlight-matched/10' : 'border-afterlight-line bg-afterlight-surface'
          }`}>
            <span className="text-[8px] font-mono text-afterlight-text-muted">NEED</span>
          </div>
          <span className="text-[8px] text-afterlight-text-muted tracking-wider">DEMAND</span>
        </div>
      </div>

      {/* Reasons */}
      <div className="space-y-2">
        {reasons.map((reason, i) => (
          <motion.div
            key={reason.criterion}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <span className={`text-sm ${reason.passed ? 'text-afterlight-matched' : 'text-red-400'}`}>
              {reason.passed ? '✓' : '×'}
            </span>
            <span className="text-xs font-mono tracking-wider text-afterlight-text-secondary">
              {reason.criterion}
            </span>
            <span className="text-[10px] text-afterlight-text-muted ml-auto">
              {reason.detail}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Bottom label */}
      {isMatch && (
        <motion.div
          className="mt-6 pt-4 border-t border-afterlight-line text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xs text-afterlight-text-muted tracking-wider">
            TWO PROBLEMS. ONE UNUSED HOUR.
          </p>
        </motion.div>
      )}

      {!isMatch && (
        <motion.div
          className="mt-6 pt-4 border-t border-afterlight-line"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xs text-afterlight-text-muted tracking-wider">
            {reasons.find(r => !r.passed)?.detail.toUpperCase() || 'CONSTRAINT CONFLICT'}
          </p>
          <p className="text-[10px] text-afterlight-text-muted mt-1">
            Adjust time or constraints to find a valid match.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
