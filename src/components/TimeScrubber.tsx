import { useRef, useCallback } from 'react';
import { minutesToTime } from '../engine/time';

interface TimeScrubberProps {
  currentTime: number;
  onTimeChange: (time: number) => void;
  compact?: boolean;
}

export default function TimeScrubber({ currentTime, onTimeChange, compact = false }: TimeScrubberProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const calculateTime = useCallback((clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    onTimeChange(Math.round(ratio * 720));
  }, [onTimeChange]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    calculateTime(e.clientX);
  }, [calculateTime]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    calculateTime(e.clientX);
  }, [calculateTime]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const progress = (currentTime / 720) * 100;

  // Generate hour markers
  const hours = compact
    ? [0, 120, 240, 360, 480, 600, 720]
    : [0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720];

  return (
    <div className={`w-full ${compact ? 'max-w-md' : 'max-w-2xl'}`}>
      {!compact && (
        <div className="flex items-center justify-between mb-3">
          <span className="text-label">TONIGHT / CAPACITY VIEW</span>
          <span className="font-mono text-afterlight-amber text-sm tracking-wider">
            {minutesToTime(currentTime)}
          </span>
        </div>
      )}

      {/* Track */}
      <div
        ref={trackRef}
        className="relative h-10 flex items-center cursor-grab active:cursor-grabbing touch-none select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        role="slider"
        aria-label="Time scrubber"
        aria-valuemin={0}
        aria-valuemax={720}
        aria-valuenow={currentTime}
        aria-valuetext={minutesToTime(currentTime)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') onTimeChange(Math.min(720, currentTime + 15));
          if (e.key === 'ArrowLeft') onTimeChange(Math.max(0, currentTime - 15));
        }}
      >
        {/* Background track */}
        <div className="absolute inset-y-4 left-0 right-0 h-[2px] bg-afterlight-line rounded-full" />

        {/* Filled track */}
        <div
          className="absolute inset-y-4 left-0 h-[2px] bg-afterlight-amber/60 rounded-full transition-all duration-75"
          style={{ width: `${progress}%` }}
        />

        {/* Hour markers */}
        {hours.map((minute) => {
          const pos = (minute / 720) * 100;
          return (
            <div
              key={minute}
              className="absolute top-0 flex flex-col items-center"
              style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
            >
              <div className={`w-px ${compact ? 'h-2' : 'h-3'} bg-afterlight-line`} />
              {!compact && (
                <span className="mt-1 text-[9px] font-mono text-afterlight-text-muted tracking-wider">
                  {minutesToTime(minute)}
                </span>
              )}
            </div>
          );
        })}

        {/* Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none"
          style={{ left: `${progress}%`, transform: `translateX(-50%) translateY(-50%)` }}
        >
          <div className="w-4 h-4 rounded-full bg-afterlight-amber border-2 border-afterlight-bg shadow-lg shadow-afterlight-amber/30" />
          {compact && (
            <span className="mt-1 text-[9px] font-mono text-afterlight-amber tracking-wider whitespace-nowrap">
              {minutesToTime(currentTime)}
            </span>
          )}
        </div>
      </div>

      {/* Start/End labels */}
      {!compact && (
        <div className="flex justify-between mt-0">
          <span className="text-[10px] font-mono text-afterlight-text-muted">18:00</span>
          <span className="text-[10px] font-mono text-afterlight-text-muted">06:00</span>
        </div>
      )}
    </div>
  );
}
