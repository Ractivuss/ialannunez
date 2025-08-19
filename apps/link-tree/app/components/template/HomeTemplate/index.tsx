import { cn } from '@/utils/tailwind.utils';
import { useTheme } from '@/providers/ThemeProvider';
import { useState } from 'react';
import { Header } from '@/components/molecules/Header';
import { ProfileCard } from '@/components/molecules/ProfileCard';
import { CardFlip } from '@/components/atoms/card-flip';
import { EditThemeCard } from '@/components/molecules/EditThemeCard';

export const HomeTemplate = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { themeSettings, isHydrated, saveTheme } = useTheme();

  const toggleEditMode = () => setIsEditMode(!isEditMode);

  const saveProfileChanges = () => saveTheme(themeSettings);

  // Prevent hydration mismatch by using default values during SSR
  const fontClass = isHydrated ? themeSettings.font : 'font-sans';
  const patternClass = isHydrated ? themeSettings.pattern : 'pattern-none';

  return (
    <div
      className={cn('min-h-screen', fontClass)}
      style={{ backgroundColor: 'hsl(var(--page-background))' }}
    >
      <main
        className={cn(
          'min-h-screen flex items-start justify-center p-4 pt-[calc(50vh-350px)] md:pt-[calc(50vh-300px)]',
          patternClass,
          isEditMode && 'md:pt-[calc(50vh-400px)]'
        )}
      >
        <div className="w-full max-w-md flex flex-col items-center">
          <div className="w-full mb-4">
            <Header
              isEditMode={isEditMode}
              onToggleEditMode={toggleEditMode}
              onSaveChanges={saveProfileChanges}
            />
          </div>
          <div className="w-full">
            <CardFlip
              isFlipped={isEditMode}
              onFlip={toggleEditMode}
              frontContent={<ProfileCard />}
              backContent={<EditThemeCard />}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
