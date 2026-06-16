import { Section } from './Section';
import { certs, certTierOrder, beyondFoundation, mspBreadth, aspirationalCerts } from '@/data/portfolio';

const STATUS_STYLE: Record<string, { label: string; cls: string; dot: string }> = {
  passed: { label: 'Passed', cls: 'pill-green', dot: 'bg-signal-green' },
  'in-progress': { label: 'In Progress', cls: 'pill-accent', dot: 'bg-accent' },
  scheduled: { label: 'Scheduled', cls: 'pill-green', dot: 'bg-signal-green' },
  queued: { label: 'Queued', cls: 'pill-accent', dot: 'bg-accent' },
  optional: { label: 'Optional', cls: 'pill-amber', dot: 'bg-signal-amber' },
  'long-term': { label: 'Long-term', cls: 'pill', dot: 'bg-ink-faint' },
};

function TierLabel({ children }: { children: string }) {
  return (
    <div className="font-mono text-xs uppercase tracking-widest text-ink-faint mb-3">{children}</div>
  );
}

export function Certifications() {
  return (
    <Section
      id="certs"
      eyebrow="07 / Certifications"
      title="A+ in progress, foundation next"
      subtitle="The full cert roadmap behind an MSP-ownership track, no padding: A+ Core 1 passed and Core 2 in progress, then a networking, cloud, and security foundation, then breadth over single-domain depth."
    >
      <div className="space-y-8">
        {certTierOrder.map((tier) => (
          <div key={tier}>
            <TierLabel>{tier}</TierLabel>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {certs
                .filter((cert) => cert.tier === tier)
                .map((cert) => {
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
          </div>
        ))}
      </div>

      <p className="mt-8 max-w-3xl text-sm text-ink-faint leading-relaxed">{beyondFoundation}</p>

      <div className="mt-4 space-y-8">
        <div>
          <TierLabel>{mspBreadth.heading}</TierLabel>
          <div className="card p-6">
            <ul className="space-y-2 text-sm text-ink-dim leading-relaxed">
              {mspBreadth.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="font-mono text-accent">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <TierLabel>{aspirationalCerts.heading}</TierLabel>
          <div className="card p-6">
            <ul className="space-y-2 text-sm text-ink-dim leading-relaxed">
              {aspirationalCerts.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="font-mono text-ink-faint">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 card p-6">
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
