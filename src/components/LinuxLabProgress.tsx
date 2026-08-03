'use client';

import { Section } from './Section';
import { linuxLab } from '@/data/portfolio';
import {
  useLabStatus,
  type LinuxLabEntry,
  type LinuxLabStatus,
} from '@/lib/useLabStatus';
import { STATUS_PILL, formatUpdated } from './ADLabProgress';

export function LinuxLabProgress() {
  const { data, failed } = useLabStatus<LinuxLabStatus>(linuxLab.statusUrl);

  const subtitle = (
    <>
      Read live from the{' '}
      <a href={linuxLab.guideBaseUrl} target="_blank" rel="noreferrer" className="text-accent underline-offset-2 hover:underline">
        Linux lab guide
      </a>{' '}
      I build and document myself. Every lab links to its full write-up: commands, verify steps, and gotchas.
    </>
  );

  return (
    <Section
      id="linux-lab"
      eyebrow="Live · Linux Lab"
      title="Linux lab, live status"
      subtitle={subtitle}
      contextCard="Bridging Linux into the Windows domain the way a real mixed network runs, then operating it: logs, metrics, patches."
    >
      {!data && !failed && (
        <div className="text-ink-faint text-sm font-mono">Loading lab status...</div>
      )}

      {failed && (
        <div className="card p-5">
          <p className="text-sm text-ink-dim">
            Lab status is published in the Linux lab guide.{' '}
            <a href={linuxLab.guideBaseUrl} target="_blank" rel="noreferrer" className="text-accent underline-offset-2 hover:underline">
              Open the guide
            </a>
            .
          </p>
        </div>
      )}

      {data && <Loaded data={data} />}
    </Section>
  );
}

// Compact on purpose: one row per lab, not one per phase. The
// per-phase breakdown of the lab in progress sits behind the site's standard
// show/hide disclosure, deep-linked to each phase's anchor in the guide.
function Loaded({ data }: { data: LinuxLabStatus }) {
  const { phasesDone, totalPhases, labsComplete, totalLabs } = data.summary;
  const updated = formatUpdated(data.generatedAt);
  const labs = [...data.labs].sort((a, b) => a.order - b.order);
  const currentLab = labs.find((l) => l.status === 'next');
  const currentPhases = currentLab
    ? data.phases.filter((p) => p.labId === currentLab.id)
    : [];

  return (
    <div>
      <p className="font-mono text-sm text-ink">
        <span className="text-accent">{phasesDone}</span>
        <span className="text-ink-faint"> / {totalPhases} phases done</span>
        <span className="text-ink-faint"> · {labsComplete}/{totalLabs} labs complete</span>
        {updated && <span className="text-ink-faint"> · updated {updated}</span>}
      </p>

      <ul className="mt-4 grid gap-1.5 md:grid-cols-2">
        {labs.map((lab) => (
          <li key={lab.id}>
            <LabRow lab={lab} guideBaseUrl={data.guideBaseUrl} />
          </li>
        ))}
      </ul>

      {currentLab && currentPhases.length > 0 && (
        <details className="group mt-6">
          <summary className="card flex cursor-pointer list-none items-center justify-between p-4 hover:border-accent/40">
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              Inside lab {String(currentLab.order).padStart(2, '0')}: {currentLab.title}
            </span>
            <span className="font-mono text-xs text-ink-faint group-open:hidden">show ↓</span>
            <span className="hidden font-mono text-xs text-ink-faint group-open:inline">hide ↑</span>
          </summary>
          <ul className="mt-3 space-y-1.5">
            {currentPhases.map((phase) => (
              <li key={phase.id}>
                <a
                  href={`${data.guideBaseUrl}${currentLab.path}#${phase.anchor}`}
                  target="_blank"
                  rel="noreferrer"
                  className="card px-4 py-2 flex items-center gap-3 hover:border-accent/60 transition-colors"
                >
                  <div className="flex-1 truncate text-sm text-ink">{phase.title}</div>
                  <span className={`pill ${STATUS_PILL[phase.status].className} uppercase shrink-0`}>
                    {STATUS_PILL[phase.status].label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}

function LabRow({ lab, guideBaseUrl }: { lab: LinuxLabEntry; guideBaseUrl: string }) {
  return (
    <a
      href={`${guideBaseUrl}${lab.path}`}
      target="_blank"
      rel="noreferrer"
      className="card px-4 py-2 flex items-center gap-3 hover:border-accent/60 transition-colors"
    >
      <div className="font-mono text-xs text-ink-faint w-6 shrink-0 text-right">
        {String(lab.order).padStart(2, '0')}
      </div>
      <div className="flex-1 truncate text-sm text-ink">{lab.title}</div>
      <div className="font-mono text-xs text-ink-faint shrink-0 tabular-nums">
        {lab.phasesDone}/{lab.phasesTotal}
      </div>
      <span className={`pill ${STATUS_PILL[lab.status].className} uppercase shrink-0`}>
        {STATUS_PILL[lab.status].label}
      </span>
    </a>
  );
}
