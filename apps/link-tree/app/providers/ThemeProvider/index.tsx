import {
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';
import { type ThemeSettings } from '@/types/theme.types';
import { useGetTheme, useUpdateTheme } from '@/services/theme';
import { useSetupTheme } from './useSetupTheme';

// Theme Context Interface
interface ThemeContextType {
  themeSettings: ThemeSettings;
  updateTheme: (newSettings: Partial<ThemeSettings>) => void;
  resetTheme: () => void;
  isHydrated: boolean;
}

// Create the Theme Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme Provider Props
interface ThemeProviderProps {
  children: ReactNode;
}

// Theme Provider Component
export function ThemeProvider({ children }: ThemeProviderProps) {
  const { data: themeSettings } = useGetTheme();
  const { applyThemeSettings, isHydrated } = useSetupTheme();
  const { mutate: updateThemeStorage } = useUpdateTheme();

    const updateTheme = useCallback(
    (newSettings: Partial<ThemeSettings>) => {
      // 1. Get current theme and merge with new settings
      const currentTheme = themeSettings; // Get current theme from React Query
      const updatedTheme = { ...currentTheme, ...newSettings };
      
      // 2. Apply theme changes visually (DOM manipulation)
      applyThemeSettings(updatedTheme, updatedTheme.mode === 'dark');
      
      // 3. Store changes to localStorage and update cache
      updateThemeStorage(newSettings);
    },
    [applyThemeSettings, updateThemeStorage]
  );

  const resetTheme = useCallback(() => {
    applyThemeSettings(themeSettings, themeSettings.mode === 'dark');
  }, [themeSettings, applyThemeSettings]);

  const contextValue = useMemo(
    () => ({
      themeSettings,
      updateTheme,
      resetTheme,
      isHydrated,
    }),
    [themeSettings, updateTheme, resetTheme, isHydrated]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use Theme Context with validation
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error(
      'useTheme must be used within a ThemeProvider. Make sure to wrap your component with ThemeProvider.'
    );
  }

  return context;
}
