'use client';

import { useLabStatus } from '@/lib/useLabStatus';

/**
 * Slim, always-visible progress strip pinned directly under the sticky nav.
 * Reuses the shared useLabStatus hook (same URL as ADLabProgress, so the
 * browser HTTP cache de-dupes the request). Clicking scrolls to #ad-lab for
 * the full phase breakdown. Degrades to a quiet link on fetch failure and
 * shows a neutral loading line before data arrives.
 */
export function LabProgressStrip() {
  const { data, failed } = useLabStatus();

  // Hide entirely on failure: the full #ad-lab section already renders a
  // guide link in that case, so a broken strip pinned to the top would add
  // noise without adding signal.
  if (failed) return null;

  const loading = !data;
  const buildOutDone = data?.summary.buildOutDone ?? 0;
  const buildOutTotal = data?.summary.buildOutTotal ?? 0;
  // Empty: the feed loaded but reports no build-out phases. Show a neutral line
  // instead of a 0 / 0 bar. (Outright fetch failure still hides the strip above.)
  const empty = !!data && buildOutTotal === 0;
  const pct = !data || buildOutTotal === 0 ? 0 : Math.round((buildOutDone / buildOutTotal) * 100);

  return (
    <div className="sticky top-14 z-30 border-b border-bg-border bg-bg/85 backdrop-blur-md">
      <a
        href="#ad-lab"
        aria-label={
          loading
            ? 'Active Directory lab build-out progress, loading'
            : empty
              ? 'Active Directory lab status unavailable. Jump to live status.'
              : `Active Directory lab build-out: ${buildOutDone} of ${buildOutTotal} phases, ${pct} percent. Jump to live status.`
        }
        className="group container-narrow flex items-center gap-3 py-2 transition-colors"
      >
        <span className="section-eyebrow shrink-0 before:hidden sm:before:inline-block">Live AD Lab</span>

        <div
          className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-bg-elevated"
          role="progressbar"
          aria-valuenow={loading || empty ? undefined : pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext={
            loading ? 'Loading' : empty ? 'Unavailable' : `${pct} percent, ${buildOutDone} of ${buildOutTotal} build-out phases`
          }
        >
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>

        <span className="shrink-0 font-mono text-xs tabular-nums">
          {loading ? (
            <span className="text-ink-faint">loading...</span>
          ) : empty ? (
            <span className="text-ink-faint">status unavailable</span>
          ) : (
            <>
              <span className="text-accent">{buildOutDone}</span>
              <span className="text-ink-faint"> / {buildOutTotal} build-out phases</span>
            </>
          )}
        </span>

        <span className="hidden shrink-0 font-mono text-xs text-ink-faint transition-colors group-hover:text-accent sm:inline">
          details &rarr;
        </span>
      </a>
    </div>
  );
}
