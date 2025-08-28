import { useQuery } from '@tanstack/react-query';
import { type Profile } from '@/types/profile.types';

const staticProfile: Profile = {
  name: 'Alan Nunez',
  isVerified: true,
  bio: "I'm a Senior Front-End Developer | Full-Stack Engineer | Code Architect with 7+ years of experience delivering scalable, high-performance web applications with React, Next.js, and TypeScript.",
  links: [
    {
      id: 'portfolio',
      label: 'Portfolio',
      url: 'https://portfolio.ialannunez.mx',
      icon: 'globe',
    },
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
};

const getStaticProfile = (): Profile => staticProfile;

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getStaticProfile,
    initialData: staticProfile,
    refetchOnWindowFocus: true,
  });
};
