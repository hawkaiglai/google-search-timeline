'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface YearMarkerProps {
  year: number;
  isActive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function YearMarker({ year, isActive, className, style }: YearMarkerProps) {
  return (
    <div
      className={cn(
        'absolute flex items-center gap-2',
        className
      )}
      style={style}
    >
      <div
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300',
          isActive
            ? 'border-blue-600 bg-blue-600 text-white shadow-lg'
            : 'border-gray-300 bg-white text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300'
        )}
      >
        <span className="text-sm font-bold">{year.toString().slice(-2)}</span>
      </div>
      <span
        className={cn(
          'text-lg font-semibold transition-colors duration-300',
          isActive
            ? 'text-blue-600 dark:text-blue-400'
            : 'text-gray-600 dark:text-gray-400'
        )}
      >
        {year}
      </span>
    </div>
  );
}
