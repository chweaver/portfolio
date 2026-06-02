import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/Navigation';
import { LabProgressStrip } from '@/components/LabProgressStrip';
import { Footer } from '@/components/Footer';
import { LogBackground } from '@/components/LogBackground';
import { profile } from '@/data/portfolio';
import { publicAsset } from '@/lib/paths';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });

const siteTitle = `${profile.shortName}, Home Lab and MSP Career Portfolio`;

export const metadata: Metadata = {
  metadataBase: new URL('https://chweaver.github.io'),
  title: siteTitle,
  description: profile.tagline,
  authors: [{ name: profile.shortName }],
  openGraph: {
    title: siteTitle,
    description: profile.tagline,
    url: 'https://chweaver.github.io/portfolio/',
    type: 'website',
    images: [{ url: publicAsset('/og-card.png'), width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: profile.tagline,
    images: [publicAsset('/og-card.png')],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <div className="bg-grid" aria-hidden="true" />
        <LogBackground />
        <Navigation />
        <LabProgressStrip />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
