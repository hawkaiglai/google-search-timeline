export type MilestoneCategory =
  | 'algorithm'
  | 'feature'
  | 'design'
  | 'infrastructure'
  | 'ai-ml'
  | 'mobile'
  | 'partnership'
  | 'acquisition'
  | 'legal'
  | 'product-launch';

export type ImpactLevel = 'low' | 'medium' | 'high' | 'critical';

export type VisibilityStatus = 'visible' | 'hidden' | 'highlighted' | 'dimmed';

export interface MilestoneImage {
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  thumbnail?: string;
}

export interface MilestoneSource {
  title: string;
  url: string;
  type: 'article' | 'blog' | 'press-release' | 'documentation' | 'video';
  date?: string;
}

export interface Milestone {
  id: string;
  year: number;
  month?: number;
  day?: number;
  title: string;
  description: string;
  longDescription?: string;
  category: MilestoneCategory;
  impact: ImpactLevel;
  images?: MilestoneImage[];
  sources?: MilestoneSource[];
  tags?: string[];
  relatedMilestones?: string[];
  color?: string;
  position?: {
    x: number;
    y: number;
    z?: number;
  };
  visibility?: VisibilityStatus;
  metadata?: {
    teamSize?: number;
    usersAffected?: number;
    technicalDetails?: string;
    [key: string]: unknown;
  };
}

export interface MilestoneFilter {
  categories?: MilestoneCategory[];
  impactLevels?: ImpactLevel[];
  yearRange?: {
    start: number;
    end: number;
  };
  searchQuery?: string;
  tags?: string[];
}

export interface MilestoneGroup {
  year: number;
  milestones: Milestone[];
  count: number;
}
