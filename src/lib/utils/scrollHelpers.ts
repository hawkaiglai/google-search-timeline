import { SCROLL_CONFIG } from '../constants';

export function getScrollProgress(
  scrollY: number,
  maxScroll: number
): number {
  return Math.max(0, Math.min(1, scrollY / maxScroll));
}

export function getMaxScroll(): number {
  if (typeof window === 'undefined') return 0;
  return Math.max(
    document.body.scrollHeight - window.innerHeight,
    document.documentElement.scrollHeight - window.innerHeight,
    0
  );
}

export function scrollToY(y: number, smooth = true): void {
  if (typeof window === 'undefined') return;
  
  window.scrollTo({
    top: y,
    behavior: smooth ? 'smooth' : 'auto',
  });
}

export function scrollToElement(
  element: HTMLElement | string,
  offset = 0,
  smooth = true
): void {
  if (typeof window === 'undefined') return;
  
  const el = typeof element === 'string' 
    ? document.querySelector(element) as HTMLElement
    : element;
  
  if (!el) return;
  
  const y = el.getBoundingClientRect().top + window.scrollY + offset;
  scrollToY(y, smooth);
}

export function getScrollDirection(
  currentY: number,
  previousY: number
): 'up' | 'down' | 'none' {
  const diff = currentY - previousY;
  if (Math.abs(diff) < SCROLL_CONFIG.threshold) return 'none';
  return diff > 0 ? 'down' : 'up';
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

export function smoothScroll(
  current: number,
  target: number,
  smoothness = SCROLL_CONFIG.smoothness
): number {
  return lerp(current, target, smoothness);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function map(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

export function isElementInViewport(
  element: HTMLElement,
  threshold = 0
): boolean {
  if (typeof window === 'undefined') return false;
  
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  return (
    rect.top >= -threshold &&
    rect.left >= -threshold &&
    rect.bottom <= windowHeight + threshold &&
    rect.right <= windowWidth + threshold
  );
}

export function getElementOffset(element: HTMLElement): { top: number; left: number } {
  if (typeof window === 'undefined') return { top: 0, left: 0 };
  
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
  };
}

export function disableScroll(): void {
  if (typeof document === 'undefined') return;
  document.body.style.overflow = 'hidden';
}

export function enableScroll(): void {
  if (typeof document === 'undefined') return;
  document.body.style.overflow = '';
}
