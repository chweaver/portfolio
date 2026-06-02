import { Section } from './Section';
import { phases } from '@/data/portfolio';

export function Roadmap() {
  return (
    <Section
      id="roadmap"
      eyebrow="06 / Roadmap"
      title="Five phases: two complete, Active Directory in progress"
      subtitle="Phases 1 and 2 are built. Phase 3, the Active Directory domain, is in progress now and tracked live on this site. Phases 4 and 5 are designed, not built."
    >
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-accent/40 via-bg-border to-bg-border" />

        <div className="space-y-8">
          {phases.map((phase, i) => (
            <PhaseRow key={phase.id} phase={phase} side={i % 2 === 0 ? 'left' : 'right'} />
          ))}
        </div>
      </div>
    </Section>
  );
}

type Phase = (typeof phases)[number] & { note?: string };

function PhaseRow({ phase, side }: { phase: Phase; side: 'left' | 'right' }) {
  const complete = phase.status === 'complete';
  const inProgress = phase.status === 'in-progress';
  const statusClass = complete ? 'pill-green' : inProgress ? 'pill-accent' : 'pill-amber';
  const dotClass = complete ? 'bg-signal-green' : inProgress ? 'bg-accent' : 'bg-signal-amber';
  const statusLabel = complete ? '✓ complete' : inProgress ? '◐ in progress' : '○ planned';
  const itemMark = complete ? '✓' : inProgress ? '◐' : '○';
  const itemColor = complete ? 'text-signal-green' : inProgress ? 'text-accent' : 'text-signal-amber';

  return (
    <div className="relative md:grid md:grid-cols-2 md:gap-12 pl-12 md:pl-0">
      <div
        className={`absolute left-4 md:left-1/2 top-5 -translate-x-1/2 h-3 w-3 rounded-full ${dotClass} ring-4 ring-bg`}
      />

      <div className={side === 'left' ? 'md:text-right md:pr-8' : 'md:col-start-2 md:pl-8'}>
        <div
          className={`card p-6 ${
            side === 'left' ? 'md:ml-auto md:max-w-md md:text-left' : 'md:mr-auto md:max-w-md'
          }`}
        >
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="font-mono text-xs text-ink-faint">PHASE {phase.id}</div>
            <span className={`pill ${statusClass} uppercase`}>
              {statusLabel}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-ink">{phase.title}</h3>
          <div className="font-mono text-xs text-accent mt-1">{phase.period}</div>
          <p className="mt-3 text-sm text-ink-dim leading-relaxed">{phase.summary}</p>
          <ul className="mt-4 space-y-1.5 text-sm text-ink-dim">
            {phase.items.map((item) => (
              <li key={item} className="flex gap-2">
                <span className={`font-mono ${itemColor}`}>
                  {itemMark}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {phase.note && (
            <p className="mt-4 pt-3 border-t border-bg-border text-xs italic text-ink-faint">
              {phase.note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
