// ──────────────────────────────────────────────
// AFTERLIGHT — Time Engine
// ──────────────────────────────────────────────

/**
 * Time is represented as minutes from 18:00.
 * 0 = 18:00, 60 = 19:00, 120 = 20:00, ..., 720 = 06:00
 */

export function minutesToTime(minutes: number): string {
  const totalMinutes = (18 * 60 + minutes) % (24 * 60);
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

export function formatTimeShort(minutes: number): string {
  const totalMinutes = (18 * 60 + minutes) % (24 * 60);
  const hours = Math.floor(totalMinutes / 60);
  return `${hours.toString().padStart(2, '0')}:00`;
}

export function getTimeLabel(minutes: number): string {
  const time = minutesToTime(minutes);
  const hour = parseInt(time.split(':')[0]);
  if (hour >= 6 && hour < 12) return 'MORNING';
  if (hour >= 12 && hour < 17) return 'AFTERNOON';
  if (hour >= 17 && hour < 21) return 'EVENING';
  if (hour >= 21 || hour < 1) return 'NIGHT';
  return 'LATE NIGHT';
}

export function getActivityLevel(minutes: number): number {
  // Returns 0-1 representing general city activity
  if (minutes <= 60) return 0.8;    // 18:00-19:00 still busy
  if (minutes <= 120) return 0.6;   // 19:00-20:00 winding down
  if (minutes <= 180) return 0.4;   // 20:00-21:00 quieting
  if (minutes <= 240) return 0.25;  // 21:00-22:00 quiet
  if (minutes <= 360) return 0.15;  // 22:00-00:00 very quiet
  if (minutes <= 480) return 0.1;   // 00:00-02:00 minimal
  if (minutes <= 600) return 0.08;  // 02:00-04:00 lowest
  if (minutes <= 660) return 0.2;   // 04:00-05:00 early risers
  return 0.5;                        // 05:00-06:00 waking up
}

/** Interpolate between two values based on a 0-1 progress */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * Math.max(0, Math.min(1, t));
}
