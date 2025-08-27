import { Menu } from 'lucide-react';
import { useCallback } from 'react';
import {
  scrollSubject$,
  ScrollToIdTypes,
} from '~/app/rxjs/subjects/scroll.subject';

export const Header = () => {
  const handleScrollTo = useCallback((id: ScrollToIdTypes) => {
    scrollSubject$.next({ id });
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="flex md:justify-around justify-between items-center p-8 text-white">
        <h1 className="text-4xl font-bold">Alan Núñez</h1>
        <nav className="flex items-center gap-12 hidden md:flex">
          <button
            onClick={() => handleScrollTo('home')}
            className="hover:text-primary transition-colors duration-300 text-lg cursor-pointer bg-transparent border-none"
          >
            Home
          </button>
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
        <Menu className="flex md:hidden" />
      </div>
    </header>
  );
};
