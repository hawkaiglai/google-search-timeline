'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { FadeInProps } from '@/types';

interface FadeInComponentProps extends FadeInProps {
  children: React.ReactNode;
  className?: string;
}

export function FadeIn({
  children,
  className = '',
  direction = 'in',
  duration = 0.6,
  delay = 0,
  from = 0,
  to = 1,
  ease = 'easeOut',
}: FadeInComponentProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    
    if (direction === 'in') {
      gsap.fromTo(
        element,
        { opacity: from, y: 20 },
        {
          opacity: to,
          y: 0,
          duration,
          delay,
          ease,
        }
      );
    } else {
      gsap.fromTo(
        element,
        { opacity: to },
        {
          opacity: from,
          duration,
          delay,
          ease,
        }
      );
    }
  }, [direction, duration, delay, from, to, ease]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
