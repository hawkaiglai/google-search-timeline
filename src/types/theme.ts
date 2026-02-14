export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    inverse: string;
  };
  border: string;
  divider: string;
  error: string;
  warning: string;
  success: string;
  info: string;
  milestone: {
    algorithm: string;
    feature: string;
    design: string;
    infrastructure: string;
    aiMl: string;
    mobile: string;
    partnership: string;
    acquisition: string;
    legal: string;
    productLaunch: string;
  };
  spiral: {
    primary: string;
    secondary: string;
    accent: string;
    glow: string;
  };
}

export interface FontSizes {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
}

export interface FontWeights {
  light: number;
  normal: number;
  medium: number;
  semibold: number;
  bold: number;
  extrabold: number;
}

export interface ThemeFonts {
  heading: string;
  body: string;
  mono: string;
  sizes: FontSizes;
  weights: FontWeights;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
}

export interface ThemeShadows {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  inner: string;
  none: string;
}

export interface ThemeTransitions {
  fast: string;
  normal: string;
  slow: string;
  easeIn: string;
  easeOut: string;
  easeInOut: string;
}

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
  fonts: ThemeFonts;
  spacing: ThemeSpacing;
  shadows: ThemeShadows;
  transitions: ThemeTransitions;
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
}

export interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}
