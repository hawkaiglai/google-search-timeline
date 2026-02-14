export function formatYear(year: number): string {
  return year.toString();
}

export function formatDate(year: number, month?: number, day?: number): string {
  if (!month) return formatYear(year);
  
  const date = new Date(year, month - 1, day || 1);
  const options: Intl.DateTimeFormatOptions = day
    ? { year: 'numeric', month: 'long', day: 'numeric' }
    : { year: 'numeric', month: 'long' };
  
  return date.toLocaleDateString('en-US', options);
}

export function getYearFromDate(date: Date): number {
  return date.getFullYear();
}

export function isValidYear(year: number, startYear: number, endYear: number): boolean {
  return year >= startYear && year <= endYear;
}

export function calculateYearProgress(
  currentYear: number,
  startYear: number,
  endYear: number
): number {
  const totalYears = endYear - startYear;
  const yearsPassed = currentYear - startYear;
  return Math.max(0, Math.min(1, yearsPassed / totalYears));
}

export function getYearFromProgress(
  progress: number,
  startYear: number,
  endYear: number
): number {
  const totalYears = endYear - startYear;
  return Math.round(startYear + progress * totalYears);
}

export function calculateTimeBetween(
  year1: number,
  year2: number,
  month1?: number,
  month2?: number
): number {
  const date1 = new Date(year1, (month1 || 1) - 1);
  const date2 = new Date(year2, (month2 || 1) - 1);
  return Math.abs(date2.getTime() - date1.getTime());
}

export function formatTimeAgo(year: number, month?: number): string {
  const now = new Date();
  const then = new Date(year, (month || 1) - 1);
  const diffMs = now.getTime() - then.getTime();
  const diffYears = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25));
  
  if (diffYears === 0) return 'This year';
  if (diffYears === 1) return '1 year ago';
  return `${diffYears} years ago`;
}

export function groupByYear<T extends { year: number }>(items: T[]): Map<number, T[]> {
  const grouped = new Map<number, T[]>();
  
  items.forEach(item => {
    const existing = grouped.get(item.year) || [];
    grouped.set(item.year, [...existing, item]);
  });
  
  return grouped;
}

export function sortByDate<T extends { year: number; month?: number; day?: number }>(
  items: T[],
  ascending = true
): T[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.year, (a.month || 1) - 1, a.day || 1).getTime();
    const dateB = new Date(b.year, (b.month || 1) - 1, b.day || 1).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
}
