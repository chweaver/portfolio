import { Section } from './Section';
import { readiness, howIWork } from '@/data/portfolio';

export function ReadyForWork() {
  return (
    <Section
      id="readiness"
      eyebrow="01 / Readiness"
      title="Ready for tier-1 MSP work"
      contextCard="The 20-second version: what I can do on day one, and how I work when I do it. Everything here traces to the lab proof below."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {readiness.map((r) => (
          <div key={r.kicker} className="card p-5">
            <div className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
              {r.kicker}
            </div>
            <p className="text-sm text-ink leading-relaxed">{r.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-accent/20 bg-accent/[0.04] p-6 md:p-7">
        <h3 className="font-mono text-xs uppercase tracking-widest text-accent">How I work</h3>
        <ol className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-5">
          {howIWork.map((point, i) => (
            <li key={point} className="flex gap-3 lg:flex-col lg:gap-2">
              <span className="font-mono text-xs text-ink-faint tabular-nums">
                0{i + 1}
              </span>
              <p className="text-sm text-ink-dim leading-snug">{point}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
