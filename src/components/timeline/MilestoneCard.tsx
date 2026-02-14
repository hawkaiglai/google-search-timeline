'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils/dateHelpers';
import { CategoryBadge } from '@/components/ui';
import type { Milestone } from '@/types';

interface MilestoneCardProps {
  milestone: Milestone;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function MilestoneCard({ milestone, onClick, className, style }: MilestoneCardProps) {
  const { title, description, year, month, day, category, impact, images } = milestone;

  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative cursor-pointer overflow-hidden rounded-lg border bg-white shadow-md transition-all duration-300',
        'hover:shadow-xl hover:-translate-y-1',
        'dark:border-gray-700 dark:bg-gray-800',
        className
      )}
      style={style}
    >
      {images && images.length > 0 && (
        <div className="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img
            src={images[0].url}
            alt={images[0].alt}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {formatDate(year, month, day)}
          </span>
          <CategoryBadge category={category} size="sm" />
        </div>

        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>

        <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>

        {impact && (
          <div className="mt-3 flex items-center gap-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  'h-1.5 w-8 rounded-full',
                  i < { low: 1, medium: 2, high: 3, critical: 4 }[impact]
                    ? 'bg-blue-600'
                    : 'bg-gray-200 dark:bg-gray-700'
                )}
              />
            ))}
          </div>
        )}
      </div>

      <div className="absolute inset-0 rounded-lg bg-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-5" />
    </div>
  );
}
