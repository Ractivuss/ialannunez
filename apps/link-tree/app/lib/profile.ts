import { Profile } from '@/types/profile';

export const profileData: Profile = {
  name: 'Alan Nunez',
  isVerified: true,
  bio: "I'm a Senior Front-End Developer | Full-Stack Engineer | Code Architect with 7+ years of experience delivering scalable, high-performance web applications with React, Next.js, and TypeScript.",
  links: [
    {
      id: 'github',
      label: 'GitHub',
      url: 'https://github.com/Ractivuss',
      icon: 'github',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ayng-98/',
      icon: 'linkedin',
    },
  ],
  themeSettings: {
    font: 'font-mono',
    pattern: 'pattern-none',
    mode: 'light',
    colorTheme: 'blue',
    gradient: 'none',
    borderRadius: 'rounded-none',
    effects: {
      shadow: true,
      glassmorphism: false,
      cardOpacity: 1,
      animationSpeed: 100,
    },
  },
};
