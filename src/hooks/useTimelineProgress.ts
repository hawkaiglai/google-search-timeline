'use client';

import { useState, useEffect } from 'react';
import { useScrollPosition } from './useScrollPosition';
import { TIMELINE_CONFIG } from '@/lib/constants';
import { calculateYearProgress, getYearFromProgress } from '@/lib/utils/dateHelpers';

interface TimelineProgress {
  progress: number;
  currentYear: number;
  startYear: number;
  endYear: number;
  yearProgress: number;
  isActive: boolean;
}

export function useTimelineProgress(): TimelineProgress {
  const { startYear, endYear } = TIMELINE_CONFIG;
  const scrollPosition = useScrollPosition();
  
  const [progress, setProgress] = useState(0);
  const [currentYear, setCurrentYear] = useState(startYear);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const { progress } = scrollPosition;
    setProgress(progress);
    
    const year = getYearFromProgress(progress, startYear, endYear);
    setCurrentYear(year);
    
    setIsActive(progress > 0 && progress < 1);
  }, [scrollPosition, startYear, endYear]);

  const yearProgress = calculateYearProgress(currentYear, startYear, endYear);

  return {
    progress,
    currentYear,
    startYear,
    endYear,
    yearProgress,
    isActive,
  };
}
