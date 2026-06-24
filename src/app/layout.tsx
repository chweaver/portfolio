import type { Metadata } from 'next';
import { Bricolage_Grotesque, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { profile } from '@/data/portfolio';
import { publicAsset } from '@/lib/paths';

// Daylight Ops type system: Bricolage Grotesque (display) + IBM Plex Sans (body)
// + IBM Plex Mono (mono). Bricolage is a variable font, so no weight list.
const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage', display: 'swap' });
const plexSans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-plex-sans', display: 'swap' });
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-plex-mono', display: 'swap' });

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
    <html lang="en" className={`${bricolage.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
