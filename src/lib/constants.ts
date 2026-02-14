import type { SpiralConfig, TimelineConfig } from '@/types';

export const APP_CONFIG = {
  name: 'Google Search Timeline',
  description: 'An interactive journey through the evolution of Google Search',
  domain: 'rxtimeline.kparakposignal.space',
  url: 'https://rxtimeline.kparakposignal.space',
  version: '1.0.0',
} as const;

export const TIMELINE_CONFIG: TimelineConfig = {
  startYear: 1996,
  endYear: 2025,
  scrollSpeed: 1,
  autoScroll: false,
  enableFilters: true,
  enableSearch: true,
  pathType: 'organic',
  cardSpacing: 300,
  cardWidth: 320,
  cardHeight: 400,
} as const;

export const SPIRAL_CONFIG: SpiralConfig = {
  startRadius: 2,
  endRadius: 8,
  height: 20,
  turns: 8,
  segments: 200,
  tubeRadius: 0.15,
  startYear: 1996,
  endYear: 2025,
  rotationSpeed: 0.001,
  cameraAutoRotate: true,
} as const;

export const MILESTONE_CATEGORIES = {
  algorithm: {
    name: 'Algorithm Update',
    color: '#4285F4',
    icon: 'algorithm',
  },
  feature: {
    name: 'Feature Launch',
    color: '#34A853',
    icon: 'feature',
  },
  design: {
    name: 'Design Change',
    color: '#FBBC04',
    icon: 'design',
  },
  infrastructure: {
    name: 'Infrastructure',
    color: '#EA4335',
    icon: 'infrastructure',
  },
  aiMl: {
    name: 'AI & Machine Learning',
    color: '#9334E6',
    icon: 'ai',
  },
  mobile: {
    name: 'Mobile',
    color: '#F97316',
    icon: 'mobile',
  },
  partnership: {
    name: 'Partnership',
    color: '#06B6D4',
    icon: 'partnership',
  },
  acquisition: {
    name: 'Acquisition',
    color: '#EC4899',
    icon: 'acquisition',
  },
  legal: {
    name: 'Legal/Regulatory',
    color: '#8B5CF6',
    icon: 'legal',
  },
  productLaunch: {
    name: 'Product Launch',
    color: '#10B981',
    icon: 'product',
  },
} as const;

export const IMPACT_LEVELS = {
  low: {
    label: 'Low Impact',
    color: '#94A3B8',
    weight: 1,
  },
  medium: {
    label: 'Medium Impact',
    color: '#3B82F6',
    weight: 2,
  },
  high: {
    label: 'High Impact',
    color: '#F59E0B',
    weight: 3,
  },
  critical: {
    label: 'Critical Impact',
    color: '#EF4444',
    weight: 4,
  },
} as const;

export const ANIMATION_DURATIONS = {
  fast: 200,
  normal: 300,
  slow: 500,
  verySlow: 800,
} as const;

export const EASING_FUNCTIONS = {
  linear: 'linear',
  easeIn: 'power1.in',
  easeOut: 'power1.out',
  easeInOut: 'power1.inOut',
  easeInQuad: 'power2.in',
  easeOutQuad: 'power2.out',
  easeInOutQuad: 'power2.inOut',
  easeInCubic: 'power3.in',
  easeOutCubic: 'power3.out',
  easeInOutCubic: 'power3.inOut',
  easeInQuart: 'power4.in',
  easeOutQuart: 'power4.out',
  easeInOutQuart: 'power4.inOut',
  easeInExpo: 'expo.in',
  easeOutExpo: 'expo.out',
  easeInOutExpo: 'expo.inOut',
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const Z_INDEX = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
} as const;

export const SCROLL_CONFIG = {
  smoothness: 0.1,
  threshold: 50,
  debounceDelay: 100,
  wheelMultiplier: 1,
} as const;

export const THEME_STORAGE_KEY = 'timeline-theme-mode';

export const API_ENDPOINTS = {
  milestones: '/api/milestones',
  images: '/api/images',
} as const;

export const IMAGE_CONFIG = {
  formats: ['webp', 'jpg', 'png'],
  sizes: {
    thumbnail: 200,
    small: 400,
    medium: 800,
    large: 1200,
  },
  quality: {
    low: 60,
    medium: 75,
    high: 90,
  },
} as const;

export const PRELOAD_CONFIG = {
  imagePriority: 5,
  preloadDelay: 100,
  maxConcurrent: 4,
} as const;
