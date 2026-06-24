import { Section } from './Section';
import { ProjectCard } from './ProjectCard';
import { projects } from '@/data/portfolio';

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Hands-on work, outcome first"
      contextCard="The homelab is the moat. Outcome first; the proof is in the sections below."
    >
      <div className="grid items-stretch gap-[18px] md:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>
    </Section>
  );
}
