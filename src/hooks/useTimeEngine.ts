import { useState, useCallback, useMemo } from 'react';
import { BUILDINGS } from '../data/buildings';
import { NEEDS } from '../data/needs';
import { getAvailableSpaces, getAvailableCapacity, getAvailableCount } from '../engine/availability';
import { getPotentialMatches, getMatchCount } from '../engine/matching';
import { minutesToTime, getTimeLabel, getActivityLevel } from '../engine/time';

export function useTimeEngine(initialTime: number = 150) {
  const [currentTime, setCurrentTime] = useState(initialTime); // default ~20:30

  const setTime = useCallback((time: number) => {
    setCurrentTime(Math.max(0, Math.min(720, Math.round(time))));
  }, []);

  const derived = useMemo(() => {
    const availableSpaces = getAvailableSpaces(currentTime);
    const availableCapacity = getAvailableCapacity(currentTime);
    const availableCount = getAvailableCount(currentTime);
    const matches = getPotentialMatches(BUILDINGS, NEEDS, currentTime);
    const matchCount = getMatchCount(BUILDINGS, NEEDS, currentTime);
    const displayTime = minutesToTime(currentTime);
    const timeLabel = getTimeLabel(currentTime);
    const activityLevel = getActivityLevel(currentTime);

    return {
      availableSpaces,
      availableCapacity,
      availableCount,
      matches,
      matchCount,
      displayTime,
      timeLabel,
      activityLevel,
    };
  }, [currentTime]);

  return {
    currentTime,
    setTime,
    ...derived,
  };
}
