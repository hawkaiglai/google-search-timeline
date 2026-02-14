'use client';

import { useEffect } from 'react';
import { useScrollStore } from '@/store/scrollStore';

export function useScrollPosition() {
  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;

    const updateScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

      const direction = scrollY > lastScrollY ? 'down' : scrollY < lastScrollY ? 'up' : 'idle';
      lastScrollY = scrollY;

      useScrollStore.getState().setProgress(progress);
      useScrollStore.getState().setDirection(direction);
      useScrollStore.getState().setScrollY(scrollY);

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return useScrollStore((state) => ({
    progress: state.progress,
    direction: state.direction,
    scrollY: state.scrollY,
  }));
}
