import { Label } from '@atoms/label';
import { RadioGroup, RadioGroupItem } from '@atoms/radio-group';
import { cn } from '@/utils/tailwind.utils';
import { colorThemes, getThemeColorHsl } from '@/utils/theme.utils';
import { ColorThemeType } from '@/types/theme.types';
import { useTheme } from '@/providers/ThemeProvider';
import { setColorTheme, setMode } from '@/services/theme';

export const ColorsTab = () => {
  const { themeSettings, updateTheme } = useTheme();

  const handleUpdateColorTheme = (value: ColorThemeType) => {
    setColorTheme(value);
    setMode(themeSettings.mode);
    updateTheme({
      colorTheme: value,
    });
  };

  const selectedTheme = themeSettings.colorTheme;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Color Theme</Label>
        <RadioGroup
          value={selectedTheme || themeSettings.colorTheme}
          onValueChange={handleUpdateColorTheme}
          className="grid grid-cols-4 gap-2"
        >
          {colorThemes.map((colorTheme) => (
            <div key={colorTheme.value}>
              <RadioGroupItem
                value={colorTheme.value}
                id={`theme-${colorTheme.value}`}
                className="sr-only"
              />
              <Label
                htmlFor={`theme-${colorTheme.value}`}
                className={cn(
                  'flex flex-col items-center justify-between rounded-md border-2 border-muted p-2 hover:border-accent transition-all duration-150',
                  (selectedTheme || themeSettings.colorTheme) ===
                    colorTheme.value && 'border-primary ring-2 ring-primary/20'
                )}
              >
                <div className="flex gap-1 mb-2">
                  <div
                    className="w-4 h-8 rounded-l-full"
                    style={{ backgroundColor: colorTheme.primaryColor }}
                  />
                  <div
                    className="w-4 h-8 rounded-r-full"
                    style={{ backgroundColor: colorTheme.secondaryColor }}
                  />
                </div>
                <span className="text-xs font-medium">{colorTheme.name}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>

        {/* Theme Preview */}
        {selectedTheme && (
          <div className="mt-4 p-3 border rounded-md">
            <h4 className="text-sm font-medium mb-2">Theme Preview</h4>
            <div className="flex gap-2 items-center">
              <div
                className="w-6 h-6 rounded-full"
                style={{
                  backgroundColor: getThemeColorHsl(selectedTheme, 'primary'),
                }}
              />
              <span className="text-xs">Primary</span>
            </div>
            <div className="flex gap-2 items-center mt-1">
              <div
                className="w-6 h-6 rounded-full"
                style={{
                  backgroundColor: getThemeColorHsl(selectedTheme, 'secondary'),
                }}
              />
              <span className="text-xs">Secondary</span>
            </div>
            <div className="flex gap-2 items-center mt-1">
              <div
                className="w-6 h-6 rounded-full"
                style={{
                  backgroundColor: getThemeColorHsl(selectedTheme, 'accent'),
                }}
              />
              <span className="text-xs">Accent</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
