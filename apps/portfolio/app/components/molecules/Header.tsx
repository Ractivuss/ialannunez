import { useCallback, useState } from 'react';
import { useEventListener } from '~/app/hooks/useEventListener';
import {
  scrollSubject$,
  ScrollToIdTypes,
} from '~/app/rxjs/subjects/scroll.subject';
import { cn } from '~/app/utils/cn';
import { DrawerMenu } from './DrawerMenu';

export const Header = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    setHasScrolled(scrollTop > 50);
  });

  const handleScrollTo = useCallback((id: ScrollToIdTypes) => {
    scrollSubject$.next({ id });
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        hasScrolled ? 'bg-white/5 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      )}
    >
      <div className="flex md:justify-between justify-around items-center py-8 md:px-30 text-white">
        <h1 className="text-2xl md:text-4xl font-bold hover:text-primary transition-colors duration-300">
          <button
            onClick={() => handleScrollTo('home')}
            className="hover:cursor-pointer"
          >
            Alan Núñez
          </button>
        </h1>
        <nav className="flex items-center gap-12 hidden md:flex">
          <button
            onClick={() => handleScrollTo('experience')}
            className="hover:text-primary transition-colors duration-300 text-lg cursor-pointer bg-transparent border-none"
          >
            Experience
          </button>
          <button
            onClick={() => handleScrollTo('recommendations')}
            className="hover:text-primary transition-colors duration-300 text-lg cursor-pointer bg-transparent border-none"
          >
            Recommendations
          </button>
        </nav>
        <DrawerMenu onMenuClick={handleScrollTo} />
      </div>
    </header>
  );
};
