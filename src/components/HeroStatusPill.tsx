'use client';

import { useLabStatus } from '@/lib/useLabStatus';

// Live AD lab status, relocated from the old sticky strip into the hero pill
// (Daylight Ops puts the live proof up top, not in a separate bar). Reads the
// same feed; falls back to the last-known snapshot while loading or on failure.
const SNAPSHOT = { done: 8, total: 12 };

export function HeroStatusPill() {
  const { data, failed } = useLabStatus();
  const live = !!data && !failed;
  const done = data?.summary.buildOutDone ?? SNAPSHOT.done;
  const total = data?.summary.buildOutTotal ?? SNAPSHOT.total;
  const next = data?.phases.find((p) => p.status === 'next');
  const label =
    live && next
      ? `Live AD lab: ${done}/${total} phases done, next: ${next.title}`
      : `Live AD lab: ${done}/${total} phases done`;

  return (
    <a
      href="#ad-lab"
      className="inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 font-mono text-xs text-accent-dim transition-colors hover:border-accent"
      style={{ background: 'var(--accent-wash)', borderColor: 'var(--live-border)' }}
    >
      <span
        className={`inline-block h-[7px] w-[7px] shrink-0 rounded-full bg-accent ${live ? 'animate-pulse-slow' : ''}`}
        aria-hidden
      />
      <span>
        {label} <span aria-hidden>&rarr;</span>
      </span>
    </a>
  );
}
