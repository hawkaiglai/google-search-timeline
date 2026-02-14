'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SpiralPlaceholderProps {
  className?: string;
}

export function SpiralPlaceholder({ className }: SpiralPlaceholderProps) {
  return (
    <div
      className={cn(
        'relative h-full w-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10',
        'flex items-center justify-center',
        className
      )}
    >
      <div className="text-center space-y-4">
        <div className="h-32 w-32 mx-auto rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin" />
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading 3D Timeline...</p>
      </div>
    </div>
  );
}
