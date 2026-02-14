'use client';

import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ui';
import { Navigation } from './Navigation';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'bg-white/80 backdrop-blur-md dark:bg-gray-900/80',
        'border-b border-gray-200 dark:border-gray-800',
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700">
              <span className="text-xl font-bold text-white">G</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Google Search
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                Timeline
              </span>
            </div>
          </Link>

          <Navigation />

          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
