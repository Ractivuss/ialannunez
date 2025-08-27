import { Card, CardContent, CardHeader } from '@/components/atoms/card';
import { useRef, useState } from 'react';
import { useScrollSubscription } from '~/app/rxjs/subscriptions/useScroll.subscription';

const experience = [
  {
    company: 'Raiven Inc.',
    logo: 'https://media.licdn.com/dms/image/v2/C4D0BAQHsKqGDAMS_BQ/company-logo_200_200/company-logo_200_200/0/1630581741788/raiven_logo?e=1759363200&v=beta&t=c42bA_wFWnm0IIpDcCx2KGXICbwQ5BCsiqVHuRFwYCo',
    position: 'Senior Frontend Developer',
    description:
      'Worked on front-end architecture and testing strategy for a large-scale React/Next.js application. Also, implemented a service layer pattern with React Query and introduced TDD practices and code coverage thresholds, reducing bugs and raising quality standards.\n\n' +
      'After increasing successfully the Raiven admin code quality, I worked on front-end architecture and testing strategy for the Customer portal as well by implementing a service layer pattern with React Query, improving end-to-end testing with Playwright and Jest (POM architecture), integrating Microsoft Application Insights for monitoring, introducing TDD practices and code coverage thresholds, designing reusable and compossible components with React Atomic Design.',
    date: 'Dec 2023 - August 2025',
  },
  {
    company: 'Avail MedSystems Inc.',
    logo: 'https://media.licdn.com/dms/image/v2/C560BAQFIO_ZYf1U5Ng/company-logo_200_200/company-logo_200_200/0/1656622121902/avail_medsystems_logo?e=1759363200&v=beta&t=upuse5fYDn0Mpk1U5W4h7t5ri9VG_zSkrTz9lBF2BTk',
    position: 'Frontend Developer',
    description:
      'Maintained and improved a surgical video-call application using Twilio (media streaming) and PubNub (real-time messaging) with multi-camera and imaging controls. Contributed to new platform architecture, optimized performance (HTTP requests, rendering, camera thumbnail refresh every 5 seconds), integrated a third-party surgical app (by ORtelligence), and added LaunchDarkly for feature flag management.\n\n' +
      'Automated unified test coverage reports with Cypress + Jest + Bash + GitLab CI + Sonar Cloud. Led the implementation of an OOP pattern in Cypress with Cucumber for reusable tests.\n\n' +
      'Acted as a cross-functional engineer by integrating and troubleshooting features between Console (Swift) and Portal-call (React + Typescript). Helped establish a scalable communication flow for Console’s capabilities across the different projects.\n\n' +
      'Maintained a bridge for PubNub event translation between Swift and TypeScript, enabling consistent communication across Console and Portal-call.\n\n' +
      'Maintained an Electron app written in JavaScript + Redux Saga that connected with Console via iOS pipes.',
    date: 'Dec 2021 - Nov 2023',
  },
  {
    company: 'Novavia',
    logo: 'https://media.licdn.com/dms/image/v2/C4E0BAQEeE-JqVVLWig/company-logo_200_200/company-logo_200_200/0/1630649169571/novaviaauditoriayconsultoria_logo?e=1759363200&v=beta&t=R7J3UUcPkwqwo0hpiJQNoCzlx19r2-jmCeVyCnYtiyY',
    position: 'Software Engineer',
    description:
      'Performed as a leader in scheduling and guiding React.js projects tailored to clients’ requirements. Developed SIRA, a web solution enabling auditors to streamline and manage the auditing process efficiently.\n\n' +
      'Implemented a private NAS network delivering multiple services, including drive storage, chat, and other collaboration tools.\n\n' +
      'Led the implementation of a Fixed Assets Manager App for Novavia’s client, empowering users to create, edit, delete, and consult thousands of items with high UI performance by applying advanced techniques such as windowing.',
    date: 'Feb 2019 - Nov 2021',
  },
];

export const Experience = () => {
  const experienceRef = useRef<HTMLDivElement>(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState<
    Record<number, boolean>
  >({});

  const toggleDescription = (index: number) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const truncateDescription = (description: string) => {
    const maxLength = 200;
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength).trim() + '...';
  };

  useScrollSubscription((event) => {
    if (event.id === 'experience') {
      experienceRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });

  return (
    <section
      ref={experienceRef}
      className="relative flex flex-col items-center justify-center gap-8 py-10 px-4 md:px-0 overflow-hidden py-20"
    >
      {/* Background Images with Random Positions */}
      <img
        src="/images/colors-1.png"
        alt="colors-1"
        className="absolute w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 pointer-events-none top-[15%] left-[0%] rotate-[15deg]"
      />
      <img
        src="/images/colors-2.png"
        alt="colors-2"
        className="absolute w-56 h-56 md:w-72 md:h-72 lg:w-88 lg:h-88 pointer-events-none top-[15%] right-[15%] -rotate-[25deg] md:right-[5%]"
      />
      <img
        src="/images/colors-3.png"
        alt="colors-3"
        className="absolute w-60 h-60 md:w-76 md:h-76 lg:w-92 lg:h-92 pointer-events-none bottom-[10%] left-[32%] md:left-[82%]"
      />

      <h2 className="text-4xl font-bold text-primary relative z-10">
        Experience
      </h2>
      <div className="flex flex-col gap-8 max-w-6xl relative z-10 md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
        {experience.map((exp, index) => (
          <Card
            key={index}
            className="bg-white/5 rounded-lg p-6 border border-white/10 relative z-10"
          >
            <CardHeader>
              <div className="flex items-start gap-2">
                <img
                  src={exp.logo}
                  alt={exp.company}
                  className="w-10 h-10 rounded-full"
                  loading="lazy"
                />
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold text-white">
                    {exp.company}
                  </h3>
                  <p className="text-sm text-primary">{exp.position}</p>
                  <p className="text-sm text-gray-300">{exp.date}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p
                  className="text-gray-300 leading-relaxed text-sm whitespace-pre-line"
                  onClick={() => toggleDescription(index)}
                >
                  {expandedDescriptions[index]
                    ? exp.description
                    : truncateDescription(exp.description)}
                </p>
                {exp.description.length > 200 && (
                  <button
                    onClick={() => toggleDescription(index)}
                    className="text-primary hover:text-primary/80 text-sm font-medium transition-colors hover:cursor-pointer"
                  >
                    {expandedDescriptions[index] ? 'Read less' : 'Read more'}
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
