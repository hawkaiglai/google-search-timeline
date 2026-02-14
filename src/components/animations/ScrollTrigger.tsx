'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger as GSAPScrollTrigger } from 'gsap/ScrollTrigger';
import type { ScrollTriggerConfig } from '@/types';

gsap.registerPlugin(GSAPScrollTrigger);

interface ScrollTriggerComponentProps {
  children: React.ReactNode;
  className?: string;
  config: ScrollTriggerConfig;
  animation?: gsap.TweenVars;
}

export function ScrollTrigger({
  children,
  className = '',
  config,
  animation,
}: ScrollTriggerComponentProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<GSAPScrollTrigger | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const triggerElement = typeof config.trigger === 'string'
      ? document.querySelector(config.trigger)
      : config.trigger || element;

    if (animation) {
      gsap.fromTo(
        element,
        animation.from || {},
        {
          ...animation.to,
          scrollTrigger: {
            trigger: triggerElement,
            start: config.start || 'top 80%',
            end: config.end || 'bottom 20%',
            scrub: config.scrub ?? false,
            pin: config.pin ?? false,
            markers: config.markers ?? false,
            once: config.once ?? false,
            toggleActions: config.toggleActions || 'play none none none',
            onEnter: config.onEnter,
            onLeave: config.onLeave,
            onEnterBack: config.onEnterBack,
            onLeaveBack: config.onLeaveBack,
          },
        }
      );
    } else {
      triggerRef.current = GSAPScrollTrigger.create({
        trigger: triggerElement,
        start: config.start || 'top 80%',
        end: config.end || 'bottom 20%',
        scrub: config.scrub ?? false,
        pin: config.pin ?? false,
        markers: config.markers ?? false,
        onEnter: config.onEnter,
        onLeave: config.onLeave,
        onEnterBack: config.onEnterBack,
        onLeaveBack: config.onLeaveBack,
      });
    }

    return () => {
      if (triggerRef.current) {
        triggerRef.current.kill();
      }
    };
  }, [config, animation]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
