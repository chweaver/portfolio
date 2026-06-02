import { Section } from './Section';
import { careerStages, profile } from '@/data/portfolio';

export function Career() {
  return (
    <Section
      id="career"
      eyebrow="08 / Trajectory"
      title="Timeline"
      subtitle="The gap between 'tier-1 service desk' and 'senior engineer' is real, not aspirational fluff. The long horizon is here because honest trajectory beats vague 'growth-minded' language, and because it explains why the cert path goes A+ → CCNA → CCNP → security, not A+ → cloud."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {careerStages.map((stage) => (
          <div key={stage.title} className="card p-6">
            <h3 className="text-lg font-semibold text-ink">{stage.title}</h3>
            <div className="font-mono text-xs text-accent mt-1">{stage.horizon}</div>

            {stage.roles.length > 0 && (
              <div className="mt-4">
                <div className="text-xs uppercase tracking-wider text-ink-faint font-mono mb-2">Target roles</div>
                <div className="flex flex-wrap gap-1.5">
                  {stage.roles.map((r) => (
                    <span key={r} className="pill">{r}</span>
                  ))}
                </div>
              </div>
            )}

            {stage.bringing.length > 0 && (
              <div className="mt-4">
                <div className="text-xs uppercase tracking-wider text-ink-faint font-mono mb-2">Bringing</div>
                <ul className="space-y-1.5 text-sm text-ink-dim">
                  {stage.bringing.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="font-mono text-signal-green">→</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {stage.learning.length > 0 && (
              <div className="mt-4">
                <div className="text-xs uppercase tracking-wider text-ink-faint font-mono mb-2">Learning fast</div>
                <ul className="space-y-1.5 text-sm text-ink-dim">
                  {stage.learning.map((l) => (
                    <li key={l} className="flex gap-2">
                      <span className="font-mono text-signal-amber">○</span>
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="mt-8 max-w-2xl text-sm text-ink-dim">
        That is the path. The near-term ask is simple: a tier-1 seat where I can start shipping tickets.{' '}
        <a href={`mailto:${profile.email}`} className="link">
          Email me
        </a>{' '}
        and let us talk.
      </p>
    </Section>
  );
}
