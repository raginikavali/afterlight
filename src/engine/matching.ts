// ──────────────────────────────────────────────
// AFTERLIGHT — Matching Engine
// ──────────────────────────────────────────────

import { type Building } from '../data/buildings';
import { type Need } from '../data/needs';
import { isSpaceAvailable } from './availability';

export interface MatchResult {
  isMatch: boolean;
  building: Building;
  need: Need;
  reasons: MatchReason[];
  score: number;
}

export interface MatchReason {
  criterion: string;
  passed: boolean;
  detail: string;
}

/** Check if a building can match a need, returning detailed reasons */
export function canMatch(building: Building, need: Need, currentTime: number): MatchResult {
  const reasons: MatchReason[] = [];
  let score = 0;

  // 1. Time alignment — is the space available during the need's window?
  const timeStart = need.permittedWindow[0];
  const timeEnd = need.permittedWindow[1];
  const timeAvailable = isSpaceAvailable(building, timeStart) && isSpaceAvailable(building, timeEnd);
  reasons.push({
    criterion: 'TIME ALIGNS',
    passed: timeAvailable,
    detail: timeAvailable
      ? `Available during required window`
      : `Space not available during ${formatWindow(need.permittedWindow)}`,
  });
  if (timeAvailable) score += 25;

  // 2. Capacity fits
  const capacityFits = building.capacity >= need.requiredCapacity[0];
  reasons.push({
    criterion: 'CAPACITY FITS',
    passed: capacityFits,
    detail: capacityFits
      ? `${building.capacity} seats ≥ ${need.requiredCapacity[0]} required`
      : `${building.capacity} seats < ${need.requiredCapacity[0]} required`,
  });
  if (capacityFits) score += 25;

  // 3. Distance acceptable
  const distanceFits = building.distanceToNeeds <= need.maxDistance;
  reasons.push({
    criterion: 'DISTANCE FITS',
    passed: distanceFits,
    detail: distanceFits
      ? `${building.distanceToNeeds} km ≤ ${need.maxDistance} km limit`
      : `${building.distanceToNeeds} km > ${need.maxDistance} km limit`,
  });
  if (distanceFits) score += 25;

  // 4. Permitted use compatible
  const useCompatible = building.permittedUses.some(use =>
    need.preferredTypes.some(pref => pref.includes(use) || use.includes(pref))
  );
  reasons.push({
    criterion: 'PERMITTED USE',
    passed: useCompatible,
    detail: useCompatible
      ? `Compatible use types found`
      : `No compatible use types`,
  });
  if (useCompatible) score += 15;

  // 5. Access requirements
  const accessOk = need.requiredAccess.includes(building.access);
  reasons.push({
    criterion: 'ACCESS',
    passed: accessOk,
    detail: accessOk
      ? `${building.access} access permitted`
      : `${building.access} access not in required: ${need.requiredAccess.join(', ')}`,
  });
  if (accessOk) score += 10;

  const isMatch = reasons.every(r => r.passed);

  return { isMatch, building, need, reasons, score };
}

/** Get all potential matches for a given time */
export function getPotentialMatches(
  buildings: Building[],
  needs: Need[],
  currentTime: number
): MatchResult[] {
  const matches: MatchResult[] = [];
  for (const building of buildings) {
    for (const need of needs) {
      const result = canMatch(building, need, currentTime);
      if (result.isMatch) {
        matches.push(result);
      }
    }
  }
  return matches.sort((a, b) => b.score - a.score);
}

/** Count potential matches at a given time */
export function getMatchCount(
  buildings: Building[],
  needs: Need[],
  currentTime: number
): number {
  return getPotentialMatches(buildings, needs, currentTime).length;
}

function formatWindow(window: [number, number]): string {
  const toTime = (m: number) => {
    const total = (18 * 60 + m) % (24 * 60);
    const h = Math.floor(total / 60);
    return `${h.toString().padStart(2, '0')}:00`;
  };
  return `${toTime(window[0])}–${toTime(window[1])}`;
}
