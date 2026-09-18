import { motion } from 'framer-motion';

interface CityStatsProps {
  availableCount: number;
  availableCapacity: number;
  matchCount: number;
}

export default function CityStats({ availableCount, availableCapacity, matchCount }: CityStatsProps) {
  return (
    <div className="flex flex-wrap items-start gap-8 md:gap-12">
      <StatBlock value={availableCount} label="SPACES AVAILABLE" />
      <StatBlock value={availableCapacity.toLocaleString()} label="M² TEMPORARILY UNUSED" suffix="m²" />
      <StatBlock value={matchCount} label="POTENTIAL MATCHES" />
    </div>
  );
}

function StatBlock({ value, label }: { value: string | number; label: string; suffix?: string }) {
  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      key={String(value)} // Re-animate on value change
    >
      <span className="text-3xl md:text-4xl font-light text-afterlight-text-primary tabular-nums font-mono tracking-tight">
        {value}
      </span>
      <span className="text-[10px] tracking-[0.15em] text-afterlight-text-muted mt-1 uppercase">
        {label}
      </span>
    </motion.div>
  );
}
