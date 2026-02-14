'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Navigation() {
  const links = [
    { href: '#timeline', label: 'Timeline' },
    { href: '#about', label: 'About' },
  ];

  return (
    <nav className="hidden md:block">
      <ul className="flex items-center gap-6">
        {links.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                'text-sm font-medium text-gray-700 dark:text-gray-300',
                'transition-colors hover:text-blue-600 dark:hover:text-blue-400'
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
