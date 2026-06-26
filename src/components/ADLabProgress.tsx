'use client';

import { Section } from './Section';
import { adLab, adLabReflection } from '@/data/portfolio';
import { useLabStatus, type LabPhase, type LabStatus, type PhaseStatus } from '@/lib/useLabStatus';

const STATUS_PILL: Record<PhaseStatus, { className: string; label: string }> = {
  done: { className: 'pill-green', label: '✓ done' },
  next: { className: 'pill-accent', label: '● current' },
  planned: { className: 'pill-amber', label: '○ planned' },
  stretch: { className: '', label: 'stretch' },
};

export function ADLabProgress() {
  const { data, failed } = useLabStatus();

  const subtitle = (
    <>
      Read live from the{' '}
      <a href={adLab.guideBaseUrl} target="_blank" rel="noreferrer" className="text-accent underline-offset-2 hover:underline">
        AD lab guide
      </a>{' '}
      I build and document myself. It updates on every push to the guide.
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

      <div className="card mt-10 p-6">
        <div className="section-eyebrow mb-3">What it taught me</div>
        <p className="text-sm leading-relaxed text-ink-dim">{adLabReflection}</p>
      </div>
    </Section>
  );
}

function formatUpdated(iso: string): string | null {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

function Loaded({ data }: { data: LabStatus }) {
  const { buildOutDone, buildOutTotal } = data.summary;
  const pct = buildOutTotal === 0 ? 0 : Math.round((buildOutDone / buildOutTotal) * 100);
  const buildOut = data.phases.filter((p) => p.track === 'build-out');
  const stretch = data.phases.filter((p) => p.track === 'stretch');
  const updated = formatUpdated(data.generatedAt);

  return (
    <div className="space-y-10">
      <div className="card p-6">
        <div className="flex items-baseline justify-between gap-4 mb-3">
          <div className="section-eyebrow">Build-out progress</div>
          <div className="font-mono text-sm text-ink">
            <span className="text-accent">{buildOutDone}</span>
            <span className="text-ink-faint"> / {buildOutTotal} phases</span>
          </div>
        </div>
        <div
          className="h-2 w-full rounded-full bg-bg-elevated overflow-hidden"
          role="progressbar"
          aria-label="AD build-out progress"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext={`${pct}% complete, ${buildOutDone} of ${buildOutTotal} phases`}
        >
          <div className="h-full bg-accent transition-all" style={{ width: `${pct}%` }} />
        </div>
        {updated && (
          <p className="mt-3 font-mono text-xs text-ink-faint">Last updated {updated}</p>
        )}
      </div>

      <PhaseGroup heading="Build-out" phases={buildOut} guideBaseUrl={data.guideBaseUrl} />
      {stretch.length > 0 && (
        <PhaseGroup heading="Stretch" phases={stretch} guideBaseUrl={data.guideBaseUrl} />
      )}
    </div>
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
      <h3 className="section-eyebrow mb-3">{heading}</h3>
      <ul className="grid gap-2 md:grid-cols-2">
        {phases.map((phase) => (
          <li key={phase.id}>
            <a
              href={`${guideBaseUrl}${phase.path}`}
              target="_blank"
              rel="noreferrer"
              className="card p-4 flex items-center gap-4 hover:border-accent/60 transition-colors"
            >
              <div className="font-mono text-xs text-ink-faint w-16 shrink-0">
                PHASE {String(phase.id).padStart(2, '0')}
              </div>
              <div className="flex-1 text-sm text-ink">{phase.title}</div>
              <span className={`pill ${STATUS_PILL[phase.status].className} uppercase shrink-0`}>
                {STATUS_PILL[phase.status].label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
