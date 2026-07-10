import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '1Touch Development | Enterprise AI & Data Intelligence Consulting',
    template: '%s | 1Touch Development',
  },
  description:
    '1Touch Development is a premier AI/ML and Data Intelligence consulting firm helping Fortune 500 enterprises solve complex business problems with production-grade AI systems.',
  keywords: [
    'enterprise AI consulting',
    'machine learning',
    'data intelligence',
    'AI strategy',
    'LLM development',
    'generative AI',
    'computer vision',
    'AI agents',
    'data engineering',
  ],
  authors: [{ name: '1Touch Development' }],
  creator: '1Touch Development',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://1touchdevelopment.com',
    siteName: '1Touch Development',
    title: '1Touch Development | Enterprise AI & Data Intelligence Consulting',
    description:
      'We solve difficult business problems using AI. Enterprise-grade AI/ML consulting for Fortune 500 companies.',
  },
  twitter: {
    card: 'summary_large_image',
    title: '1Touch Development | Enterprise AI Consulting',
    description: 'Enterprise AI/ML and Data Intelligence consulting.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
