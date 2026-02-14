'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { getCategoryColor } from '@/lib/utils/colorHelpers';
import type { MilestoneCategory } from '@/types';

interface CategoryBadgeProps {
  category: MilestoneCategory;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const categoryLabels: Record<MilestoneCategory, string> = {
  algorithm: 'Algorithm',
  feature: 'Feature',
  design: 'Design',
  infrastructure: 'Infrastructure',
  'ai-ml': 'AI/ML',
  mobile: 'Mobile',
  partnership: 'Partnership',
  acquisition: 'Acquisition',
  legal: 'Legal',
  'product-launch': 'Product',
};

export function CategoryBadge({ category, className, size = 'md' }: CategoryBadgeProps) {
  const color = getCategoryColor(category);
  const label = categoryLabels[category] || category;

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        sizes[size],
        className
      )}
      style={{
        backgroundColor: `${color}20`,
        color: color,
        borderColor: color,
        borderWidth: '1px',
      }}
    >
      {label}
    </span>
  );
}
