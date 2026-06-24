'use client';

import { useState } from 'react';
import { profile } from '@/data/portfolio';

// Curated jump list, ordered to match the page flow.
const NAV_LINKS = [
  { href: '#projects', label: 'Projects' },
  { href: '#ad-lab', label: 'AD Lab' },
  { href: '#firewall', label: 'Firewall' },
  { href: '#network', label: 'Network' },
  { href: '#skills', label: 'Skills' },
  { href: '#artifacts', label: 'Evidence' },
];

export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-bg-border bg-bg-card/80 backdrop-blur-md backdrop-saturate-150">
      <div className="container-narrow flex h-[62px] items-center justify-between gap-3">
        <a href="#top" className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-sm bg-accent" aria-hidden="true" />
          <span className="font-display text-sm font-semibold text-ink-strong">{profile.shortName}</span>
        </a>
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-2.5 py-2 font-mono text-[12.5px] text-ink-dim hover:text-ink-strong hover:bg-bg-elevated transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${profile.email}`}
            className="ml-1.5 rounded-lg bg-accent px-4 py-2 text-[13.5px] font-semibold text-white hover:bg-accent-dim transition-colors"
          >
            Contact Charlie
          </a>
        </nav>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          className="md:hidden rounded-md border border-bg-border px-2.5 py-1.5 text-ink-dim hover:text-ink-strong"
        >
          <span className="font-mono text-xs">{open ? 'close' : 'menu'}</span>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-bg-border bg-bg-card">
          <div className="container-narrow grid grid-cols-3 gap-2 py-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 font-mono text-sm text-ink-dim hover:text-ink-strong hover:bg-bg-elevated text-center"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`mailto:${profile.email}`}
              onClick={() => setOpen(false)}
              className="col-span-3 rounded-lg bg-accent px-3 py-2.5 text-sm font-semibold text-white text-center hover:bg-accent-dim transition-colors"
            >
              Contact Charlie
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
