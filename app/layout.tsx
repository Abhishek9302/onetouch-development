import type { Metadata } from 'next';
import './globals.css';
import { SITE } from '@/src/content';

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | AI/ML Consulting, Services & Technology Licensing`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    '1touch.ai',
    'AI consulting',
    'machine learning',
    'LLM development',
    'computer vision',
    'multi-agent systems',
    'data analytics',
    'business intelligence',
    'intelligent automation',
    'technology licensing',
    'generative AI',
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  metadataBase: new URL(SITE.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | Enterprise AI & ML Consulting`,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} | Enterprise AI Consulting`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}
