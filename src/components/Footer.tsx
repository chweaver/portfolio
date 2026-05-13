import { profile } from '@/data/portfolio';

export function Footer() {
  return (
    <footer className="border-t border-bg-border mt-20 py-10 text-sm text-ink-faint">
      <div className="container-narrow flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="font-mono">
          <span className="text-ink-dim">{profile.shortName}</span>
          <span className="mx-2 text-ink-faint">·</span>
          <span>{profile.location}</span>
        </div>
        <div className="flex gap-4 font-mono">
          <a className="hover:text-accent" href={`mailto:${profile.email}`}>{profile.email}</a>
          <a className="hover:text-accent" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="hover:text-accent" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
      <div className="container-narrow mt-4 font-mono text-xs text-ink-faint">
        Portfolio v{profile.docVersion} · {profile.labPhase}
      </div>
    </footer>
  );
}
