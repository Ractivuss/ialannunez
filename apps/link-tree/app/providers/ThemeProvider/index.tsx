import {
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useMemo,
  useEffect,
  useState,
} from 'react';
import { type ThemeSettings } from '@/types/theme.types';
import {
  setCardOpacity,
  setAnimationSpeed,
  setPattern,
  setFont,
  setMode,
  useGetTheme,
  useUpdateTheme,
  setCardBorderRadius,
  defaultTheme,
  setColorTheme,
  setPageBackground,
} from '@/services/theme';
import { getThemeColors } from '@/utils/theme.utils';

// Theme Context Interface
interface ThemeContextType {
  themeSettings: ThemeSettings;
  updateTheme: (newSettings: Partial<ThemeSettings>) => void;
  resetTheme: () => void;
  saveTheme: (newSettings: Partial<ThemeSettings>) => void;
  isHydrated: boolean;
}

// Create the Theme Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme Provider Props
interface ThemeProviderProps {
  children: ReactNode;
}

// Theme Provider Component
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const {
    data: themeSettingsFromStorage,
    isLoading,
    isFetching,
  } = useGetTheme();
  const [themeSettings, setThemeSettings] =
    useState<ThemeSettings>(defaultTheme);
  const { mutate: updateThemeStorage } = useUpdateTheme();
  const [isHydrated, setIsHydrated] = useState(false);
  const [themeSetup, setThemeSetup] = useState(false);

  // Update the applyThemeSettings function to correctly set HSL values
  const applyThemeSettings = useCallback(
    (settings: ThemeSettings) => {
      // Apply default theme colors
      setColorTheme(settings.colorTheme);
      // Always apply page background (including default)
      setPageBackground(settings.pageBackground);
      // Apply mode
      setMode(settings.mode);
      // Apply font
      setFont(settings.font);
      // Apply pattern
      setPattern(settings.pattern);
      // Apply animation speed
      setAnimationSpeed(settings.effects.animationSpeed);
      // Apply card opacity
      setCardOpacity(settings.effects.cardOpacity);
      // Apply border radius
      setCardBorderRadius(settings.borderRadius);
    },
    [getThemeColors]
  );

  useEffect(() => {
    setIsHydrated(true);

    // Don't apply theme until we've either loaded from storage or confirmed no storage data exists
    if (themeSetup || isLoading || !themeSettingsFromStorage) return;

    setThemeSetup(true);

    // Apply initial theme settings including background color
    applyThemeSettings(themeSettingsFromStorage);
    setThemeSettings(themeSettingsFromStorage);
  }, [
    themeSettingsFromStorage,
    applyThemeSettings,
    isLoading,
    isFetching,
    themeSetup,
  ]);

  /** Updates the theme settings in the provider */
  const updateTheme = useCallback(
    (newSettings: Partial<ThemeSettings>) =>
      setThemeSettings({ ...themeSettings, ...newSettings }),
    [themeSettings]
  );

  /** Saves the theme settings to the storage */
  const saveTheme = useCallback(
    (newSettings: Partial<ThemeSettings>) => {
      updateTheme(newSettings);
      updateThemeStorage(newSettings);
    },
    [updateTheme, updateThemeStorage]
  );

  const resetTheme = useCallback(() => {
    applyThemeSettings(defaultTheme);
  }, [applyThemeSettings]);

  const contextValue = useMemo(
    () => ({
      themeSettings,
      updateTheme,
      resetTheme,
      saveTheme,
      isHydrated,
    }),
    [themeSettings, updateTheme, resetTheme, saveTheme, isHydrated]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use Theme Context with validation
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error(
      'useTheme must be used within a ThemeProvider. Make sure to wrap your component with ThemeProvider.'
    );
  }

  return context;
};
