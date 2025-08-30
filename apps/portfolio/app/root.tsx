import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import type { MetaFunction, LinksFunction } from '@remix-run/node';
import styles from './styles.css?url';

export const meta: MetaFunction = () => [
  {
    title: 'Alan Nunez | Portfolio',
    description: "Alan Nunez's Portfolio Website",
  },
  // Open Graph / Facebook
  {
    property: 'og:type',
    content: 'website',
  },
  {
    property: 'og:title',
    content: 'Alan Nunez | Portfolio',
  },
  {
    property: 'og:description',
    content: "Alan Nunez's Portfolio Website",
  },
  {
    property: 'og:image',
    content: 'https://portfolio.ialannunez.mx/images/hero-preview.webp',
  },
  {
    property: 'og:image:width',
    content: '1200',
  },
  {
    property: 'og:image:height',
    content: '630',
  },
  {
    property: 'og:url',
    content: 'https://portfolio.ialannunez.mx',
  },
  // Twitter Card
  {
    name: 'twitter:card',
    content: 'summary_large_image',
  },
  {
    name: 'twitter:title',
    content: 'Alan Nunez | Portfolio',
  },
  {
    name: 'twitter:description',
    content: "Alan Nunez's Portfolio Website",
  },
  {
    name: 'twitter:image',
    content: 'https://portfolio.ialannunez.mx/images/hero-preview.webp',
  },
  // Additional meta tags
  {
    name: 'keywords',
    content:
      'Portfolio, Website, Alan Nunez, Alan Núñez, Full Stack Developer, Senior Software Engineer, Software Engineer, Software Architect, React, Next.js, TypeScript, Tailwind CSS, Playwright, Cypress, Jest, Prisma, Node.js, Express, MongoDB, PostgreSQL, Docker',
  },
  {
    'script:ld+json': {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Alan Nunez',
      url: 'https://portfolio.ialannunez.mx',
      image: 'https://portfolio.ialannunez.mx/images/hero-preview.webp',
      description:
        "Alan Nunez's Portfolio Website - Software Engineer and Software Architect",
      jobTitle: 'Software Engineer',
      worksFor: {
        '@type': 'Organization',
        name: 'Freelance',
        url: 'https://portfolio.ialannunez.mx',
      },
      knowsAbout: [
        'Software Engineering',
        'Software Architecture',
        'React',
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'Playwright',
        'Cypress',
        'Jest',
        'Prisma',
        'Node.js',
        'Express',
        'MongoDB',
        'PostgreSQL',
        'Docker',
      ],
      sameAs: [
        'https://github.com/Ractivuss',
        'https://www.linkedin.com/in/ayng-98/',
      ],
    },
  },
];

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="m-0 p-0">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
