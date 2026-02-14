'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { MILESTONE_CATEGORIES, IMPACT_LEVELS } from '@/lib/constants';
import type { MilestoneCategory, ImpactLevel } from '@/types';

interface FilterPanelProps {
  onFilterChange: (filter: {
    categories: MilestoneCategory[];
    impactLevels: ImpactLevel[];
    yearRange: { start: number; end: number };
  }) => void;
  className?: string;
}

export function FilterPanel({ onFilterChange, className }: FilterPanelProps) {
  const [selectedCategories, setSelectedCategories] = useState<MilestoneCategory[]>([]);
  const [selectedImpacts, setSelectedImpacts] = useState<ImpactLevel[]>([]);
  const [yearRange, setYearRange] = useState({ start: 1996, end: 2025 });

  const handleCategoryToggle = (category: MilestoneCategory) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(updated);
    onFilterChange({
      categories: updated,
      impactLevels: selectedImpacts,
      yearRange,
    });
  };

  const handleImpactToggle = (impact: ImpactLevel) => {
    const updated = selectedImpacts.includes(impact)
      ? selectedImpacts.filter(i => i !== impact)
      : [...selectedImpacts, impact];
    
    setSelectedImpacts(updated);
    onFilterChange({
      categories: selectedCategories,
      impactLevels: updated,
      yearRange,
    });
  };

  const handleYearChange = (type: 'start' | 'end', value: number) => {
    const updated = { ...yearRange, [type]: value };
    setYearRange(updated);
    onFilterChange({
      categories: selectedCategories,
      impactLevels: selectedImpacts,
      yearRange: updated,
    });
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedImpacts([]);
    setYearRange({ start: 1996, end: 2025 });
    onFilterChange({
      categories: [],
      impactLevels: [],
      yearRange: { start: 1996, end: 2025 },
    });
  };

  return (
    <div className={cn('rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800', className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Filters</h3>
        <button
          onClick={handleReset}
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          Reset
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">Categories</h4>
          <div className="space-y-2">
            {Object.entries(MILESTONE_CATEGORIES).map(([key, { name, color }]) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(key as MilestoneCategory)}
                  onChange={() => handleCategoryToggle(key as MilestoneCategory)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  {name}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">Impact Level</h4>
          <div className="space-y-2">
            {Object.entries(IMPACT_LEVELS).map(([key, { label }]) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedImpacts.includes(key as ImpactLevel)}
                  onChange={() => handleImpactToggle(key as ImpactLevel)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">Year Range</h4>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-600 dark:text-gray-400">Start: {yearRange.start}</label>
              <input
                type="range"
                min={1996}
                max={2025}
                value={yearRange.start}
                onChange={(e) => handleYearChange('start', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 dark:text-gray-400">End: {yearRange.end}</label>
              <input
                type="range"
                min={1996}
                max={2025}
                value={yearRange.end}
                onChange={(e) => handleYearChange('end', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
