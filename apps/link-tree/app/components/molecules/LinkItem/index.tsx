import { cn } from '@lib/utils';
import type React from 'react';
import { useMemo } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { hslToRgb, hexToRgb } from './utils';
import {
  LinkIcon,
  GlobeIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from '@atoms/icons';
import { IconType } from '@/types/profile.types';
import { getThemeColors } from '@/utils/theme';

interface LinkItemProps {
  label: string;
  icon: IconType;
  url: string;
}

// Function to determine the appropriate icon based on the URL
const iconMap = {
  github: <GithubIcon size={16} />,
  linkedin: <LinkedinIcon size={16} />,
  twitter: <TwitterIcon size={16} />,
  globe: <GlobeIcon size={16} />,
} as const;

const getLinkIcon = (iconType: IconType) => {
  return iconMap[iconType] || <LinkIcon size={16} />;
};

export const LinkItem = ({ label, url, icon }: LinkItemProps) => {
  const { themeSettings } = useTheme();
  const isDarkTheme = themeSettings.mode === 'dark';

  // Memoize theme colors to prevent unnecessary recalculations
  const themeColors = useMemo(() => {
    return getThemeColors(themeSettings.colorTheme);
  }, [themeSettings.colorTheme, getThemeColors]);

  // Update the dynamicStyles useMemo to handle the new HSL format
  const dynamicStyles = useMemo(() => {
    const primaryColor = themeColors.primary;
    let primaryColorRgb;

    // Check if the color is in HSL format (space-separated values)
    if (primaryColor.includes(' ')) {
      const [h, s, l] = primaryColor.split(' ').map(Number);
      primaryColorRgb = hslToRgb(h, s, l);
    } else if (primaryColor.startsWith('#')) {
      primaryColorRgb = hexToRgb(primaryColor);
    } else {
      // Default fallback
      primaryColorRgb = { r: 0, g: 0, b: 0 };
    }

    return {
      hoverBg: isDarkTheme
        ? `rgba(${primaryColorRgb?.r || 0}, ${primaryColorRgb?.g || 0}, ${
            primaryColorRgb?.b || 0
          }, 0.1)`
        : `rgba(${primaryColorRgb?.r || 0}, ${primaryColorRgb?.g || 0}, ${
            primaryColorRgb?.b || 0
          }, 0.05)`,
      iconBg: `hsl(${primaryColor})`,
      gradientFrom: `rgba(${primaryColorRgb?.r || 0}, ${
        primaryColorRgb?.g || 0
      }, ${primaryColorRgb?.b || 0}, 0.05)`,
      transitionDuration: `${themeSettings.effects.animationSpeed}ms`,
      opacity: themeSettings.effects.cardOpacity,
    };
  }, [themeColors, isDarkTheme, themeSettings.effects]);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'link-item-container relative overflow-hidden group',
        'flex items-center gap-3 p-3 w-full',
        'transition-all ease-in-out',
        'border shadow-sm',
        'hover:shadow-md hover:border-primary/30',
        'active:scale-[0.98] active:shadow-inner',
        'cursor-pointer',
        'text-foreground hover:text-primary transition-colors',
        'font-medium',
        'no-underline', // Remove default anchor underline
        themeSettings.borderRadius,
        themeSettings.effects.glassmorphism && 'glassmorphism',
        themeSettings.font
      )}
      style={
        {
          transitionDuration: dynamicStyles.transitionDuration,
          opacity: dynamicStyles.opacity,
          '--hover-bg': dynamicStyles.hoverBg,
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: `linear-gradient(to right, ${dynamicStyles.gradientFrom}, transparent)`,
          transitionDuration: dynamicStyles.transitionDuration,
        }}
      ></div>

      <div
        className={cn(
          'flex items-center justify-center',
          'w-8 h-8 rounded-full',
          'text-white', // Always use white text for better contrast
          'transition-all',
          'group-hover:scale-110 group-hover:shadow-sm',
          'relative z-10' // Ensure it's above the background gradient
        )}
        style={{
          backgroundColor: dynamicStyles.iconBg,
          transitionDuration: dynamicStyles.transitionDuration,
        }}
      >
        {getLinkIcon(icon)}
      </div>
      <span className="flex-1 relative z-10">{label}</span>
    </a>
  );
};
