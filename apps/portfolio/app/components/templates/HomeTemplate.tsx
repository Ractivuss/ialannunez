import { Header } from '@/components/molecules/Header';
import { Hero } from '@/components/organisms/Hero';
import { Experience } from '@/components/organisms/Experience';
import { Footer } from '@/components/organisms/Footer';
import { Recommendations } from '@/components/organisms/Recommendations';

export const HomeTemplate = () => {
  return (
    <>
      <Header />
      <Hero />
      <Experience />
      <Recommendations />
      <Footer />
    </>
  );
};
