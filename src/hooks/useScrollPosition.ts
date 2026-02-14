'use client';

import { useState, useEffect, useCallback } from 'react';
import { throttle, getScrollProgress, getMaxScroll, getScrollDirection } from '@/lib/utils/scrollHelpers';
import type { ScrollPosition } from '@/types';

interface UseScrollPositionOptions {
  throttleMs?: number;
  onScroll?: (position: ScrollPosition) => void;
}

export function useScrollPosition(options: UseScrollPositionOptions = {}) {
  const { throttleMs = 16, onScroll } = options;
  
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    scrollProgress: 0,
    currentYear: 1996,
    direction: 'none',
  });

  const [prevScrollY, setPrevScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const maxScroll = getMaxScroll();
    const scrollProgress = getScrollProgress(scrollY, maxScroll);
    const direction = getScrollDirection(scrollY, prevScrollY);
    
    const position: ScrollPosition = {
      scrollY,
      scrollProgress,
      currentYear: Math.round(1996 + scrollProgress * (2025 - 1996)),
      direction,
    };

    setScrollPosition(position);
    setPrevScrollY(scrollY);
    
    if (onScroll) {
      onScroll(position);
    }
  }, [prevScrollY, onScroll]);

  useEffect(() => {
    const throttledScroll = throttle(handleScroll, throttleMs);
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [handleScroll, throttleMs]);

  return scrollPosition;
}
