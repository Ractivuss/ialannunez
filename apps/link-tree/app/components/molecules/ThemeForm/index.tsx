import { useState } from 'react';
import { Label } from '@atoms/label';
import { Switch } from '@atoms/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@atoms/tabs';
import { Button } from '@atoms/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';
import { EffectsTab } from './EffectsTab';
import { ColorsTab } from './ColorsTab';
import { BackgroundTab } from './BackgroundTab';
import { defaultTheme, setMode } from '@/services/theme';

export const ThemeForm = () => {
  const [activeSubTab, setActiveSubTab] = useState('colors');
  const { themeSettings, resetTheme, updateTheme } = useTheme();

  const handleDarkModeToggle = () => {
    const mode = isDarkMode ? 'light' : 'dark';
    updateTheme({ mode });
    setMode(mode);
  };

  const handleResetDefaults = () => {
    resetTheme();
    updateTheme(defaultTheme);
  };

  const isDarkMode = themeSettings.mode === 'dark';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Theme Settings</h3>
          <p className="text-sm text-muted-foreground">
            Customize the appearance of your v0.me page
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleResetDefaults}
          className="gap-1"
        >
          Reset Defaults
        </Button>
      </div>

      {/* Dark Mode Toggle */}
      <div className="flex items-center justify-between p-3 border rounded-md">
        <div className="flex items-center gap-2">
          {isDarkMode ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
          <div>
            <Label htmlFor="dark-mode" className="text-base">
              Dark Mode
            </Label>
            <p className="text-xs text-muted-foreground">
              Switch between light and dark theme
            </p>
          </div>
        </div>
        <Switch
          id="dark-mode"
          checked={isDarkMode}
          onCheckedChange={handleDarkModeToggle}
        />
      </div>

      {/* Theme Settings Tabs */}
      <Tabs
        value={activeSubTab}
        onValueChange={setActiveSubTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="background">Background</TabsTrigger>
          <TabsTrigger value="effects">Effects</TabsTrigger>
        </TabsList>

        {/* Colors Tab */}
        <TabsContent value="colors">
          <ColorsTab />
        </TabsContent>

        {/* Background Tab */}
        <TabsContent value="background">
          <BackgroundTab />
        </TabsContent>

        {/* Effects Tab */}
        <TabsContent value="effects">
          <EffectsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};
