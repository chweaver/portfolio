import { type Project } from '@/data/portfolio';

// Outcome-first project tile. Leads with the result, then a problem -> built ->
// result body, the stack, and an obvious link button out to the source (hidden
// when a project has no public URL). Reuses the design-system .card and .pill
// classes (no new primitives), so this stays a server component.
// `wide` makes a card span the full grid row (md:col-span-3) and lay its body
// out in columns, for a project that carries much more text than the others.
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

export function ProjectCard({
  title,
  outcome,
  status,
  problem,
  built,
  result,
  stack,
  repo,
  linkLabel,
  wide,
}: Project) {
  const s = STATUS_STYLE[status];
  const label = linkLabel ?? (repo ? repo.replace(/^https?:\/\//, '') : '');
  return (
    <div className={`card flex flex-col p-5${wide ? ' md:col-span-3' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight text-ink">{title}</h3>
        <span className={`pill ${s.className} shrink-0`}>{s.label}</span>
      </div>
      <div className="mt-1.5 font-mono text-xs leading-relaxed text-accent">{outcome}</div>

      <div
        className={`mt-4 flex-1 ${wide ? 'grid gap-x-8 gap-y-3 md:grid-cols-3' : 'flex flex-col gap-3'}`}
      >
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
      {repo && (
        <a
          href={repo}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 self-start rounded-md border border-accent/40 bg-accent/10 px-3 py-2 font-mono text-xs text-accent transition-colors hover:border-accent hover:bg-accent/20 hover:text-accent-glow"
        >
          {label}
          <span aria-hidden>↗</span>
        </a>
      )}
    </div>
  );
}
