'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import type { GSAPTimelineConfig, TimelineAnimationState } from '@/types';

export function useGSAPTimeline(config: GSAPTimelineConfig = {}) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [state, setState] = useState<TimelineAnimationState>({
    isPlaying: false,
    progress: 0,
    currentTime: 0,
    duration: 0,
    isPaused: config.paused || false,
  });

  useEffect(() => {
    timelineRef.current = gsap.timeline({
      ...config,
      onUpdate: () => {
        if (timelineRef.current) {
          setState({
            isPlaying: timelineRef.current.isActive(),
            progress: timelineRef.current.progress(),
            currentTime: timelineRef.current.time(),
            duration: timelineRef.current.duration(),
            isPaused: timelineRef.current.paused(),
          });
        }
        if (config.onUpdate) config.onUpdate();
      },
    });

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  const play = () => timelineRef.current?.play();
  const pause = () => timelineRef.current?.pause();
  const reverse = () => timelineRef.current?.reverse();
  const restart = () => timelineRef.current?.restart();
  const seek = (time: number) => timelineRef.current?.seek(time);
  const progress = (value?: number) => {
    if (value !== undefined) {
      return timelineRef.current?.progress(value);
    }
    return timelineRef.current?.progress();
  };

  return {
    timeline: timelineRef.current,
    state,
    play,
    pause,
    reverse,
    restart,
    seek,
    progress,
  };
}
