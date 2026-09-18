import { motion } from 'framer-motion';
import { type Need } from '../data/needs';
import { minutesToTime } from '../engine/time';

interface DemandPanelProps {
  needs: Need[];
  selectedNeed: Need | null;
  onSelectNeed: (need: Need | null) => void;
}

export default function DemandPanel({ needs, selectedNeed, onSelectNeed }: DemandPanelProps) {
  return (
    <div className="space-y-3">
      <div className="text-label mb-4">NEARBY DEMAND</div>

      {needs.map((need) => {
        const isSelected = selectedNeed?.id === need.id;

        return (
          <motion.button
            key={need.id}
            onClick={() => onSelectNeed(isSelected ? null : need)}
            className={`w-full text-left p-4 rounded-sm border transition-all duration-300 ${
              isSelected
                ? 'bg-afterlight-surface-elevated border-afterlight-amber/40'
                : 'bg-afterlight-surface border-afterlight-line hover:border-afterlight-line/80'
            }`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {/* Name */}
            <div className="text-sm font-medium text-afterlight-text-primary mb-2 tracking-tight">
              {need.name.toUpperCase()}
            </div>

            {/* Meta grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              <MetaItem label="REQUIRED" value={`${need.requiredCapacity[0]}–${need.requiredCapacity[1]} seats`} />
              <MetaItem label="DURATION" value={`${Math.floor(need.duration / 60)}h ${need.duration % 60 > 0 ? `${need.duration % 60}m` : ''}`} />
              <MetaItem label="PREFERRED" value={need.preferredTypes[0].replace('-', ' ')} />
              <MetaItem label="DISTANCE" value={`${need.maxDistance} km`} />
            </div>

            {/* Window */}
            <div className="mt-2 text-[9px] font-mono text-afterlight-text-muted tracking-wider">
              WINDOW / {minutesToTime(need.permittedWindow[0])} — {minutesToTime(need.permittedWindow[1])}
            </div>

            {isSelected && (
              <motion.div
                className="mt-3 pt-2 border-t border-afterlight-line"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <p className="text-xs text-afterlight-text-secondary leading-relaxed">
                  {need.description}
                </p>
              </motion.div>
            )}
          </motion.button>
        );
      })}

      <div className="text-[9px] font-mono text-afterlight-text-muted tracking-wider mt-4 opacity-50">
        SIMULATED DEMAND / ILLUSTRATIVE
      </div>
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[8px] tracking-[0.15em] text-afterlight-text-muted">{label}</span>
      <span className="text-[11px] font-mono text-afterlight-text-secondary capitalize">{value}</span>
    </div>
  );
}
