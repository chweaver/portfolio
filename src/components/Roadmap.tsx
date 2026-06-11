import { Section } from './Section';
import { nearTermPlan, planClose } from '@/data/portfolio';

const STATUS_MARK: Record<string, { mark: string; cls: string; pill: string; label: string }> = {
  'in-progress': { mark: '◐', cls: 'text-accent', pill: 'pill-accent', label: 'in progress' },
  planned: { mark: '○', cls: 'text-signal-amber', pill: 'pill-amber', label: 'planned' },
};

export function Roadmap() {
  return (
    <Section
      id="plan"
      eyebrow="08 / Plan"
      title="The near-term plan"
      contextCard={planClose}
    >
      <ol className="space-y-3 max-w-3xl">
        {nearTermPlan.map((step, i) => {
          const status = STATUS_MARK[step.status];
          return (
            <li key={step.label} className="card p-5 flex items-start gap-4">
              <span className="font-mono text-xs text-ink-faint tabular-nums pt-1">
                0{i + 1}
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-ink">{step.label}</h3>
                  <span className={`pill ${status.pill} uppercase`}>
                    <span className={`font-mono ${status.cls}`}>{status.mark}</span>
                    {status.label}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-ink-dim leading-relaxed">{step.detail}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <p className="mt-6 max-w-3xl font-mono text-xs text-ink-faint">
        Stretch lab goals (nested Proxmox, Packet Tracer and Eve-NG phases) continue in the
        background and ramp with CCNA study.
      </p>
    </Section>
  );
}
