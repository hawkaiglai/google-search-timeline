import type { Milestone } from './milestone';

export interface TimelineConfig {
  startYear: number;
  endYear: number;
  scrollSpeed: number;
  autoScroll: boolean;
  enableFilters: boolean;
  enableSearch: boolean;
  pathType: 'linear' | 'curved' | 'organic';
  cardSpacing: number;
  cardWidth: number;
  cardHeight: number;
}

export interface ScrollPosition {
  scrollY: number;
  scrollProgress: number;
  currentYear: number;
  direction: ScrollDirection;
}

export type ScrollDirection = 'up' | 'down' | 'none';

export interface TimelineState {
  milestones: Milestone[];
  filteredMilestones: Milestone[];
  currentMilestone: Milestone | null;
  selectedMilestoneId: string | null;
  scrollPosition: ScrollPosition;
  isLoading: boolean;
  error: string | null;
}

export interface TimelineFilter {
  categories: string[];
  impactLevels: string[];
  yearRange: YearRange;
  searchTerm: string;
}

export interface YearRange {
  start: number;
  end: number;
}

export interface TimelinePoint {
  x: number;
  y: number;
  year: number;
  milestone?: Milestone;
}

export interface PathPoint {
  x: number;
  y: number;
  controlX1?: number;
  controlY1?: number;
  controlX2?: number;
  controlY2?: number;
}

export interface TimelineSegment {
  start: TimelinePoint;
  end: TimelinePoint;
  path: PathPoint[];
  milestones: Milestone[];
}
