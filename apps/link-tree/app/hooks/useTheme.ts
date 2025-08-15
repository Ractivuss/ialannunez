import { useState, useEffect, useCallback } from 'react';
import { type ThemeSettings } from '../types/themeSettings';
import { getProfileData } from '@utils/profile';
import { BorderRadiusType } from '@/types/profile';

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
const getBorderRadiusValue = (borderRadiusClass: BorderRadiusType): string => {
  return borderRadiusMap[borderRadiusClass] || '0.5rem';
};

export function useTheme() {
  const [isHydrated, setIsHydrated] = useState(false);
  const themeSettings = getProfileData().themeSettings;

  // Memoized function to get theme colors - improves performance by avoiding recalculations
  const getThemeColors = useCallback((themeName: string) => {
    return (
      themeColorMappings[themeName as keyof typeof themeColorMappings] ||
      themeColorMappings.default
    );
  }, []);

  // Update the applyThemeSettings function to correctly set HSL values
  const applyThemeSettings = (settings: ThemeSettings, isDark: boolean) => {
    console.log('Applying theme settings:', settings, 'isDark:', isDark);
    const root = document.documentElement;

    // Apply theme colors
    const colors = getThemeColors(settings.colorTheme);

    // Apply colors to CSS variables for consistent use across components
    if (isDark) {
      // Adjust colors for dark mode - properly format HSL values
      root.style.setProperty('--page-background', colors.secondary); // Custom variable for page background
      root.style.setProperty('--primary', colors.primary);
      root.style.setProperty('--primary-foreground', '0 0% 98%');
      root.style.setProperty('--icon-text-color', '255, 255, 255'); // White text for icons
      root.style.setProperty('--secondary', colors.secondary);
      root.style.setProperty('--secondary-foreground', '0 0% 98%');
      root.style.setProperty('--accent', colors.accent);
      root.style.setProperty('--accent-foreground', '0 0% 98%');
    } else {
      // Light mode colors
      root.style.setProperty('--page-background', colors.secondary); // Custom variable for page background
      root.style.setProperty('--primary', colors.primary);
      root.style.setProperty('--primary-foreground', '0 0% 98%');
      root.style.setProperty('--icon-text-color', '255, 255, 255'); // White text for icons
      root.style.setProperty('--secondary', colors.secondary);
      root.style.setProperty('--secondary-foreground', '0 0% 9%');
      root.style.setProperty('--accent', colors.accent);
      root.style.setProperty('--accent-foreground', '0 0% 9%');
    }

    // Apply font family to the root element
    document.documentElement.classList.remove(
      'font-sans',
      'font-serif',
      'font-mono'
    );
    document.documentElement.classList.add(settings.font);
    console.log('Applied font class:', settings.font);

    // Apply background pattern to the main element
    const mainElement = document.querySelector('main');
    if (mainElement) {
      // Remove all pattern classes
      mainElement.classList.remove(
        'pattern-none',
        'pattern-dots',
        'pattern-grid',
        'pattern-stripes',
        'pattern-waves',
        'pattern-hexagons'
      );

      // Add the selected pattern class
      if (settings.pattern !== 'none') {
        mainElement.classList.add(settings.pattern);
      }
    }

    // Apply animation speed
    root.style.setProperty(
      '--animation-speed',
      `${settings.effects.animationSpeed}ms`
    );

    // Apply card opacity
    root.style.setProperty(
      '--card-opacity',
      settings.effects.cardOpacity.toString()
    );

    // Apply border radius to CSS variable for consistent use
    root.style.setProperty(
      '--card-border-radius',
      getBorderRadiusValue(settings.borderRadius as BorderRadiusType)
    );
  };

  useEffect(() => {
    setIsHydrated(true);

    // Apply theme class to document
    if (themeSettings.mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply initial theme settings including background color
    applyThemeSettings(themeSettings, themeSettings.mode === 'dark');
  }, []);

  return {
    themeSettings,
    isHydrated, // Use this to prevent hydration mismatches
    getThemeColors,
  };
}
