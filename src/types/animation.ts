export type EasingFunction = 
  | 'linear'
  | 'easeIn'
  | 'easeOut'
  | 'easeInOut'
  | 'easeInQuad'
  | 'easeOutQuad'
  | 'easeInOutQuad'
  | 'easeInCubic'
  | 'easeOutCubic'
  | 'easeInOutCubic'
  | 'easeInQuart'
  | 'easeOutQuart'
  | 'easeInOutQuart'
  | 'easeInExpo'
  | 'easeOutExpo'
  | 'easeInOutExpo';

export interface AnimationConfig {
  duration: number;
  delay?: number;
  ease?: EasingFunction;
  repeat?: number;
  yoyo?: boolean;
  onComplete?: () => void;
  onStart?: () => void;
  onUpdate?: (progress: number) => void;
}

export interface ScrollTriggerConfig {
  trigger: string | HTMLElement;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  once?: boolean;
  toggleActions?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

export type FadeDirection = 'in' | 'out';

export interface FadeInProps {
  direction?: FadeDirection;
  duration?: number;
  delay?: number;
  from?: number;
  to?: number;
  ease?: EasingFunction;
  trigger?: ScrollTriggerConfig;
}

export type SlideDirection = 'up' | 'down' | 'left' | 'right';

export interface SlideInProps {
  direction: SlideDirection;
  duration?: number;
  delay?: number;
  distance?: number;
  ease?: EasingFunction;
  trigger?: ScrollTriggerConfig;
}

export interface TimelineAnimationState {
  isPlaying: boolean;
  progress: number;
  currentTime: number;
  duration: number;
  isPaused: boolean;
}

export interface GSAPTimelineConfig {
  paused?: boolean;
  reversed?: boolean;
  delay?: number;
  repeat?: number;
  repeatDelay?: number;
  yoyo?: boolean;
  onComplete?: () => void;
  onStart?: () => void;
  onUpdate?: () => void;
  onRepeat?: () => void;
  onReverseComplete?: () => void;
}
