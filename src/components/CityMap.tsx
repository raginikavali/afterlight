import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BUILDINGS, ROADS, type Building } from '../data/buildings';
import { isSpaceAvailable, getAvailabilityIntensity } from '../engine/availability';
import { getActivityLevel } from '../engine/time';

interface CityMapProps {
  currentTime: number;
  onBuildingHover?: (building: Building | null) => void;
  onBuildingClick?: (building: Building) => void;
  hoveredBuilding?: string | null;
  className?: string;
}

export default function CityMap({
  currentTime,
  onBuildingHover,
  onBuildingClick,
  hoveredBuilding,
  className = '',
}: CityMapProps) {
  const activityLevel = getActivityLevel(currentTime);

  // Generate ambient activity dots
  const activityDots = useMemo(() => {
    const dots: { x: number; y: number; delay: number; size: number }[] = [];
    const count = Math.floor(activityLevel * 30) + 5;
    // Use seeded positions for determinism
    for (let i = 0; i < count; i++) {
      const seed = i * 137.508;
      dots.push({
        x: (seed * 7.3) % 560 + 20,
        y: (seed * 4.7) % 440 + 20,
        delay: (i * 0.3) % 3,
        size: 1 + (i % 3) * 0.5,
      });
    }
    return dots;
  }, [activityLevel]);

  return (
    <svg
      viewBox="0 0 600 480"
      className={`w-full h-auto ${className}`}
      role="img"
      aria-label="Simulated district map showing building availability"
    >
      <defs>
        {/* Amber glow filter */}
        <filter id="amber-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feFlood floodColor="#F4B860" floodOpacity="0.3" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Subtle grid pattern */}
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a1f26" strokeWidth="0.3" />
        </pattern>
      </defs>

      {/* Background grid */}
      <rect width="600" height="480" fill="url(#grid)" opacity="0.5" />

      {/* Roads */}
      {ROADS.map((road, i) => (
        <line
          key={`road-${i}`}
          x1={road.x1} y1={road.y1}
          x2={road.x2} y2={road.y2}
          stroke="#151A20"
          strokeWidth={road.width}
        />
      ))}

      {/* Road center lines */}
      {ROADS.map((road, i) => (
        <line
          key={`road-center-${i}`}
          x1={road.x1} y1={road.y1}
          x2={road.x2} y2={road.y2}
          stroke="#1e2329"
          strokeWidth="0.5"
          strokeDasharray="8 6"
        />
      ))}

      {/* District label */}
      <text x="20" y="22" className="text-[9px] fill-afterlight-text-muted font-mono" opacity="0.4">
        DISTRICT / 04
      </text>
      <text x="520" y="22" className="text-[9px] fill-afterlight-text-muted font-mono" opacity="0.4">
        SIMULATED
      </text>

      {/* Buildings */}
      {BUILDINGS.map((building) => {
        const available = isSpaceAvailable(building, currentTime);
        const intensity = getAvailabilityIntensity(building, currentTime);
        const isHovered = hoveredBuilding === building.id;

        return (
          <g
            key={building.id}
            onMouseEnter={() => onBuildingHover?.(building)}
            onMouseLeave={() => onBuildingHover?.(null)}
            onClick={() => onBuildingClick?.(building)}
            className="cursor-pointer"
            role="button"
            aria-label={`${building.name} - ${available ? 'Available' : 'Occupied'}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onBuildingClick?.(building);
              }
            }}
          >
            {/* Building shadow */}
            <rect
              x={building.x + 2}
              y={building.y + 2}
              width={building.width}
              height={building.height}
              fill="#07090C"
              opacity="0.5"
              rx="1"
            />

            {/* Building body */}
            <rect
              x={building.x}
              y={building.y}
              width={building.width}
              height={building.height}
              fill={available ? `rgba(21, 26, 32, ${0.8 + intensity * 0.2})` : '#101419'}
              stroke={
                isHovered
                  ? '#FFD58A'
                  : available
                    ? `rgba(244, 184, 96, ${0.3 + intensity * 0.5})`
                    : '#242A31'
              }
              strokeWidth={isHovered ? 1.5 : available ? 0.75 : 0.5}
              rx="1"
              style={{
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                filter: available ? `drop-shadow(0 0 ${4 + intensity * 8}px rgba(244, 184, 96, ${intensity * 0.3}))` : 'none',
              }}
            />

            {/* Window dots when available */}
            {available && (
              <WindowDots building={building} intensity={intensity} />
            )}

            {/* Building ID */}
            <text
              x={building.x + building.width / 2}
              y={building.y - 5}
              textAnchor="middle"
              className="text-[7px] font-mono"
              fill={isHovered ? '#FFD58A' : available ? '#F4B860' : '#7E8792'}
              opacity={isHovered ? 1 : available ? 0.8 : 0.3}
              style={{ transition: 'all 0.5s ease' }}
            >
              {building.id}
            </text>

            {/* Hover highlight overlay */}
            {isHovered && (
              <motion.rect
                x={building.x - 2}
                y={building.y - 2}
                width={building.width + 4}
                height={building.height + 4}
                fill="none"
                stroke="#FFD58A"
                strokeWidth="0.5"
                strokeDasharray="4 2"
                rx="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </g>
        );
      })}

      {/* Activity dots */}
      {activityDots.map((dot, i) => (
        <circle
          key={`dot-${i}`}
          cx={dot.x}
          cy={dot.y}
          r={dot.size}
          fill="#F4B860"
          opacity={0.05 + activityLevel * 0.15}
          style={{
            transition: 'opacity 1s ease',
          }}
        >
          <animate
            attributeName="opacity"
            values={`${0.02 + activityLevel * 0.1};${0.08 + activityLevel * 0.2};${0.02 + activityLevel * 0.1}`}
            dur={`${3 + dot.delay}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {/* Intersection markers */}
      {[
        { x: 210, y: 155 },
        { x: 210, y: 275 },
        { x: 395, y: 155 },
        { x: 395, y: 275 },
        { x: 210, y: 370 },
        { x: 395, y: 370 },
      ].map((point, i) => (
        <circle
          key={`intersection-${i}`}
          cx={point.x}
          cy={point.y}
          r="3"
          fill="#1e2329"
          stroke="#242A31"
          strokeWidth="0.5"
        />
      ))}
    </svg>
  );
}

/** Render window dots inside a building */
function WindowDots({ building, intensity }: { building: Building; intensity: number }) {
  const cols = Math.max(2, Math.floor(building.width / 10));
  const rows = Math.max(2, Math.floor(building.height / 10));
  const dots: JSX.Element[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const seed = (parseInt(building.id) * 17 + r * 7 + c * 13) % 100;
      const lit = seed < intensity * 70;
      if (!lit) continue;

      dots.push(
        <rect
          key={`${r}-${c}`}
          x={building.x + 5 + c * ((building.width - 10) / cols)}
          y={building.y + 5 + r * ((building.height - 10) / rows)}
          width={3}
          height={3}
          fill="#F4B860"
          opacity={0.2 + intensity * 0.5 * ((seed % 30) / 30)}
          rx="0.5"
          style={{ transition: 'opacity 0.8s ease' }}
        />
      );
    }
  }

  return <>{dots}</>;
}
