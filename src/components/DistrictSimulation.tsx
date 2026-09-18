import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CityMap from './CityMap';
import TimeScrubber from './TimeScrubber';
import DemandPanel from './DemandPanel';
import MatchVisualizer from './MatchVisualizer';
import BuildingInspector from './BuildingInspector';
import { useTimeEngine } from '../hooks/useTimeEngine';
import { type Building } from '../data/buildings';
import { type Need, NEEDS } from '../data/needs';
import { canMatch } from '../engine/matching';
import { BUILDINGS } from '../data/buildings';

export default function DistrictSimulation() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-10%' });
  const timeEngine = useTimeEngine(240); // Start at 22:00
  const [selectedNeed, setSelectedNeed] = useState<Need | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [inspectBuilding, setInspectBuilding] = useState<Building | null>(null);
  const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null);
  const [showNothingBuilt, setShowNothingBuilt] = useState(false);

  // Auto-trigger "Nothing was built" when user reaches 22:00
  const handleTimeChange = (time: number) => {
    timeEngine.setTime(time);
    if (time >= 230 && time <= 260 && !showNothingBuilt) {
      setShowNothingBuilt(true);
      setTimeout(() => setShowNothingBuilt(false), 4000);
    }
  };

  // Find best matching building for selected need
  const matchResult = selectedNeed
    ? (() => {
        const results = BUILDINGS.map(b => canMatch(b, selectedNeed, timeEngine.currentTime));
        const valid = results.filter(r => r.isMatch).sort((a, b) => b.score - a.score);
        return valid.length > 0 ? valid[0] : results.sort((a, b) => b.score - a.score)[0];
      })()
    : null;

  return (
    <section id="district-sim" className="section-spacing relative" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-display font-bold tracking-display leading-[0.95] mb-4">
            GIVE THE CITY <span className="text-afterlight-amber">ONE NIGHT.</span>
          </h2>
          <p className="text-lg text-afterlight-text-secondary">
            Watch available space emerge as the clock moves.
          </p>
        </motion.div>

        {/* District label */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-label">SIMULATED DISTRICT / FRIDAY NIGHT</div>
          <div className="text-data">{timeEngine.displayTime}</div>
        </div>

        {/* Main grid: City + Demand panel */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-8">
          {/* City */}
          <div>
            <div className="relative">
              <CityMap
                currentTime={timeEngine.currentTime}
                onBuildingHover={(b) => setHoveredBuilding(b?.id ?? null)}
                onBuildingClick={setInspectBuilding}
                hoveredBuilding={hoveredBuilding}
              />

              {/* "Nothing was built" overlay */}
              {showNothingBuilt && (
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center bg-afterlight-bg/80 z-30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.p
                    className="text-2xl md:text-4xl font-bold tracking-display text-afterlight-text-primary text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    NOTHING WAS BUILT.
                  </motion.p>
                  <motion.p
                    className="text-lg md:text-xl text-afterlight-amber mt-4 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  >
                    WE JUST LOOKED AT THE CLOCK.
                  </motion.p>
                </motion.div>
              )}
            </div>

            {/* Timeline */}
            <div className="mt-6 flex justify-center">
              <TimeScrubber
                currentTime={timeEngine.currentTime}
                onTimeChange={handleTimeChange}
              />
            </div>

            {/* Live stats */}
            <div className="mt-6 flex flex-wrap gap-8">
              <div>
                <span className="text-2xl font-mono text-afterlight-text-primary">
                  {timeEngine.availableCount}
                </span>
                <span className="text-[10px] tracking-[0.15em] text-afterlight-text-muted ml-2">
                  SPACES
                </span>
              </div>
              <div>
                <span className="text-2xl font-mono text-afterlight-text-primary">
                  {timeEngine.availableCapacity.toLocaleString()}
                </span>
                <span className="text-[10px] tracking-[0.15em] text-afterlight-text-muted ml-2">
                  M²
                </span>
              </div>
              <div>
                <span className="text-2xl font-mono text-afterlight-amber">
                  {timeEngine.matchCount}
                </span>
                <span className="text-[10px] tracking-[0.15em] text-afterlight-text-muted ml-2">
                  MATCHES
                </span>
              </div>
            </div>
          </div>

          {/* Demand panel */}
          <DemandPanel
            needs={NEEDS}
            selectedNeed={selectedNeed}
            onSelectNeed={setSelectedNeed}
          />
        </div>

        {/* Match visualization */}
        {matchResult && selectedNeed && (
          <div className="mt-12">
            <MatchVisualizer
              result={matchResult}
              onClearMatch={() => setSelectedNeed(null)}
            />
          </div>
        )}
      </div>

      {/* Building Inspector */}
      <BuildingInspector
        building={inspectBuilding}
        currentTime={timeEngine.currentTime}
        onClose={() => setInspectBuilding(null)}
      />
    </section>
  );
}
