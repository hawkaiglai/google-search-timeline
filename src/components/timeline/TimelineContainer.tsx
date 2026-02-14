'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { MilestoneCard } from './MilestoneCard';
import { YearMarker } from './YearMarker';
import { TimelineScrubber } from './TimelineScrubber';
import { MilestoneModal } from './MilestoneModal';
import { useTimelineProgress } from '@/hooks';
import type { Milestone } from '@/types';

interface TimelineContainerProps {
  milestones: Milestone[];
  className?: string;
}

export function TimelineContainer({ milestones, className }: TimelineContainerProps) {
  const { currentYear } = useTimelineProgress();
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMilestoneClick = (milestone: Milestone) => {
    setSelectedMilestone(milestone);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMilestone(null), 300);
  };

  const groupedByYear = milestones.reduce((acc, milestone) => {
    if (!acc[milestone.year]) {
      acc[milestone.year] = [];
    }
    acc[milestone.year].push(milestone);
    return acc;
  }, {} as Record<number, Milestone[]>);

  const years = Object.keys(groupedByYear)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <>
      <div className={cn('relative min-h-screen py-20', className)}>
        <div className="container mx-auto px-4">
          {years.map((year, yearIndex) => (
            <div key={year} className="relative mb-32">
              <YearMarker
                year={year}
                isActive={currentYear === year}
                className="mb-8"
              />

              <div className="ml-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {groupedByYear[year].map((milestone, index) => (
                  <MilestoneCard
                    key={milestone.id}
                    milestone={milestone}
                    onClick={() => handleMilestoneClick(milestone)}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <TimelineScrubber currentYear={currentYear} />

      <MilestoneModal
        milestone={selectedMilestone}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
