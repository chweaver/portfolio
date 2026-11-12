import { Section } from './Section';
import { ProjectCard } from './ProjectCard';
import { projects, outsideLab } from '@/data/portfolio';

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Hands-on work, outcome first"
      contextCard="The homelab is the proof. The detail is in the sections below."
    >
      <div className="grid items-stretch gap-[18px] md:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>

      {/* Support work for real people, outside the lab. A compact strip, not a
          project card: it has no problem / built / result shape. */}
      <div className="card mt-[18px] p-5" style={{ borderTop: '3px solid #1e8a5a' }}>
        <div className="section-eyebrow">{outsideLab.eyebrow}</div>
        <h3 className="mt-1 text-lg font-semibold tracking-tight text-ink-strong">{outsideLab.title}</h3>
        <dl className="mt-4 grid gap-4 md:grid-cols-[1fr_2fr]">
          {outsideLab.items.map((item) => (
            <div key={item.k}>
              <dt className="mb-1 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">{item.k}</dt>
              <dd className="text-sm leading-relaxed text-ink-dim">{item.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
