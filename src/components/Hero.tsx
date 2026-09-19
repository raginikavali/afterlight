import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { type Building } from '../data/buildings';
import { minutesToTime } from '../engine/time';
import { isSpaceAvailable } from '../engine/availability';
import CityMap from './CityMap';
import TimeScrubber from './TimeScrubber';
import CityStats from './CityStats';
import BuildingInspector from './BuildingInspector';

interface HeroProps {
  currentTime: number;
  onTimeChange: (time: number) => void;
  availableCount: number;
  availableCapacity: number;
  matchCount: number;
}

export default function Hero({
  currentTime,
  onTimeChange,
  availableCount,
  availableCapacity,
  matchCount,
}: HeroProps) {
  const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [tooltipBuilding, setTooltipBuilding] = useState<Building | null>(null);

  const handleBuildingHover = (building: Building | null) => {
    setHoveredBuilding(building?.id ?? null);
    setTooltipBuilding(building);
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-16">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          {/* Left — Text */}
          <div className="flex flex-col gap-8 lg:gap-10">
            {/* Label */}
            <motion.div
              className="arch-label"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              AFTERLIGHT / URBAN CAPACITY
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-hero font-bold leading-[0.85] tracking-display"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="text-afterlight-text-secondary font-light block text-[clamp(1.5rem,3vw,3rem)] tracking-[0.05em] mb-2 leading-none">
                THE CITY HAS
              </span>
              <span className="text-afterlight-amber">MORE SPACE</span>
              <br />
              THAN IT KNOWS.
            </motion.h1>

            {/* Subline */}
            <motion.p
              className="text-lg md:text-xl text-afterlight-text-secondary max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              AFTERLIGHT turns the hours buildings sit empty into usable capacity.
            </motion.p>

            {/* Approach strip — salvaged from HowItWorks */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className="text-label text-afterlight-amber">THE AFTERLIGHT APPROACH</div>
              {['OBSERVE', 'MATCH', 'USE'].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="w-8 h-px bg-afterlight-amber/40" />
                  <span className="text-xl font-light text-afterlight-text-primary tracking-wider">
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <button
                onClick={() => document.getElementById('operator-review')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                EXPLORE TONIGHT <span>→</span>
              </button>
              <span className="text-[10px] tracking-[0.1em] text-afterlight-text-muted">
                A TIME-BASED OPERATING LAYER FOR URBAN SPACE
              </span>
            </motion.div>
          </div>

          {/* Right — City + Controls */}
          <motion.div
            className="relative"
            id="hero-city"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {/* City map */}
            <div className="relative">
              <CityMap
                currentTime={currentTime}
                onBuildingHover={handleBuildingHover}
                onBuildingClick={setSelectedBuilding}
                hoveredBuilding={hoveredBuilding}
              />

              {/* Hover tooltip */}
              {tooltipBuilding && (
                <BuildingTooltip building={tooltipBuilding} currentTime={currentTime} />
              )}
            </div>

            {/* Time scrubber */}
            <div className="mt-6">
              <TimeScrubber currentTime={currentTime} onTimeChange={onTimeChange} />
            </div>

            {/* Stats */}
            <div className="mt-6">
              <div className="text-[10px] tracking-[0.15em] text-afterlight-text-muted mb-3">TONIGHT</div>
              <CityStats
                availableCount={availableCount}
                availableCapacity={availableCapacity}
                matchCount={matchCount}
              />
            </div>

            {/* Simulated label */}
            <div className="mt-4 text-[9px] font-mono tracking-[0.15em] text-afterlight-text-muted opacity-50">
              SIMULATED DISTRICT / ILLUSTRATIVE DATA
            </div>
          </motion.div>
        </div>
      </div>

      {/* Building Inspector */}
      <BuildingInspector
        building={selectedBuilding}
        currentTime={currentTime}
        onClose={() => setSelectedBuilding(null)}
      />
    </section>
  );
}

function BuildingTooltip({ building, currentTime }: { building: Building; currentTime: number }) {
  const available = isSpaceAvailable(building, currentTime);

  return (
    <motion.div
      className="absolute top-4 right-4 bg-afterlight-bg/95 border border-afterlight-line rounded-sm p-4 pointer-events-none z-20 min-w-[200px]"
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div className="text-[9px] font-mono text-afterlight-text-muted tracking-[0.15em] mb-2">
        BUILDING / {building.id}
      </div>
      <div className="text-sm font-medium text-afterlight-text-primary mb-3">
        {building.name.toUpperCase()}
      </div>
      <div className="space-y-1.5 text-[10px] font-mono tracking-wider">
        <div className="flex justify-between text-afterlight-text-muted">
          <span>{available ? 'AVAILABLE' : 'OCCUPIED'}</span>
          <span className={available ? 'text-afterlight-amber' : 'text-afterlight-text-muted'}>
            {minutesToTime(building.availableFrom)} — {minutesToTime(building.availableTo)}
          </span>
        </div>
        <div className="flex justify-between text-afterlight-text-muted">
          <span>CAPACITY</span>
          <span>{String(building.capacity).padStart(3, '0')} PEOPLE</span>
        </div>
        <div className="flex justify-between text-afterlight-text-muted">
          <span>ACCESS</span>
          <span>{building.access.toUpperCase()}</span>
        </div>
      </div>
    </motion.div>
  );
}
