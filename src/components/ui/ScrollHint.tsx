'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ScrollHintProps {
  className?: string;
  autoHide?: boolean;
  hideDelay?: number;
}

export function ScrollHint({ className, autoHide = true, hideDelay = 3000 }: ScrollHintProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!autoHide) return;

    const handleScroll = () => {
      setIsVisible(false);
    };

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, hideDelay);

    window.addEventListener('scroll', handleScroll, { once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [autoHide, hideDelay]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed bottom-8 left-1/2 z-50 -translate-x-1/2 transform',
        'animate-bounce',
        className
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Scroll to explore
        </span>
        <svg
          className="h-6 w-6 text-gray-600 dark:text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
}
