
import { cn } from '@lib/utils';
import { useTheme } from '@/hooks/useTheme';
import { ProfileCard } from '@organisms/ProfileCard';

export default function Index() {
  const { themeSettings, isHydrated } = useTheme();

  // Prevent hydration mismatch by using default values during SSR
  const fontClass = isHydrated ? themeSettings.font : 'font-sans';
  const patternClass = isHydrated ? themeSettings.pattern : 'pattern-none';

  return (
    <div 
      className={cn('min-h-screen flex items-center justify-center p-4', patternClass)}
      style={{ backgroundColor: 'hsl(var(--page-background))' }}
    >
      <div className={cn('w-full max-w-3xl', fontClass)}>
        <div className="w-full max-w-md mx-auto -mt-16">
          <ProfileCard />
        </div>
      </div>
    </div>
  );
}
