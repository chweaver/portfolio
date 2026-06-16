import { Section } from './Section';
import { certs, laterCerts } from '@/data/portfolio';

const STATUS_STYLE: Record<string, { label: string; cls: string; dot: string }> = {
  passed: { label: 'Passed', cls: 'pill-green', dot: 'bg-signal-green' },
  'in-progress': { label: 'In Progress', cls: 'pill-accent', dot: 'bg-accent' },
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
      title="A+ now, foundation next"
      subtitle="The cert path behind an MSP-ownership track, no padding: A+ in hand, then a networking, cloud, and security foundation, with breadth over single-domain depth."
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

      <p className="mt-6 max-w-3xl text-sm text-ink-faint">{laterCerts}</p>

      <div className="mt-6 card p-6">
        <div className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
          A+ Core 2: on track for June 2026
        </div>
        <p className="text-sm text-ink-dim leading-relaxed">
          Core 1 (passed May 18, 2026) covered hardware, networking, and virtualization, most of which the lab
          handled directly. Core 2 study targets what the lab does not: Windows-specific OS, mobile, macOS, and
          software troubleshooting. Prep: Professor Messer, the Mike Meyers book, and Jason Dion practice tests,
          booking once practice scores hold above 85%.
        </p>
      </div>
    </Section>
  );
}
