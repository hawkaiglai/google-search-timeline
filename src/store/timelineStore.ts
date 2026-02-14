import { create } from 'zustand';
import type { Milestone, TimelineFilter, ScrollPosition } from '@/types';

interface TimelineStore {
  milestones: Milestone[];
  filteredMilestones: Milestone[];
  selectedMilestoneId: string | null;
  scrollPosition: ScrollPosition;
  filter: TimelineFilter;
  isLoading: boolean;
  error: string | null;
  
  setMilestones: (milestones: Milestone[]) => void;
  setFilteredMilestones: (milestones: Milestone[]) => void;
  selectMilestone: (id: string | null) => void;
  setScrollPosition: (position: ScrollPosition) => void;
  setFilter: (filter: Partial<TimelineFilter>) => void;
  applyFilters: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialFilter: TimelineFilter = {
  categories: [],
  impactLevels: [],
  yearRange: { start: 1996, end: 2025 },
  searchTerm: '',
};

export const useTimelineStore = create<TimelineStore>((set, get) => ({
  milestones: [],
  filteredMilestones: [],
  selectedMilestoneId: null,
  scrollPosition: {
    scrollY: 0,
    scrollProgress: 0,
    currentYear: 1996,
    direction: 'none',
  },
  filter: initialFilter,
  isLoading: false,
  error: null,

  setMilestones: (milestones) => {
    set({ milestones, filteredMilestones: milestones });
    get().applyFilters();
  },

  setFilteredMilestones: (filteredMilestones) => set({ filteredMilestones }),

  selectMilestone: (id) => set({ selectedMilestoneId: id }),

  setScrollPosition: (scrollPosition) => set({ scrollPosition }),

  setFilter: (filterUpdate) => {
    set(state => ({
      filter: { ...state.filter, ...filterUpdate },
    }));
    get().applyFilters();
  },

  applyFilters: () => {
    const { milestones, filter } = get();
    
    const filtered = milestones.filter(milestone => {
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
    
    set({ filteredMilestones: filtered });
  },

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  reset: () => set({
    filteredMilestones: get().milestones,
    selectedMilestoneId: null,
    filter: initialFilter,
    error: null,
  }),
}));
