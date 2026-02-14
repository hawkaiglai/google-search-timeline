'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { scrollToY } from '@/lib/utils/scrollHelpers';
import { TIMELINE_CONFIG } from '@/lib/constants';

interface TimelineScrubberProps {
  currentYear: number;
  onYearChange?: (year: number) => void;
  className?: string;
}

export function TimelineScrubber({ currentYear, onYearChange, className }: TimelineScrubberProps) {
  const { startYear, endYear } = TIMELINE_CONFIG;
  const [isDragging, setIsDragging] = useState(false);
  const scrubberRef = useRef<HTMLDivElement>(null);

  const progress = ((currentYear - startYear) / (endYear - startYear)) * 100;

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !scrubberRef.current) return;

    const rect = scrubberRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const year = Math.round(startYear + (percent / 100) * (endYear - startYear));

    if (onYearChange) {
      onYearChange(year);
    }

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    scrollToY((percent / 100) * maxScroll, false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const years = Array.from(
    { length: Math.ceil((endYear - startYear) / 5) + 1 },
    (_, i) => startYear + i * 5
  ).filter(year => year <= endYear);

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40',
        'bg-white/90 backdrop-blur-md dark:bg-gray-900/90',
        'border-t border-gray-200 dark:border-gray-800',
        'px-4 py-3',
        className
      )}
    >
      <div className="container mx-auto">
        <div className="mb-2 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
          {years.map(year => (
            <span key={year}>{year}</span>
          ))}
        </div>

        <div
          ref={scrubberRef}
          className="relative h-2 cursor-pointer rounded-full bg-gray-200 dark:bg-gray-700"
          onMouseDown={handleMouseDown}
        >
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-blue-600 transition-all"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-1/2 h-4 w-4 -translate-y-1/2 cursor-grab rounded-full bg-blue-600 shadow-lg active:cursor-grabbing"
            style={{ left: `${progress}%`, marginLeft: '-8px' }}
          />
        </div>

        <div className="mt-2 text-center text-sm font-medium text-gray-900 dark:text-gray-100">
          {currentYear}
        </div>
      </div>
    </div>
  );
}
