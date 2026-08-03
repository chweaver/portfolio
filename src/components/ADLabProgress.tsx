'use client';

import { Section } from './Section';
import { adLab, adLabReflection } from '@/data/portfolio';
import { useLabStatus, type LabPhase, type LabStatus, type PhaseStatus } from '@/lib/useLabStatus';

// Shared by the Linux lab section so the two live sections stay visually
// identical: same pill classes, same vocabulary, same date treatment.
export const STATUS_PILL: Record<PhaseStatus, { className: string; label: string }> = {
  done: { className: 'pill-green', label: '✓ done' },
  next: { className: 'pill-accent', label: '● current' },
  planned: { className: 'pill-amber', label: '○ planned' },
  stretch: { className: '', label: 'stretch' },
};

export function formatUpdated(iso: string): string | null {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

const TRACKS: { key: LabPhase['track']; heading: string }[] = [
  { key: 'build-out', heading: 'Build-out' },
  { key: 'planned', heading: 'Planned' },
  { key: 'stretch', heading: 'Stretch' },
];

export function ADLabProgress() {
  const { data, failed } = useLabStatus();

  const subtitle = (
    <>
      Read live from the{' '}
      <a href={adLab.guideBaseUrl} target="_blank" rel="noreferrer" className="text-accent underline-offset-2 hover:underline">
        AD lab guide
      </a>{' '}
      I build and document myself. Every phase links to its full write-up: commands, verify steps, and gotchas.
    </>
  );

  return (
    <Section
      id="ad-lab"
      eyebrow="Live · AD Lab"
      title="Active Directory lab, live status"
      subtitle={subtitle}
      contextCard="The identity layer every Windows MSP client runs on. AGDLP group nesting keeps access manageable as a client grows."
    >
      {!data && !failed && (
        <div className="text-ink-faint text-sm font-mono">Loading lab status...</div>
      )}

      {failed && (
        <div className="card p-5">
          <p className="text-sm text-ink-dim">
            Lab status is published in the AD lab guide.{' '}
            <a href={adLab.guideBaseUrl} target="_blank" rel="noreferrer" className="text-accent underline-offset-2 hover:underline">
              Open the guide
            </a>
            .
          </p>
        </div>
      )}

      {data && <Loaded data={data} />}

      {/* Static content: renders regardless of feed health (it does not depend on
          the fetch), tucked behind the site's standard disclosure. */}
      <details className="group mt-3">
        <summary className="card flex cursor-pointer list-none items-center justify-between p-4 hover:border-accent/40">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            What it taught me
          </span>
          <span className="font-mono text-xs text-ink-faint group-open:hidden">show ↓</span>
          <span className="hidden font-mono text-xs text-ink-faint group-open:inline">hide ↑</span>
        </summary>
        <div className="card mt-3 p-6">
          <p className="text-sm leading-relaxed text-ink-dim">{adLabReflection}</p>
        </div>
      </details>
    </Section>
  );
}

// Compact by default: a progress line, the phase happening now, and a one-line
// summary of what is done. The full per-phase list (every deep link intact) and
// the reflection sit behind the site's standard show/hide disclosures.
function Loaded({ data }: { data: LabStatus }) {
  const { buildOutDone, buildOutTotal } = data.summary;
  const updated = formatUpdated(data.generatedAt);
  const current = data.phases.filter((p) => p.status === 'next');
  const done = data.phases.filter((p) => p.status === 'done');

  return (
    <div>
      <p className="font-mono text-sm text-ink">
        <span className="text-accent">{buildOutDone}</span>
        <span className="text-ink-faint"> / {buildOutTotal} build-out phases done</span>
        {updated && <span className="text-ink-faint"> · updated {updated}</span>}
      </p>

      {current.length > 0 && (
        <div className="mt-4 space-y-1.5">
          {current.map((phase) => (
            <PhaseRow key={phase.id} phase={phase} guideBaseUrl={data.guideBaseUrl} />
          ))}
        </div>
      )}

      {done.length > 0 && (
        <p className="mt-4 text-sm leading-relaxed text-ink-dim">
          <span className="font-mono text-xs uppercase tracking-widest text-signal-green">✓ Done</span>{' '}
          {done.map((p) => p.title).join(' · ')}
        </p>
      )}

      <details className="group mt-6">
        <summary className="card flex cursor-pointer list-none items-center justify-between p-4 hover:border-accent/40">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            Full phase list ({data.phases.length} phases)
          </span>
          <span className="font-mono text-xs text-ink-faint group-open:hidden">show ↓</span>
          <span className="hidden font-mono text-xs text-ink-faint group-open:inline">hide ↑</span>
        </summary>
        <div className="mt-4 space-y-6">
          {TRACKS.map(({ key, heading }) => {
            const phases = data.phases.filter((p) => p.track === key);
            if (phases.length === 0) return null;
            return (
              <PhaseGroup key={key} heading={heading} phases={phases} guideBaseUrl={data.guideBaseUrl} />
            );
          })}
        </div>
      </details>

    </div>
  );
}

function PhaseRow({ phase, guideBaseUrl }: { phase: LabPhase; guideBaseUrl: string }) {
  return (
    <a
      href={`${guideBaseUrl}${phase.path}`}
      target="_blank"
      rel="noreferrer"
      className="card px-4 py-2 flex items-center gap-3 hover:border-accent/60 transition-colors"
    >
      <div className="font-mono text-xs text-ink-faint w-6 shrink-0 text-right">
        {String(phase.id).padStart(2, '0')}
      </div>
      <div className="flex-1 truncate text-sm text-ink">{phase.title}</div>
      <span className={`pill ${STATUS_PILL[phase.status].className} uppercase shrink-0`}>
        {STATUS_PILL[phase.status].label}
      </span>
    </a>
  );
}

function PhaseGroup({
  heading,
  phases,
  guideBaseUrl,
}: {
  heading: string;
  phases: LabPhase[];
  guideBaseUrl: string;
}) {
  return (
    <div>
      <h3 className="section-eyebrow mb-2">{heading}</h3>
      <ul className="grid gap-1.5 md:grid-cols-2">
        {phases.map((phase) => (
          <li key={phase.id}>
            <PhaseRow phase={phase} guideBaseUrl={guideBaseUrl} />
          </li>
        ))}
      </ul>
    </div>
  );
}
