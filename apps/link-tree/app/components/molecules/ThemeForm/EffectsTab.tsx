import { Label } from '@atoms/label';
import { Switch } from '@atoms/switch';
import { RadioGroup, RadioGroupItem } from '@atoms/radio-group';
import { cn } from '@/utils/tailwind.utils';
import { fontOptions } from '@/utils/theme.utils';
import { useTheme } from '@/providers/ThemeProvider';
import { BorderRadiusType, FontType } from '@/types/theme.types';

export const EffectsTab = () => {
  const { themeSettings, updateTheme } = useTheme();

  const handleToggleShadow = () => {
    updateTheme({
      effects: {
        ...themeSettings.effects,
        shadow: !themeSettings.effects.shadow,
      },
    });
  };

  const handleUpdateBorderRadius = (value: BorderRadiusType) => {
    updateTheme({
      borderRadius: value,
    });
  };

  const handleUpdateFont = (value: FontType) => {
    updateTheme({
      font: value,
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="card-shadow">Card Shadow</Label>
          <Switch
            id="card-shadow"
            checked={themeSettings.effects.shadow}
            onCheckedChange={handleToggleShadow}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Add shadows to cards for depth
        </p>
      </div>

      <div className="space-y-2 pt-4 border-t">
        <Label htmlFor="border-radius">Border Radius</Label>
        <RadioGroup
          value={themeSettings.borderRadius}
          onValueChange={handleUpdateBorderRadius}
          className="grid grid-cols-2 gap-2"
        >
          {[
            { name: 'None', value: 'rounded-none' },
            { name: 'Small', value: 'rounded-sm' },
            { name: 'Medium', value: 'rounded' },
            { name: 'Large', value: 'rounded-lg' },
          ].map((option) => (
            <div key={option.value}>
              <RadioGroupItem
                value={option.value}
                id={`radius-${option.value}`}
                className="sr-only"
              />
              <Label
                htmlFor={`radius-${option.value}`}
                className={cn(
                  'flex h-12 items-center justify-center rounded-md border-2 border-muted hover:border-accent transition-all duration-150',
                  option.value,
                  themeSettings.borderRadius === option.value &&
                    'border-primary ring-2 ring-primary/20'
                )}
              >
                <span className="text-xs font-medium">{option.name}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2 pt-4 border-t">
        <Label>Font Family</Label>
        <RadioGroup
          value={themeSettings.font}
          onValueChange={handleUpdateFont}
          className="grid grid-cols-1 gap-2"
        >
          {fontOptions.map((font) => (
            <div key={font.value}>
              <RadioGroupItem
                value={font.value}
                id={`font-${font.value}`}
                className="sr-only"
              />
              <Label
                htmlFor={`font-${font.value}`}
                className={cn(
                  'flex flex-col p-3 rounded-md border-2 border-muted hover:border-accent transition-all duration-150',
                  themeSettings.font === font.value &&
                    'border-primary ring-2 ring-primary/20'
                )}
              >
                <div className={cn('font-preview', font.value)}>
                  <h4 className="font-preview-title font-medium">
                    {font.name}
                  </h4>
                  <p className="font-preview-text">{font.sample}</p>
                  <p className="font-preview-info">{font.description}</p>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};
