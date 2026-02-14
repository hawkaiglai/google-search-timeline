'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { SlideInProps } from '@/types';

interface SlideInComponentProps extends SlideInProps {
  children: React.ReactNode;
  className?: string;
}

export function SlideIn({
  children,
  className = '',
  direction,
  duration = 0.6,
  delay = 0,
  distance = 50,
  ease = 'easeOut',
}: SlideInComponentProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const fromValues: Record<string, number> = { opacity: 0 };
    
    switch (direction) {
      case 'up':
        fromValues.y = distance;
        break;
      case 'down':
        fromValues.y = -distance;
        break;
      case 'left':
        fromValues.x = distance;
        break;
      case 'right':
        fromValues.x = -distance;
        break;
    }

    gsap.fromTo(
      element,
      fromValues,
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease,
      }
    );
  }, [direction, duration, delay, distance, ease]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
