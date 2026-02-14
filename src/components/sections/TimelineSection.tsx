'use client';

import React, { useState } from 'react';
import { TimelineContainer } from '@/components/timeline';
import { FilterPanel, SearchBar } from '@/components/ui';
import { useTimelineStore } from '@/store/timelineStore';
import { cn } from '@/lib/utils';

interface TimelineSectionProps {
  className?: string;
}

export function TimelineSection({ className }: TimelineSectionProps) {
  const { filteredMilestones, setFilter } = useTimelineStore();
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (query: string) => {
    setFilter({ searchTerm: query });
  };

  const handleFilterChange = (filter: any) => {
    setFilter(filter);
  };

  return (
    <section id="timeline" className={cn('relative bg-gray-50 dark:bg-gray-900', className)}>
      <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-md dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <SearchBar onSearch={handleSearch} className="flex-1 max-w-md" />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {showFilters && (
            <div className="mt-4">
              <FilterPanel onFilterChange={handleFilterChange} />
            </div>
          )}
        </div>
      </div>

      <TimelineContainer milestones={filteredMilestones} />
    </section>
  );
}
