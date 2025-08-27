import { Link } from '@remix-run/react';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-around items-center p-4 text-white">
        <h1 className="text-2xl font-bold">
          <span className="text-primary">A</span>lan{' '}
          <span className="text-primary">N</span>úñez
        </h1>
        <nav className="flex items-center gap-12 hidden md:flex">
          <Link
            to="/"
            className="hover:text-primary transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/experience"
            className="hover:text-primary transition-colors duration-300"
          >
            Experience
          </Link>
          <Link
            to="/recommendations"
            className="hover:text-primary transition-colors duration-300"
          >
            Recommendations
          </Link>
        </nav>
      </div>
    </header>
  );
};
