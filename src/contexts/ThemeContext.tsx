'use client';

import React, { createContext, useState, useEffect, useMemo } from 'react';
import type { Theme, ThemeMode, ThemeContextValue } from '@/types';
import { THEME_STORAGE_KEY } from '@/lib/constants';

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const lightTheme: Theme = {
  mode: 'light',
  colors: {
    primary: '#4285F4',
    secondary: '#34A853',
    accent: '#FBBC04',
    background: '#FFFFFF',
    surface: '#F8F9FA',
    text: {
      primary: '#202124',
      secondary: '#5F6368',
      disabled: '#9AA0A6',
      inverse: '#FFFFFF',
    },
    border: '#DADCE0',
    divider: '#E8EAED',
    error: '#EA4335',
    warning: '#FBBC04',
    success: '#34A853',
    info: '#4285F4',
    milestone: {
      algorithm: '#4285F4',
      feature: '#34A853',
      design: '#FBBC04',
      infrastructure: '#EA4335',
      aiMl: '#9334E6',
      mobile: '#F97316',
      partnership: '#06B6D4',
      acquisition: '#EC4899',
      legal: '#8B5CF6',
      productLaunch: '#10B981',
    },
    spiral: {
      primary: '#4285F4',
      secondary: '#34A853',
      accent: '#FBBC04',
      glow: '#4285F4',
    },
  },
  fonts: {
    heading: "'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    body: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'Roboto Mono', 'Courier New', monospace",
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none',
  },
  transitions: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    full: '9999px',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

const darkTheme: Theme = {
  ...lightTheme,
  mode: 'dark',
  colors: {
    ...lightTheme.colors,
    background: '#202124',
    surface: '#292A2D',
    text: {
      primary: '#E8EAED',
      secondary: '#9AA0A6',
      disabled: '#5F6368',
      inverse: '#202124',
    },
    border: '#3C4043',
    divider: '#3C4043',
  },
};

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
}

export function ThemeProvider({ children, defaultMode = 'light' }: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(defaultMode);

  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    if (stored && (stored === 'light' || stored === 'dark')) {
      setModeState(stored);
    }
  }, []);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    localStorage.setItem(THEME_STORAGE_KEY, newMode);
    document.documentElement.classList.toggle('dark', newMode === 'dark');
  };

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  const theme = mode === 'light' ? lightTheme : darkTheme;

  const value = useMemo(
    () => ({
      theme,
      mode,
      setMode,
      toggleMode,
    }),
    [theme, mode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
