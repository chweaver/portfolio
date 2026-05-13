'use client';

import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { href: '#lab', label: 'Lab' },
  { href: '#network', label: 'Network' },
  { href: '#firewall', label: 'Firewall' },
  { href: '#vms', label: 'VMs' },
  { href: '#skills', label: 'Skills' },
  { href: '#roadmap', label: 'Roadmap' },
  { href: '#certs', label: 'Certs' },
  { href: '#career', label: 'Career' },
  { href: '#contact', label: 'Contact' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all ${
        scrolled
          ? 'border-b border-bg-border bg-bg/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-narrow flex h-14 items-center justify-between">
        <a href="#top" className="group flex items-center gap-2 font-mono text-sm">
          <span className="inline-block h-2 w-2 rounded-full bg-signal-green shadow-glow animate-pulse-slow" />
          <span className="text-ink-dim group-hover:text-ink transition-colors">charlie@homelab</span>
          <span className="text-accent">:~$</span>
        </a>
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded px-3 py-1.5 text-sm text-ink-dim hover:text-accent hover:bg-bg-elevated transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          className="md:hidden rounded border border-bg-border px-2.5 py-1.5 text-ink-dim hover:text-accent"
        >
          <span className="font-mono text-xs">{open ? 'close' : 'menu'}</span>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-bg-border bg-bg-elevated">
          <div className="container-narrow grid grid-cols-3 gap-2 py-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded px-3 py-2 text-sm text-ink-dim hover:text-accent hover:bg-bg-card text-center"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
