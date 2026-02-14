'use client';

import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type { Milestone, TimelineState, TimelineFilter } from '@/types';

interface TimelineContextValue extends TimelineState {
  setMilestones: (milestones: Milestone[]) => void;
  setFilter: (filter: Partial<TimelineFilter>) => void;
  selectMilestone: (id: string | null) => void;
  filterMilestones: (filter: TimelineFilter) => void;
}

const TimelineContext = createContext<TimelineContextValue | undefined>(undefined);

interface TimelineProviderProps {
  children: React.ReactNode;
  initialMilestones?: Milestone[];
}

export function TimelineProvider({ children, initialMilestones = [] }: TimelineProviderProps) {
  const [state, setState] = useState<TimelineState>({
    milestones: initialMilestones,
    filteredMilestones: initialMilestones,
    currentMilestone: null,
    selectedMilestoneId: null,
    scrollPosition: {
      scrollY: 0,
      scrollProgress: 0,
      currentYear: 1996,
      direction: 'none',
    },
    isLoading: false,
    error: null,
  });

  const setMilestones = useCallback((milestones: Milestone[]) => {
    setState(prev => ({
      ...prev,
      milestones,
      filteredMilestones: milestones,
    }));
  }, []);

  const filterMilestones = useCallback((filter: TimelineFilter) => {
    setState(prev => {
      const filtered = prev.milestones.filter(milestone => {
        if (filter.categories.length > 0 && !filter.categories.includes(milestone.category)) {
          return false;
        }
        
        if (filter.impactLevels.length > 0 && !filter.impactLevels.includes(milestone.impact)) {
          return false;
        }
        
        if (milestone.year < filter.yearRange.start || milestone.year > filter.yearRange.end) {
          return false;
        }
        
        if (filter.searchTerm) {
          const searchLower = filter.searchTerm.toLowerCase();
          const matchesTitle = milestone.title.toLowerCase().includes(searchLower);
          const matchesDescription = milestone.description.toLowerCase().includes(searchLower);
          const matchesTags = milestone.tags?.some(tag => tag.toLowerCase().includes(searchLower));
          
          if (!matchesTitle && !matchesDescription && !matchesTags) {
            return false;
          }
        }
        
        return true;
      });
      
      return {
        ...prev,
        filteredMilestones: filtered,
      };
    });
  }, []);

  const setFilter = useCallback((filter: Partial<TimelineFilter>) => {
    const currentFilter: TimelineFilter = {
      categories: filter.categories || [],
      impactLevels: filter.impactLevels || [],
      yearRange: filter.yearRange || { start: 1996, end: 2025 },
      searchTerm: filter.searchTerm || '',
    };
    
    filterMilestones(currentFilter);
  }, [filterMilestones]);

  const selectMilestone = useCallback((id: string | null) => {
    setState(prev => {
      const milestone = id ? prev.milestones.find(m => m.id === id) || null : null;
      return {
        ...prev,
        selectedMilestoneId: id,
        currentMilestone: milestone,
      };
    });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      setMilestones,
      setFilter,
      selectMilestone,
      filterMilestones,
    }),
    [state, setMilestones, setFilter, selectMilestone, filterMilestones]
  );

  return <TimelineContext.Provider value={value}>{children}</TimelineContext.Provider>;
}

export function useTimelineContext(): TimelineContextValue {
  const context = useContext(TimelineContext);
  
  if (!context) {
    throw new Error('useTimelineContext must be used within a TimelineProvider');
  }
  
  return context;
}
