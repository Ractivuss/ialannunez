import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type ThemeSettings, ThemeSettingsSchema } from '@/types/theme.types';

const defaultTheme: ThemeSettings = {
  font: 'font-mono',
  mode: 'dark',
  colorTheme: 'blue',
  pattern: 'pattern-none',
  borderRadius: 'rounded-none',
  gradient: 'none',
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

export function useGetTheme() {
  return useQuery({
    queryKey: ['theme'],
    queryFn: getThemeFromStorage,
    initialData: defaultTheme, // Always provide default theme as initial data
    staleTime: Infinity, // Theme doesn't change unless user updates it
    gcTime: Infinity, // Keep in cache indefinitely
  });
}

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

export function useUpdateTheme() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateThemeInStorage,
    onSuccess: (updatedTheme: ThemeSettings) => {
      // Update the cache with the new theme
      queryClient.setQueryData(['theme'], updatedTheme);
    },
  });
}
