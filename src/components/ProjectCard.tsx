import { type Project } from '@/data/portfolio';

// Outcome-first project tile. Leads with the result, then a consistent
// problem -> built -> result body and the stack. Reuses the design-system
// .card and .pill classes (no new primitives): the .card class already carries
// the hover border, glow, and reduced-motion-gated lift, so this stays a server
// component. Status maps to an existing pill variant.
const STATUS_STYLE: Record<Project['status'], { className: string; label: string }> = {
  done: { className: 'pill-green', label: 'done' },
  'in-progress': { className: 'pill-accent', label: 'in progress' },
  planned: { className: 'pill-amber', label: 'planned' },
};

function Field({ label, body }: { label: string; body: string }) {
  if (!body) return null;
  return (
    <div>
      <div className="mb-1 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">{label}</div>
      <div className="text-sm leading-relaxed text-ink-dim">{body}</div>
    </div>
  );
}

export function ProjectCard({ title, outcome, status, problem, built, result, stack, repo }: Project) {
  const s = STATUS_STYLE[status];
  const repoLabel = repo.replace(/^https?:\/\//, '');
  return (
    <div className="card flex flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight text-ink">{title}</h3>
        <span className={`pill ${s.className} shrink-0`}>{s.label}</span>
      </div>
      <div className="mt-1.5 font-mono text-xs leading-relaxed text-accent">{outcome}</div>

      <div className="mt-4 flex flex-1 flex-col gap-3">
        <Field label="Problem" body={problem} />
        <Field label="Built" body={built} />
        <Field label="Result" body={result} />
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-bg-border pt-4">
        {stack.map((tag) => (
          <span key={tag} className="pill">
            {tag}
          </span>
        ))}
      </div>
      <a
        href={repo}
        target="_blank"
        rel="noreferrer"
        className="mt-3 font-mono text-[11px] text-ink-faint transition-colors hover:text-accent"
      >
        {repoLabel}
      </a>
    </div>
  );
}
