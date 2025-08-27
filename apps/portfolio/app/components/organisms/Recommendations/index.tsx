import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/atoms/carousel';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '../../atoms/button';
import { cn } from '~/app/utils/cn';
import { FaQuoteLeft } from 'react-icons/fa';
import { useScrollSubscription } from '~/app/rxjs/subscriptions/useScroll.subscription';

const recommendations = [
  {
    name: 'Ranveer Dhaliwal',
    image:
      'https://media.licdn.com/dms/image/v2/D4D03AQEQygOdpuOKog/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1698946929389?e=1759363200&v=beta&t=XvRc4N1vnY7TefykCtXSotJOpRGryQEfjuoOEoTVDuQ',
    message:
      'Alan was so awesome to work with at Avail, he was seemingly unstoppable when it would come to any issue that would pop up.\n\n' +
      'He was so good at figuring out a great solution and communicating why his choices were the right ones to go with. He could jump into new code bases or apps and he seemed to grasp things so quickly and start contributing in no time.\n\n' +
      'Besides coding, Alan always brought in an awesome attitude and was so fun to talk to about random topics. Would love to work with him again in the future!',
    position: 'Senior Frontend Engineer',
  },
  {
    name: 'Tom Phan',
    image:
      'https://media.licdn.com/dms/image/v2/D4D03AQG-Q02CpkFRtA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1701913168976?e=1759363200&v=beta&t=jhA13N3-Jtw8-cqTgbl6ZX6dPmBAZLo1F-5PqIyUHa0',
    message:
      'During the interview process, instantly knew that Alan would be a solid contributor. His ambition to complete things, drive to learn new technologies, and refreshing ideas will truly make me miss working with him.\n\n' +
      'Upon joining, he immediately absorbed all the information necessary for the main Browser application and contributed his first day. Up until the last day, he was coding Swift (a language that he had no experience with) and analyzing logs to debug realtime issues.\n\n' +
      'Alan became a vital member to our team and was able to drive things on his own. Best of all, we became good friends and I will truly cherish our time working together.',
    position: 'Senior Software Development Engineer',
  },
];

export const Recommendations = () => {
  const recommendationsRef = useRef<HTMLDivElement>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScrollTo = useCallback(
    (index: number) => {
      setActiveIndex(index);
      carouselApi?.scrollTo(index);
    },
    [carouselApi]
  );

  useScrollSubscription((event) => {
    if (event.id === 'recommendations') {
      recommendationsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });

  useEffect(() => {
    if (carouselApi) {
      carouselApi.on('select', () => {
        const index = carouselApi.selectedScrollSnap();
        setActiveIndex(index);
      });
    }
  }, [carouselApi]);

  return (
    <section
      ref={recommendationsRef}
      className="relative flex flex-col items-center justify-center gap-4 py-10"
    >
      <h2 className="text-4xl font-bold text-primary">Recommendations</h2>
      <p className="text-lg text-white">What my coworkers say about me</p>
      <Carousel setApi={setCarouselApi}>
        <CarouselContent>
          {recommendations.map((recommendation) => (
            <CarouselItem
              key={`recommendation-${recommendation.name}`}
              className="flex flex-col items-center justify-center gap-8 hover:cursor-grab"
            >
              <div className="flex items-center justify-center gap-4">
                <FaQuoteLeft className="text-primary text-6xl" />
              </div>
              <div className="flex flex-col items-center justify-center gap-3 max-w-2xl mx-auto p-6">
                <p className="text-base text-white text-center leading-relaxed whitespace-pre-line italic text-gray text-sm md:text-base">
                  {recommendation.message}
                </p>
              </div>
              <div className="flex items-center justify-center gap-4">
                <img
                  src={recommendation.image}
                  alt={recommendation.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex flex-col items-start justify-center gap-1">
                  <p className="text-base text-white font-bold">
                    {recommendation.name}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {recommendation.position}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex items-center justify-center gap-2">
        {recommendations.map((_, index) => (
          <div
            className={cn(
              'rounded-full p-1 flex justify-center items-center w-7 h-7',
              activeIndex === index && 'border-2 border-yellow-500'
            )}
            key={`recommendation-dot-${index}`}
          >
            <Button
              className="rounded-full w-4 h-4 bg-primary hover:bg-primary/60 hover:cursor-pointer p-0 min-w-0 aspect-square"
              onClick={() => handleScrollTo(index)}
            />
          </div>
        ))}
      </div>

      {/* Decorative circles positioned around the section */}
      <div className="absolute top-[5%] left-[10%] w-6 h-6 border-2 border-yellow-500 rounded-full opacity-60"></div>
      <div className="absolute top-[15%] right-[8%] w-4 h-4 bg-yellow-500 rounded-full opacity-70"></div>
      <div className="absolute top-[25%] right-[15%] w-8 h-8 border-2 border-purple rounded-full opacity-50"></div>
      <div className="absolute top-[35%] left-[5%] w-5 h-5 bg-purple rounded-full opacity-60"></div>
      <div className="absolute top-[65%] left-[12%] w-7 h-7 border-2 border-green rounded-full opacity-50"></div>
      <div className="absolute top-[75%] right-[5%] w-6 h-6 bg-green rounded-full opacity-70"></div>
      <div className="absolute top-[45%] left-[20%] w-4 h-4 border-2 border-primary rounded-full opacity-40"></div>
      <div className="absolute top-[55%] right-[25%] w-5 h-5 bg-primary rounded-full opacity-50"></div>
    </section>
  );
};
