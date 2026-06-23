import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/Navigation';
import { LabProgressStrip } from '@/components/LabProgressStrip';
import { Footer } from '@/components/Footer';
import { LogBackground } from '@/components/LogBackground';
import { profile } from '@/data/portfolio';
import { publicAsset } from '@/lib/paths';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap' });

const siteTitle = `${profile.shortName}, MSP Tier-1 Service Desk Candidate | Active Directory + pfSense Lab | CompTIA A+ | ${profile.location.split(',')[0]} (Indianapolis metro)`;
const siteDescription = `Entry-level MSP candidate, ${profile.age}. Live Active Directory domain, routed pfSense lab, CompTIA A+ Core 1 passed, documented and verified. No professional MSP tenure yet.`;

export const metadata: Metadata = {
  metadataBase: new URL('https://chweaver.github.io'),
  title: siteTitle,
  description: profile.tagline,
  authors: [{ name: profile.shortName }],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: 'https://chweaver.github.io/portfolio/',
    type: 'website',
    images: [{ url: publicAsset('/og-card.png'), width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [publicAsset('/og-card.png')],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${spaceGrotesk.variable}`}>
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
