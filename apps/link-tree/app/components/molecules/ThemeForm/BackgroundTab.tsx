import { Label } from '@atoms/label';
import { Switch } from '@atoms/switch';
import { RadioGroup, RadioGroupItem } from '@atoms/radio-group';
import { cn } from '@/utils/tailwind.utils';
import { backgroundColors, backgroundPatterns } from '@/utils/theme.utils';
import { useTheme } from '@/providers/ThemeProvider';
import { setPageBackground, setPattern } from '@/services/theme';
import { PageBackgroundType, PatternType } from '@/types/theme.types';

export const BackgroundTab = () => {
  const { themeSettings, updateTheme } = useTheme();

  const handleUpdatePageBackground = (bgColor: PageBackgroundType) => {
    updateTheme({
      pageBackground: bgColor,
    });
    setPageBackground(bgColor);
  };

  const handleUpdatePattern = (pattern: PatternType) => {
    updateTheme({
      pattern: pattern,
    });
    setPattern(pattern);
  };

  const handleToggleGlassmorphism = () => {
    updateTheme({
      effects: {
        ...themeSettings.effects,
        glassmorphism: !themeSettings.effects.glassmorphism,
      },
    });
  };

  const isDarkMode = themeSettings.mode === 'dark';
  const selectedPattern = themeSettings.pattern;
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Page Background Color</Label>
        <div className="grid grid-cols-4 gap-2">
          {backgroundColors.map((bgColor) => (
            <button
              key={bgColor.name}
              type="button"
              className={cn(
                'h-12 rounded-md border-2 border-muted hover:border-accent flex items-center justify-center transition-all duration-150',
                bgColor.value,
                themeSettings.pageBackground === bgColor.value &&
                  'border-primary ring-2 ring-primary/20'
              )}
              onClick={() =>
                handleUpdatePageBackground(bgColor.name as PageBackgroundType)
              }
              aria-label={`Set background to ${bgColor.name}`}
            >
              <span className="text-xs font-medium">{bgColor.name}</span>
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Choose a background color for your page
        </p>
      </div>

      <div className="space-y-2 pt-4 border-t">
        <Label>Background Pattern</Label>
        <RadioGroup
          value={selectedPattern || themeSettings.pattern}
          onValueChange={handleUpdatePattern}
          className="grid grid-cols-2 gap-2"
        >
          {backgroundPatterns.map((pattern) => (
            <div key={pattern.value}>
              <RadioGroupItem
                value={pattern.value}
                id={`pattern-${pattern.value}`}
                className="sr-only"
              />
              <Label
                htmlFor={`pattern-${pattern.value}`}
                className={cn(
                  'flex flex-col rounded-md border-2 border-muted hover:border-accent transition-all duration-150 overflow-hidden',
                  (selectedPattern || themeSettings.pattern) ===
                    pattern.value && 'border-primary ring-2 ring-primary/20'
                )}
              >
                <div
                  className={cn(
                    'h-24 w-full flex items-center justify-center',
                    pattern.value,
                    isDarkMode
                      ? 'bg-gray-800 text-gray-200'
                      : 'bg-gray-100 text-gray-800'
                  )}
                >
                  {pattern.value === 'pattern-none' && (
                    <span className="text-sm text-muted-foreground">
                      No pattern
                    </span>
                  )}
                </div>
                <div className="p-2">
                  <span className="text-xs font-medium">{pattern.name}</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    {pattern.description}
                  </p>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2 pt-4 border-t">
        <div className="flex items-center justify-between">
          <Label htmlFor="glassmorphism">Glassmorphism Effect</Label>
          <Switch
            id="glassmorphism"
            checked={themeSettings.effects.glassmorphism}
            onCheckedChange={handleToggleGlassmorphism}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Add a frosted glass effect to cards
        </p>
      </div>
    </div>
  );
};
