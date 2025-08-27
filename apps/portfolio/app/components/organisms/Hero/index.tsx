import './styles.css';
import { cn } from '~/app/utils/cn';

export const Hero = () => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center h-screen bg-black text-white bg-cover bg-center',
        'bg-[url("/images/hero-background.jpg")] bg-no-repeat bg-center bg-cover'
      )}
    >
      <div
        className={cn(
          'flex items-center justify-center w-full h-full',
          'md:flex-row flex-col-reverse'
        )}
      >
        {/* Left Side - bottom part on mobile */}
        <div
          className={cn(
            'flex flex-col items-start justify-center gap-8 p-5',
            'md:pl-30 md:items-start md:w-1/2 md:justify-center'
          )}
        >
          <h1 className="text-6xl font-bold text-left">
            Hello, I'm <span className="text-primary">Alan Nunez</span>
          </h1>
          <p className="text-2xl relative text-left">
            A Software
            <span
              className={cn(
                'text-2xl absolute top-0 left-[9.5ch] text-green',
                'overflow-hidden whitespace-nowrap border-r-2 border-r-primary letter-spacing-2',
                'animate-typewriter-infinite'
              )}
            >
              Engineer
            </span>
            <span
              className={cn(
                'text-2xl absolute top-0 left-[9.5ch] text-purple',
                'overflow-hidden whitespace-nowrap letter-spacing-2',
                'animate-typewriter-second-infinite'
              )}
            >
              Architect
            </span>
          </p>
          <p className="text-2xl text-secondary text-left md:text-left">
            passionate about well-architected and efficient web applications.
          </p>
        </div>

        {/* Right Side - top part on mobile*/}
        <div className="flex flex-col items-center justify-center">
          <img
            src="/images/hero-image.png"
            alt="My hero Image"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
