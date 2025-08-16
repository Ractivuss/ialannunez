import { type BorderRadiusType } from '@/types/theme.types';

// Theme color mappings - this helps ensure consistent color application
export const themeColorMappings = {
  default: {
    primary: '0 0% 9%',
    secondary: '0 0% 96.1%',
    accent: '0 0% 96.1%',
  },
  rose: {
    primary: '347 77% 50%',
    secondary: '355 100% 97%',
    accent: '347 77% 92%',
  },
  green: {
    primary: '160 84% 39%',
    secondary: '150 100% 96%',
    accent: '160 84% 92%',
  },
  purple: {
    primary: '259 94% 51%',
    secondary: '270 100% 98%',
    accent: '259 94% 93%',
  },
  orange: {
    primary: '24 94% 53%',
    secondary: '30 100% 97%',
    accent: '24 94% 93%',
  },
  blue: {
    primary: '217 91% 60%',
    secondary: '213 100% 97%',
    accent: '217 91% 93%',
  },
  teal: {
    primary: '173 80% 40%',
    secondary: '180 100% 97%',
    accent: '173 80% 93%',
  },
  pink: {
    primary: '330 81% 60%',
    secondary: '327 100% 97%',
    accent: '330 81% 93%',
  },
};

// Border radius value mapping
const borderRadiusMap = {
  'rounded-none': '0px',
  'rounded-sm': '0.125rem',
  rounded: '0.25rem',
  'rounded-lg': '0.5rem',
} as const;

// Helper function to get the actual pixel value for border radius
export const getBorderRadiusValue = (borderRadiusClass: BorderRadiusType): string => {
  return borderRadiusMap[borderRadiusClass] || '0.5rem';
};

// Memoized function to get theme colors - improves performance by avoiding recalculations
export const getThemeColors = (themeName: string) => {
  return (
    themeColorMappings[themeName as keyof typeof themeColorMappings] ||
    themeColorMappings.default
  );
};
