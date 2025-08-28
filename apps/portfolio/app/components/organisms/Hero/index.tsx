import { Button } from '@/components/atoms/button';
import { cn } from '@/utils/cn';
import { Github, Linkedin, Link, Mail } from 'lucide-react';
import { FaReact } from 'react-icons/fa';
import './styles.css';
import { SiNextdotjs, SiTypescript } from 'react-icons/si';
import { IoLogoJavascript } from 'react-icons/io';
import { useScrollSubscription } from '~/app/rxjs/subscriptions/useScroll.subscription';
import { useCallback, useRef } from 'react';
import {
  scrollSubject$,
  ScrollToIdTypes,
} from '~/app/rxjs/subjects/scroll.subject';

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  useScrollSubscription((event) => {
    if (event.id === 'home') {
      heroRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });

  const handleScrollTo = useCallback((id: ScrollToIdTypes) => {
    scrollSubject$.next({ id });
  }, []);

  return (
    <section
      ref={heroRef}
      className={cn(
        'flex flex-col items-center justify-center min-h-screen w-full bg-black text-white',
        'bg-[url("/images/hero-background.jpg")] bg-no-repeat bg-center bg-cover bg-fixed'
      )}
    >
      <div
        className={cn(
          'flex items-center justify-center w-full min-h-screen gap-16',
          'md:flex-row flex-col-reverse md:gap-0'
        )}
      >
        {/* Left Side - bottom part on mobile */}
        <div
          className={cn(
            'flex flex-col items-center md:items-start justify-center gap-4 p-5',
            'md:pl-30 md:w-1/2 md:justify-center'
          )}
        >
          <h1 className="md:text-6xl text-4xl font-bold text-center md:text-left">
            Hello, I'm <span className="text-primary">Alan Núñez</span>
          </h1>
          <p className="md:text-2xl text-lg relative text-center md:text-left pr-15">
            A Software
            <span
              className={cn(
                'md:text-2xl text-lg absolute top-0 left-[9.5ch] text-green',
                'overflow-hidden whitespace-nowrap border-r-2 border-r-primary letter-spacing-2',
                'animate-typewriter-infinite'
              )}
            >
              Engineer
            </span>
            <span
              className={cn(
                'md:text-2xl text-lg absolute top-0 left-[9.5ch] text-purple',
                'overflow-hidden whitespace-nowrap letter-spacing-2',
                'animate-typewriter-second-infinite'
              )}
            >
              Architect
            </span>
          </p>
          <p className="text-2xl text-secondary text-left md:text-left hidden md:flex">
            passionate about well-architected and efficient web applications.
          </p>
          <div
            className={cn(
              'flex items-center justify-center gap-4 w-full',
              'md:justify-start'
            )}
          >
            <Button
              className="rounded-full cursor-pointer p-6"
              onClick={() => handleScrollTo('experience')}
            >
              My Experience
            </Button>
            <div className="flex items-center justify-between gap-4">
              <a href="https://linktree.ialannunez.mx" target="_blank">
                <Link className="w-6 h-6" />
              </a>
              <a href="https://github.com/Ractivuss" target="_blank">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/ayng-98/" target="_blank">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:nunezalan0798@gmail.com">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side - top part on mobile*/}
        <div className="flex flex-col items-center justify-center relative">
          <img
            src="/images/hero-image-optimized.png"
            alt="My hero Image"
            loading="lazy"
            className="object-cover md:h-full h-80"
          />
          <span
            className={cn(
              'absolute top-[5%] left-[22%] p-2 rounded-md bg-black/50 z-10 flex items-center justify-center',
              'md:top-[5%] md:left-[27%] animate-[float_3s_ease-in-out_infinite]'
            )}
          >
            <FaReact className="w-8 h-8 md:w-10 md:h-10 text-react" />
          </span>
          <span
            className={cn(
              'absolute top-[25%] left-[70%] p-2 rounded-md bg-white/80 z-10 flex items-center justify-center',
              'md:top-[25%] md:left-[65%] animate-[float-delay-1_3.5s_ease-in-out_infinite]'
            )}
          >
            <SiNextdotjs className="w-8 h-8 md:w-10 md:h-10 text-black" />
          </span>
          <span
            className={cn(
              'absolute top-[80%] left-[30%] p-2 rounded-md bg-blue-500/10 z-10 flex items-center justify-center',
              'md:top-[90%] md:left-[40%] animate-[float-delay-2_4s_ease-in-out_infinite]'
            )}
          >
            <SiTypescript className="w-8 h-8 md:w-10 md:h-10 text-typescript" />
          </span>
          <span
            className={cn(
              'absolute top-[70%] left-[68%] p-2 rounded-md bg-yellow-300/10 z-10 flex items-center justify-center',
              'md:top-[70%] md:left-[68%] animate-[float-delay-2_4s_ease-in-out_infinite]'
            )}
          >
            <IoLogoJavascript className="w-8 h-8 md:w-10 md:h-10 text-yellow-300" />
          </span>
        </div>
      </div>
    </section>
  );
};
