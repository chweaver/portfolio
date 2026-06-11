import { Section } from './Section';
import { labEnvironment } from '@/data/portfolio';

export function LabOverview() {
  return (
    <Section
      id="lab"
      eyebrow="05 / Lab environment"
      title="A safe place to practice MSP tasks"
      contextCard={labEnvironment.purpose}
    >
      <div className="card p-6">
        <div className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
          Platforms in daily use
        </div>
        <div className="flex flex-wrap gap-2">
          {labEnvironment.platforms.map((p) => (
            <span key={p} className="pill">
              {p}
            </span>
          ))}
        </div>
        <p className="mt-5 border-t border-bg-border pt-4 font-mono text-xs text-ink-faint">
          {labEnvironment.hardwareNote}
        </p>
      </div>
    </Section>
  );
}
