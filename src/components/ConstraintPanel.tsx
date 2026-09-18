import { useState, useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { BUILDINGS } from '../data/buildings';
import { NEEDS } from '../data/needs';
import { canMatch } from '../engine/matching';

interface Constraints {
  access: Set<string>;
  minCapacity: number;
  maxCapacity: number;
  windowStart: number;
  windowEnd: number;
  permittedUse: string;
}

const DEFAULT_CONSTRAINTS: Constraints = {
  access: new Set(['public', 'controlled']),
  minCapacity: 60,
  maxCapacity: 100,
  windowStart: 180, // 21:00
  windowEnd: 420,    // 01:00
  permittedUse: 'community',
};

export default function ConstraintPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-15%' });
  const [constraints, setConstraints] = useState<Constraints>(DEFAULT_CONSTRAINTS);

  // Evaluate matches against constraints
  const evaluation = useMemo(() => {
    // Find matches that pass/fail based on constraints
    const testNeed = NEEDS[0]; // Use first need as test case
    const results = BUILDINGS.map(b => {
      const modifiedNeed = {
        ...testNeed,
        requiredCapacity: [constraints.minCapacity, constraints.maxCapacity] as [number, number],
        requiredAccess: Array.from(constraints.access) as ('public' | 'controlled' | 'staff-only')[],
        permittedWindow: [constraints.windowStart, constraints.windowEnd] as [number, number],
        preferredTypes: [constraints.permittedUse, 'community-hall', 'cultural'],
      };
      return canMatch(b, modifiedNeed, constraints.windowStart);
    });

    const valid = results.filter(r => r.isMatch);
    const blocked = results.filter(r => !r.isMatch);
    return { valid, blocked, total: results.length };
  }, [constraints]);

  const toggleAccess = (type: string) => {
    const newAccess = new Set(constraints.access);
    if (newAccess.has(type)) {
      newAccess.delete(type);
    } else {
      newAccess.add(type);
    }
    setConstraints({ ...constraints, access: newAccess });
  };

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
          NOT EVERY EMPTY ROOM
          <br />
          <span className="text-afterlight-text-secondary">SHOULD OPEN.</span>
        </motion.h2>

        <motion.p
          className="text-lg text-afterlight-text-secondary mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Availability is only the first filter.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Constraint controls */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Access */}
            <div>
              <div className="text-label mb-3">ACCESS</div>
              <div className="space-y-2">
                {['public', 'controlled', 'staff-only'].map(type => (
                  <button
                    key={type}
                    onClick={() => toggleAccess(type)}
                    className={`flex items-center gap-3 w-full p-2 rounded-sm transition-all ${
                      constraints.access.has(type)
                        ? 'bg-afterlight-surface-elevated'
                        : 'bg-afterlight-surface opacity-50'
                    }`}
                  >
                    <span className={`text-sm ${constraints.access.has(type) ? 'text-afterlight-matched' : 'text-red-400'}`}>
                      {constraints.access.has(type) ? '✓' : '×'}
                    </span>
                    <span className="text-xs font-mono tracking-wider text-afterlight-text-secondary uppercase">
                      {type.replace('-', ' ')}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Capacity */}
            <div>
              <div className="text-label mb-3">CAPACITY</div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={20}
                  max={200}
                  value={constraints.minCapacity}
                  onChange={(e) => setConstraints({ ...constraints, minCapacity: Number(e.target.value) })}
                  className="flex-1 accent-afterlight-amber"
                  aria-label="Minimum capacity"
                />
                <span className="text-sm font-mono text-afterlight-text-secondary w-20">
                  {constraints.minCapacity}–{constraints.maxCapacity}
                </span>
              </div>
            </div>

            {/* Permitted Use */}
            <div>
              <div className="text-label mb-3">PERMITTED USE</div>
              <div className="flex flex-wrap gap-2">
                {['community', 'education', 'cultural', 'workshop', 'market'].map(use => (
                  <button
                    key={use}
                    onClick={() => setConstraints({ ...constraints, permittedUse: use })}
                    className={`px-3 py-1.5 rounded-sm text-[10px] font-mono tracking-wider transition-all ${
                      constraints.permittedUse === use
                        ? 'bg-afterlight-amber/20 text-afterlight-amber border border-afterlight-amber/30'
                        : 'bg-afterlight-surface text-afterlight-text-muted border border-afterlight-line'
                    }`}
                  >
                    {use.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Architectural space visualization */}
            <svg viewBox="0 0 360 200" className="w-full mb-6">
              <rect x="10" y="10" width="340" height="160" fill="#101419" stroke="#242A31" strokeWidth="0.5" rx="1" />

              {/* Building indicator */}
              <rect
                x="12" y="12" width="336" height="156" fill="none"
                stroke={evaluation.valid.length > 0 ? '#F4B860' : '#D8A76A'}
                strokeWidth="0.5" opacity="0.4" rx="1"
              />

              {/* Status text */}
              <text x="180" y="85" textAnchor="middle" className="text-[11px] font-mono fill-afterlight-text-primary">
                {evaluation.valid.length > 0 ? 'MATCH AVAILABLE' : 'MATCH BLOCKED'}
              </text>
              <text x="180" y="105" textAnchor="middle" className="text-[9px] font-mono fill-afterlight-text-muted">
                {evaluation.valid.length} OF {evaluation.total} SPACES PASS CONSTRAINTS
              </text>

              {/* Constraint summary dots */}
              <g transform="translate(100, 125)">
                {[
                  { label: 'ACCESS', pass: constraints.access.size > 0 },
                  { label: 'CAPACITY', pass: constraints.minCapacity <= 150 },
                  { label: 'USE', pass: true },
                ].map((item, i) => (
                  <g key={item.label} transform={`translate(${i * 60}, 0)`}>
                    <circle cx={8} cy={8} r={4} fill={item.pass ? '#B8D8C0' : '#D8A76A'} opacity={0.6} />
                    <text x={8} y={24} textAnchor="middle" className="text-[7px] fill-afterlight-text-muted font-mono">
                      {item.label}
                    </text>
                  </g>
                ))}
              </g>
            </svg>

            {/* Match results list */}
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {evaluation.valid.length > 0 ? (
                evaluation.valid.slice(0, 3).map(match => (
                  <div
                    key={match.building.id}
                    className="flex items-center justify-between p-3 bg-afterlight-surface rounded-sm border border-afterlight-line"
                  >
                    <div>
                      <div className="text-xs font-mono text-afterlight-text-primary">
                        {match.building.name.toUpperCase()}
                      </div>
                      <div className="text-[9px] font-mono text-afterlight-text-muted">
                        BUILDING / {match.building.id}
                      </div>
                    </div>
                    <span className="text-afterlight-matched text-xs">PASSES</span>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-afterlight-surface rounded-sm border border-afterlight-line text-center">
                  <span className="text-xs text-afterlight-text-muted">
                    No spaces match current constraints.
                    <br />
                    Adjust filters to find matches.
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
