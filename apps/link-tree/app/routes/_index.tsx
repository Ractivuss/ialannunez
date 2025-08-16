import { cn } from '@lib/utils';
import { ProfileCard } from '@organisms/ProfileCard';
import { Header } from '@/components/molecules/Header';
import { useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';

export default function Index() {
  const [isEditMode, setIsEditMode] = useState(false);
  const { themeSettings, isHydrated } = useTheme();

  // Prevent hydration mismatch by using default values during SSR
  const fontClass = isHydrated ? themeSettings.font : 'font-sans';
  const patternClass = isHydrated ? themeSettings.pattern : 'pattern-none';

  const toggleEditMode = () => setIsEditMode(!isEditMode);

  const saveProfileChanges = () => {
    console.log('saveProfileChanges');
  };

  return (
    <div
      className={cn(
        'min-h-screen flex items-center justify-center p-4',
        patternClass,
        fontClass
      )}
      style={{ backgroundColor: 'hsl(var(--page-background))' }}
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
          <ProfileCard />
        </div>
      </div>
    </div>
  );
}
