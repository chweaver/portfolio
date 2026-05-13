import { Section } from './Section';
import { certs } from '@/data/portfolio';

const STATUS_STYLE: Record<string, { label: string; cls: string; dot: string }> = {
  scheduled: { label: 'Scheduled', cls: 'pill-green', dot: 'bg-signal-green' },
  queued: { label: 'Queued', cls: 'pill-accent', dot: 'bg-accent' },
  optional: { label: 'Optional', cls: 'pill-amber', dot: 'bg-signal-amber' },
  'long-term': { label: 'Long-term', cls: 'pill', dot: 'bg-ink-faint' },
};

export function Certifications() {
  return (
    <Section
      id="certs"
      eyebrow="07 / Certifications"
      title="A+, then CCNA, then deeper"
      subtitle="Three certs in the near to mid term, one more in the long term, security as the secondary specialization. The cert path is deliberate: network and security depth is the long game, not cloud breadth."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {certs.map((cert) => {
          const status = STATUS_STYLE[cert.status];
          return (
            <div key={cert.name} className="card p-5 flex flex-col">
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className={`pill ${status.cls}`}>
                  <span className={`inline-block h-1.5 w-1.5 rounded-full ${status.dot}`} />
                  {status.label}
                </span>
                <span className="font-mono text-xs text-ink-faint">{cert.target}</span>
              </div>
              <h3 className="text-lg font-semibold text-ink">{cert.name}</h3>
              <div className="font-mono text-xs text-accent mt-1">{cert.code}</div>
              <p className="mt-3 text-sm text-ink-dim leading-relaxed flex-1">{cert.why}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 card p-6">
        <div className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
          A+ study plan — 8-week ramp into May 2026
        </div>
        <p className="text-sm text-ink-dim leading-relaxed">
          The lab covers a chunk of the blueprint, so study time is weighted toward what it doesn&apos;t: mobile
          devices, printers, Windows-specific OS features, and software troubleshooting. Resources: Professor
          Messer + Mike Meyers book + Jason Dion practice tests. Target before booking: consistent 85%+ on
          practice exams.
        </p>
      </div>
    </Section>
  );
}
