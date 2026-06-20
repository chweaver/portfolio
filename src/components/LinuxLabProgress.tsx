'use client';

import { Section } from './Section';
import { linuxLab } from '@/data/portfolio';
import {
  useLabStatus,
  type LinuxLabStatus,
  type LinuxLabEntry,
  type LinuxPhase,
  type PhaseStatus,
} from '@/lib/useLabStatus';

const STATUS_PILL: Record<PhaseStatus, { className: string; label: string }> = {
  done: { className: 'pill-green', label: '✓ done' },
  next: { className: 'pill-accent', label: '● current' },
  planned: { className: 'pill-amber', label: '○ not started' },
  stretch: { className: '', label: 'stretch' },
};

const PHASE_DOT: Record<PhaseStatus, string> = {
  done: 'bg-signal-green',
  next: 'bg-accent',
  planned: 'bg-bg-border',
  stretch: 'bg-bg-border',
};

export function LinuxLabProgress() {
  const { data, failed } = useLabStatus<LinuxLabStatus>(linuxLab.statusUrl);

  const subtitle = (
    <>
      Four chained Linux labs (SSH hardening, an AD-joined Samba server, a BIND9 resolver, and automated
      rsync backups) that bridge Linux into the same{' '}
      <a href="https://chweaver.github.io/ad-lab-guide/" target="_blank" rel="noreferrer" className="text-accent underline-offset-2 hover:underline">
        Active Directory domain
      </a>
      . The status below reads live from the{' '}
      <a href={linuxLab.guideBaseUrl} target="_blank" rel="noreferrer" className="text-accent underline-offset-2 hover:underline">
        Linux lab guide
      </a>
      , the same way the AD lab does, and updates whenever I push the guide.
    </>
  );

  return (
    <Section
      id="linux-lab"
      eyebrow="Live · Linux Lab"
      title="Linux homelab, live status"
      subtitle={subtitle}
      contextCard="One coherent multi-server build that mirrors a real small-business network: keys before passwords, a file server that authenticates against AD, a resolver that forwards corp.lab to the domain controller, and restore-tested backups over that hardened SSH. Not four disconnected tutorials, a dependency chain."
    >
      {!data && !failed && <div className="text-ink-faint text-sm font-mono">Loading lab status...</div>}

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

function formatUpdated(iso: string): string | null {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

function Loaded({ data }: { data: LinuxLabStatus }) {
  const { phasesDone, totalPhases, overallPct, labsComplete, totalLabs } = data.summary;
  const updated = formatUpdated(data.generatedAt);

  return (
    <div className="space-y-8">
      <div className="card p-6">
        <div className="flex items-baseline justify-between gap-4 mb-3">
          <div className="section-eyebrow">Overall build progress</div>
          <div className="font-mono text-sm text-ink">
            <span className="text-accent">{phasesDone}</span>
            <span className="text-ink-faint"> / {totalPhases} phases</span>
            <span className="text-ink-faint"> · {labsComplete}/{totalLabs} labs</span>
          </div>
        </div>
        <div className="h-2 w-full rounded-full bg-bg-elevated overflow-hidden">
          <div className="h-full bg-accent transition-all" style={{ width: `${overallPct}%` }} aria-label={`${overallPct}% complete`} />
        </div>
        {updated && <p className="mt-3 font-mono text-xs text-ink-faint">Last updated {updated}</p>}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {data.labs.map((lab, i) => (
          <LabCard
            key={lab.id}
            lab={lab}
            index={i}
            phases={data.phases.filter((p) => p.labId === lab.id)}
            guideBaseUrl={data.guideBaseUrl}
          />
        ))}
      </div>
    </div>
  );
}

function LabCard({
  lab,
  index,
  phases,
  guideBaseUrl,
}: {
  lab: LinuxLabEntry;
  index: number;
  phases: LinuxPhase[];
  guideBaseUrl: string;
}) {
  const pill = STATUS_PILL[lab.status];
  return (
    <div className="card p-5 flex flex-col">
      <div className="flex items-center justify-between gap-3 mb-1">
        <span className="font-mono text-xs text-ink-faint">LAB {String(index + 1).padStart(2, '0')}</span>
        <span className={`pill ${pill.className} uppercase shrink-0`}>{pill.label}</span>
      </div>
      <a
        href={`${guideBaseUrl}${lab.path}`}
        target="_blank"
        rel="noreferrer"
        className="text-base font-semibold text-ink hover:text-accent transition-colors"
      >
        {lab.title}
      </a>

      <div className="mt-3 h-1.5 w-full rounded-full bg-bg-elevated overflow-hidden">
        <div className="h-full bg-accent transition-all" style={{ width: `${lab.pct}%` }} />
      </div>
      <div className="mt-1.5 font-mono text-[11px] text-ink-faint">
        {lab.phasesDone}/{lab.phasesTotal} phases
      </div>

      <ul className="mt-4 space-y-1.5">
        {phases.map((p) => (
          <li key={p.id} className="flex items-center gap-2.5">
            <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${PHASE_DOT[p.status]}`} />
            <a
              href={`${guideBaseUrl}${lab.path}#${p.anchor}`}
              target="_blank"
              rel="noreferrer"
              className={`text-[13px] hover:text-accent transition-colors ${p.status === 'done' ? 'text-ink' : 'text-ink-dim'}`}
            >
              {p.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
