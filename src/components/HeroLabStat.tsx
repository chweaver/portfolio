'use client';

import { useLabStatus } from '@/lib/useLabStatus';

// Live Active Directory build-out stat for the hero. Reads the same feed as the
// sticky strip and the AD section, so "live" is literally true. Falls back to the
// last-known snapshot while loading or on a failed fetch, and only shows the live
// dot and the "updated" line when fresh feed data is actually in hand.
const SNAPSHOT = { done: 8, total: 12 };

function updatedAgo(iso: string): string | null {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return null;
  const days = Math.floor((Date.now() - then) / 86400000);
  if (days <= 0) return 'updated today';
  if (days === 1) return 'updated yesterday';
  if (days < 30) return `updated ${days} days ago`;
  const months = Math.floor(days / 30);
  return months <= 1 ? 'updated 1 month ago' : `updated ${months} months ago`;
}

export function HeroLabStat() {
  const { data, failed } = useLabStatus();
  const live = !!data && !failed;
  const done = data?.summary.buildOutDone ?? SNAPSHOT.done;
  const total = data?.summary.buildOutTotal ?? SNAPSHOT.total;
  const updated = data ? updatedAgo(data.generatedAt) : null;

  return (
    <div className="card p-5 border-accent/40 bg-accent/5">
      <div className="flex items-center gap-2">
        {live && (
          <span
            className="inline-block h-2 w-2 shrink-0 rounded-full bg-accent animate-pulse-slow"
            aria-hidden
          />
        )}
        <div className="font-mono text-4xl text-accent tabular-nums leading-none">
          {done}/{total}
        </div>
      </div>
      <div className="mt-2 text-sm font-medium text-ink">AD build-out</div>
      <div className="font-mono text-xs text-ink-faint">
        {live && updated ? `phases done, ${updated}` : 'phases done'}
      </div>
    </div>
  );
}
