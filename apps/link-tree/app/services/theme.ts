import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  BorderRadiusType,
  ColorThemeType,
  FontType,
  ModeType,
  PageBackgroundType,
  PatternType,
  type ThemeSettings,
  ThemeSettingsSchema,
} from '@/types/theme.types';
import {
  getBackgroundColors,
  getBorderRadiusValue,
  getThemeColors,
} from '@/utils/theme.utils';

export const defaultTheme: ThemeSettings = {
  font: 'font-mono',
  mode: 'light',
  colorTheme: 'blue',
  pattern: 'pattern-none',
  borderRadius: 'rounded-sm',
  gradient: 'none',
  pageBackground: 'default',
  effects: {
    shadow: true,
    glassmorphism: false,
    cardOpacity: 1,
    animationSpeed: 100,
  },
};

const getThemeFromStorage = (): ThemeSettings => {
  try {
    const storedTheme = localStorage.getItem('theme');
    const parsedTheme = storedTheme ? JSON.parse(storedTheme) : defaultTheme;
    return ThemeSettingsSchema.parse(parsedTheme);
  } catch (error) {
    console.warn('Failed to parse stored theme, using default:', error);
    return defaultTheme;
  }
};

export const useGetTheme = () => {
  return useQuery({
    queryKey: ['theme'],
    queryFn: getThemeFromStorage,
    // placeholderData: defaultTheme, // Use placeholderData instead of initialData
    staleTime: 1000 * 60 * 60, // 1 hour - allow periodic refresh
    gcTime: Infinity, // Keep in cache indefinitely
    enabled: typeof window !== 'undefined', // Only run in browser
  });
};

const updateThemeInStorage = async (
  newSettings: Partial<ThemeSettings>
): Promise<ThemeSettings> => {
  try {
    // Get current theme from storage
    const storedTheme = localStorage.getItem('theme');
    const currentTheme = storedTheme ? JSON.parse(storedTheme) : defaultTheme;

    // Merge with new settings
    const updatedTheme = { ...currentTheme, ...newSettings };

    // Validate the updated theme
    const validatedTheme = ThemeSettingsSchema.parse(updatedTheme);

    // Save to localStorage
    localStorage.setItem('theme', JSON.stringify(validatedTheme));

    return validatedTheme;
  } catch (error) {
    console.warn('Failed to update theme in storage:', error);
    throw error;
  }
};

export const useUpdateTheme = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateThemeInStorage,
    onSuccess: (updatedTheme: ThemeSettings) => {
      // Update the cache with the new theme
      queryClient.setQueryData(['theme'], updatedTheme);
    },
  });
};

export const setAnimationSpeed = (value: number) => {
  document.documentElement.style.setProperty('--animation-speed', `${value}ms`);
};

export const setCardBorderRadius = (value: BorderRadiusType) => {
  document.documentElement.style.setProperty(
    '--card-border-radius',
    getBorderRadiusValue(value)
  );
};

export const setCardOpacity = (value: number) => {
  document.documentElement.style.setProperty(
    '--card-opacity',
    value.toString()
  );
};

export const setFont = (value: FontType) => {
  // Apply font immediately for responsive feedback
  document.documentElement.classList.remove(
    'font-sans',
    'font-serif',
    'font-mono'
  );
  document.documentElement.classList.add(value);
};

export const setColorTheme = (colorTheme: ColorThemeType) => {
  // Apply theme colors immediately for responsive feedback
  const colors = getThemeColors(colorTheme);
  const root = document.documentElement;

  // Apply colors directly without adjustment
  root.style.setProperty('--page-background', colors.secondary);
  root.style.setProperty('--primary', colors.primary);
  root.style.setProperty('--secondary', colors.secondary);
  root.style.setProperty('--accent', colors.accent);
};

export const setMode = (mode: ModeType) => {
  const isDark = mode === 'dark';
  const root = document.documentElement;

  // Apply colors to CSS variables for consistent use across components
  if (isDark) {
    document.documentElement.classList.add('dark');
    root.style.setProperty('--icon-text-color', '255, 255, 255'); // White text for icons
    root.style.setProperty('--secondary-foreground', '0 0% 98%');
    root.style.setProperty('--accent-foreground', '0 0% 98%');
  } else {
    // Light mode colors
    document.documentElement.classList.remove('dark');
    root.style.setProperty('--icon-text-color', '255, 255, 255'); // White text for icons
    root.style.setProperty('--secondary-foreground', '0 0% 9%');
    root.style.setProperty('--accent-foreground', '0 0% 9%');
  }
};

export const setPattern = (pattern: PatternType) => {
  // Apply pattern immediately for responsive feedback
  const mainElement = document.querySelector('main');
  if (mainElement && pattern !== 'pattern-none') {
    // Remove all pattern classes
    mainElement.classList.remove(
      'pattern-none',
      'pattern-dots',
      'pattern-grid',
      'pattern-stripes',
      'pattern-waves',
      'pattern-hexagons'
    );
    mainElement.classList.add(pattern);
  }
};

export const setPageBackground = (value: PageBackgroundType) => {
  if (value === 'default') return;

  // Update the CSS custom property that the inline style uses
  const backgroundColors = getBackgroundColors(value);
  const root = document.documentElement;

  // Convert Tailwind class to HSL value - this is a simplified approach
  const colorMap: Record<string, string> = {
    'bg-slate-100': '210 40% 98%',
    'bg-pink-50': '327 73% 97%',
    'bg-green-50': '138 76% 97%',
    'bg-purple-50': '270 100% 98%',
    'bg-orange-50': '33 100% 96%',
    'bg-blue-50': '214 100% 97%',
    'bg-yellow-50': '55 92% 95%',
  };

  const hslValue = colorMap[backgroundColors.value];
  root.style.setProperty('--page-background', hslValue);
};
