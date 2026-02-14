import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface ScrollState {
  progress: number;
  direction: 'up' | 'down' | 'idle';
  scrollY: number;
  activeYear: number | null;
  setProgress: (p: number) => void;
  setDirection: (d: 'up' | 'down' | 'idle') => void;
  setScrollY: (y: number) => void;
  setActiveYear: (year: number | null) => void;
}

export const useScrollStore = create(
  subscribeWithSelector<ScrollState>((set) => ({
    progress: 0,
    direction: 'idle',
    scrollY: 0,
    activeYear: null,
    setProgress: (progress) => set({ progress }),
    setDirection: (direction) => set({ direction }),
    setScrollY: (scrollY) => set({ scrollY }),
    setActiveYear: (activeYear) => set({ activeYear }),
  }))
);
