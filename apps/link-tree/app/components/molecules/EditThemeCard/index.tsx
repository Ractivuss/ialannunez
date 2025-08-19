import { Card, CardContent } from '@atoms/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@atoms/tabs';
import { cn } from '@/utils/tailwind.utils';
import { useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { ThemeForm } from '../ThemeForm';

export const EditThemeCard = () => {
  const [activeTab, setActiveTab] = useState('theme');
  const { themeSettings } = useTheme();

  return (
    <Card
      className={cn(
        'shadow-lg border-2 bg-background',
        themeSettings.borderRadius,
        themeSettings.effects.shadow ? 'shadow-lg' : 'shadow-none',
        themeSettings.effects.glassmorphism && 'glassmorphism'
      )}
      style={{ opacity: themeSettings.effects.cardOpacity }}
    >
      <CardContent className="p-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className={cn('w-full', themeSettings.font)}
        >
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="theme">Theme</TabsTrigger>
          </TabsList>

          <TabsContent value="theme" className="space-y-4">
            <ThemeForm />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
