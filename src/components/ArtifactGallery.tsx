'use client';

import { useEffect, useState, useCallback } from 'react';
import { Section } from './Section';
import { publicAsset } from '@/lib/paths';

type Artifact = {
  file: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

const ARTIFACTS: Artifact[] = [
  {
    file: 'Firewall Rules.png',
    alt: 'pfSense firewall ruleset, captured from lab',
    caption: 'Firewall rules',
    width: 1920,
    height: 1080,
  },
  {
    file: 'Firewall Log.png',
    alt: 'Firewall log showing block and pass events',
    caption: 'Firewall log',
    width: 1920,
    height: 1080,
  },
  {
    file: 'Interface Assignments.png',
    alt: 'Interface assignments: WAN, LAN, LAB200',
    caption: 'Interface assignments',
    width: 1920,
    height: 1080,
  },
  {
    file: 'Dashboard.png',
    alt: 'pfSense dashboard, current lab state',
    caption: 'Dashboard',
    width: 2560,
    height: 1440,
  },
  {
    file: 'SSH with no ping back from 192.168.100.10.png',
    alt: 'SSH success and ICMP block from LAN host',
    caption: 'SSH passes, ICMP blocks',
    width: 2560,
    height: 1440,
  },
];

function pngSrc(file: string): string {
  return publicAsset(`logs/${file}`);
}

function webpSrc(file: string): string {
  return publicAsset(`logs/${file.replace(/\.png$/i, '.webp')}`);
}

export function ArtifactGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + ARTIFACTS.length) % ARTIFACTS.length)),
    []
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % ARTIFACTS.length)),
    []
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex, close, prev, next]);

  return (
    <Section
      id="artifacts"
      eyebrow="Evidence"
      title="Captured from the lab."
      subtitle="Every screenshot is a direct export from the pfSense web UI on the running lab, and public/logs ships the real filter.log, dhcpd.log, and system.log. Click any thumbnail for full size. Ask for unredacted exports or a live walkthrough and I will send them."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ARTIFACTS.map((a, i) => (
          <button
            key={a.file}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="card group overflow-hidden p-0 text-left hover:border-accent/40 transition-colors"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
              <picture>
                <source srcSet={webpSrc(a.file)} type="image/webp" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pngSrc(a.file)}
                  alt={a.alt}
                  width={a.width}
                  height={a.height}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </picture>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <div className="text-sm text-ink">{a.caption}</div>
                <div className="font-mono text-[11px] text-ink-faint">PNG · click to enlarge</div>
              </div>
              <span className="font-mono text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                open →
              </span>
            </div>
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={ARTIFACTS[openIndex].alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-8"
          onClick={close}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous artifact"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-bg-border bg-bg-elevated/80 p-2 font-mono text-ink hover:text-accent hover:border-accent/40 transition-colors"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next artifact"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-bg-border bg-bg-elevated/80 p-2 font-mono text-ink hover:text-accent hover:border-accent/40 transition-colors"
          >
            ›
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Close"
            autoFocus
            className="absolute right-4 top-4 rounded-md border border-bg-border bg-bg-elevated/80 px-3 py-1.5 font-mono text-xs text-ink hover:text-accent hover:border-accent/40 transition-colors"
          >
            close esc
          </button>
          <figure
            className="max-w-6xl w-full max-h-[88vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <picture>
              <source srcSet={webpSrc(ARTIFACTS[openIndex].file)} type="image/webp" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={pngSrc(ARTIFACTS[openIndex].file)}
                alt={ARTIFACTS[openIndex].alt}
                width={ARTIFACTS[openIndex].width}
                height={ARTIFACTS[openIndex].height}
                className="max-h-[80vh] w-auto max-w-full rounded-lg border border-bg-border shadow-2xl object-contain bg-bg-card"
              />
            </picture>
            <figcaption className="mt-3 text-center font-mono text-xs text-ink-dim">
              {ARTIFACTS[openIndex].caption}
              <span className="mx-2 text-ink-faint">·</span>
              <span className="text-ink-faint">{openIndex + 1} / {ARTIFACTS.length}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </Section>
  );
}
