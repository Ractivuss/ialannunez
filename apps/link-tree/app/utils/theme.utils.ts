import { PageBackgroundType, type BorderRadiusType } from '@/types/theme.types';

// Theme color mappings - this helps ensure consistent color application
const themeColorMappings = {
  default: {
    name: 'Default',
    primary: '0 0% 9%',
    secondary: '0 0% 96.1%',
    accent: '0 0% 96.1%',
    primaryHex: '#000000',
    secondaryHex: '#f1f5f9',
    accentHex: '#f1f5f9',
  },
  rose: {
    name: 'Rose',
    primary: '347 77% 50%',
    secondary: '355 100% 97%',
    accent: '347 77% 92%',
    primaryHex: '#e11d48',
    secondaryHex: '#fff1f2',
    accentHex: '#fecdd3',
  },
  green: {
    name: 'Green',
    primary: '160 84% 39%',
    secondary: '150 100% 96%',
    accent: '160 84% 92%',
    primaryHex: '#10b981',
    secondaryHex: '#ecfdf5',
    accentHex: '#a7f3d0',
  },
  purple: {
    name: 'Purple',
    primary: '259 94% 51%',
    secondary: '270 100% 98%',
    accent: '259 94% 93%',
    primaryHex: '#8b5cf6',
    secondaryHex: '#f5f3ff',
    accentHex: '#c4b5fd',
  },
  orange: {
    name: 'Orange',
    primary: '24 94% 53%',
    secondary: '30 100% 97%',
    accent: '24 94% 93%',
    primaryHex: '#f97316',
    secondaryHex: '#fff7ed',
    accentHex: '#fed7aa',
  },
  blue: {
    name: 'Blue',
    primary: '217 91% 60%',
    secondary: '213 100% 97%',
    accent: '217 91% 93%',
    primaryHex: '#3b82f6',
    secondaryHex: '#eff6ff',
    accentHex: '#93c5fd',
  },
  teal: {
    name: 'Teal',
    primary: '173 80% 40%',
    secondary: '180 100% 97%',
    accent: '173 80% 93%',
    primaryHex: '#14b8a6',
    secondaryHex: '#f0fdfa',
    accentHex: '#7dd3fc',
  },
  pink: {
    name: 'Pink',
    primary: '330 81% 60%',
    secondary: '327 100% 97%',
    accent: '330 81% 93%',
    primaryHex: '#ec4899',
    secondaryHex: '#fdf2f8',
    accentHex: '#f9a8d4',
  },
};

// Generate color themes array from themeColorMappings for backward compatibility
export const colorThemes = Object.entries(themeColorMappings).map(
  ([value, theme]) => ({
    name: theme.name,
    value,
    primaryColor: theme.primaryHex,
    secondaryColor: theme.secondaryHex,
  })
);

// Background color mappings - this helps ensure consistent background color application
const backgroundColorsMappings = {
  default: {
    label: 'Default',
    value: 'bg-secondary',
  },
  slate: {
    label: 'Slate',
    value: 'bg-slate-100',
  },
  pink: {
    label: 'Pink',
    value: 'bg-pink-50',
  },
  green: {
    label: 'Green',
    value: 'bg-green-50',
  },
  purple: {
    label: 'Purple',
    value: 'bg-purple-50',
  },
  orange: {
    label: 'Orange',
    value: 'bg-orange-50',
  },
  blue: {
    label: 'Blue',
    value: 'bg-blue-50',
  },
  yellow: {
    label: 'Yellow',
    value: 'bg-yellow-50',
  },
};

// Generate background colors array from backgroundColorsMappings for backward compatibility
export const backgroundColors = Object.entries(backgroundColorsMappings).map(
  ([key, background]) => ({
    name: key,
    label: background.label,
    value: background.value,
  })
);

export const getBackgroundColors = (name: PageBackgroundType) => {
  return backgroundColorsMappings[
    name as keyof typeof backgroundColorsMappings
  ];
};

// Background pattern options
export const backgroundPatterns = [
  { name: 'None', value: 'pattern-none', description: 'No background pattern' },
  { name: 'Dots', value: 'pattern-dots', description: 'Subtle dotted pattern' },
  { name: 'Grid', value: 'pattern-grid', description: 'Clean grid lines' },
  {
    name: 'Stripes',
    value: 'pattern-stripes',
    description: 'Diagonal striped pattern',
  },
];

// Font options with display names and descriptions
export const fontOptions = [
  {
    name: 'Sans',
    value: 'font-sans',
    description: 'Clean, modern sans-serif font (Inter)',
    sample: 'The quick brown fox jumps over the lazy dog.',
  },
  {
    name: 'Serif',
    value: 'font-serif',
    description: 'Elegant serif font with classic appeal (Merriweather)',
    sample: 'The quick brown fox jumps over the lazy dog.',
  },
  {
    name: 'Mono',
    value: 'font-mono',
    description:
      'Monospaced font for code and technical content (JetBrains Mono)',
    sample: 'The quick brown fox jumps over the lazy dog.',
  },
];

// Border radius value mapping
const borderRadiusMap = {
  'rounded-none': '0px',
  'rounded-sm': '0.125rem',
  rounded: '0.25rem',
  'rounded-lg': '0.5rem',
} as const;

// Helper function to get the actual pixel value for border radius
export const getBorderRadiusValue = (
  borderRadiusClass: BorderRadiusType
): string => {
  return borderRadiusMap[borderRadiusClass] || '0.5rem';
};

// Memoized function to get theme colors - improves performance by avoiding recalculations
export const getThemeColors = (themeName: string) => {
  return (
    themeColorMappings[themeName as keyof typeof themeColorMappings] ||
    themeColorMappings.default
  );
};

// Helper function to get theme color in HSL format
export const getThemeColorHsl = (
  themeName: string,
  colorType: 'primary' | 'secondary' | 'accent' = 'primary'
): string => {
  const themeColors = getThemeColors(themeName);
  return `hsl(${themeColors[colorType]})`;
};
