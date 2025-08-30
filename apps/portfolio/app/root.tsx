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
    image: '/images/hero-background.jpg',
    tags: [
      'Portfolio',
      'Website',
      'Alan Nunez',
      'Software Engineer',
      'Software Architect',
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Playwright',
      'Cypress',
      'Jest',
    ],
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
