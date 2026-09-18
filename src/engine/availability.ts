// ──────────────────────────────────────────────
// AFTERLIGHT — Availability Engine
// ──────────────────────────────────────────────

import { type Building, BUILDINGS } from '../data/buildings';

/** Check if a building is available at a given time (minutes from 18:00) */
export function isSpaceAvailable(building: Building, currentTime: number): boolean {
  if (building.availableFrom <= building.availableTo) {
    return currentTime >= building.availableFrom && currentTime <= building.availableTo;
  }
  // Wraps around midnight
  return currentTime >= building.availableFrom || currentTime <= building.availableTo;
}

/** Get the availability intensity (0-1) for smooth transitions */
export function getAvailabilityIntensity(building: Building, currentTime: number): number {
  if (!isSpaceAvailable(building, currentTime)) return 0;

  const rampMinutes = 30; // 30-minute ramp up/down
  const fromDiff = currentTime - building.availableFrom;
  const toDiff = building.availableTo - currentTime;

  const rampIn = Math.min(1, Math.max(0, fromDiff / rampMinutes));
  const rampOut = Math.min(1, Math.max(0, toDiff / rampMinutes));

  return Math.min(rampIn, rampOut);
}

/** Get all currently available spaces */
export function getAvailableSpaces(currentTime: number): Building[] {
  return BUILDINGS.filter(b => isSpaceAvailable(b, currentTime));
}

/** Get total available capacity in m² (approximate: capacity * 2.5 m²/person) */
export function getAvailableCapacity(currentTime: number): number {
  return getAvailableSpaces(currentTime).reduce((sum, b) => sum + Math.round(b.capacity * 2.5), 0);
}

/** Get count of available spaces */
export function getAvailableCount(currentTime: number): number {
  return getAvailableSpaces(currentTime).length;
}
