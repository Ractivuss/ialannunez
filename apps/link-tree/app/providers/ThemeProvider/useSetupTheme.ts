import { useState, useEffect, useCallback } from 'react';
import { type ThemeSettings, type BorderRadiusType } from '@/types/theme.types';
import { useGetTheme } from '@/services/theme';
import { getThemeColors, getBorderRadiusValue } from '@/utils/theme';

export function useSetupTheme() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [themeSetup, setThemeSetup] = useState(false);
  const { data: themeSettings } = useGetTheme();

  // Update the applyThemeSettings function to correctly set HSL values
  const applyThemeSettings = useCallback(
    (settings: ThemeSettings, isDark: boolean) => {
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
        if (settings.pattern !== 'pattern-none') {
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
    },
    [getThemeColors]
  );

  useEffect(() => {
    setIsHydrated(true);

    if (!themeSettings || themeSetup) return;

    setThemeSetup(true);

    // Apply theme class to document
    if (themeSettings.mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply initial theme settings including background color
    applyThemeSettings(themeSettings, themeSettings.mode === 'dark');
  }, [themeSettings, applyThemeSettings]);

  return {
    isHydrated, // Use this to prevent hydration mismatches
    applyThemeSettings,
  };
}
