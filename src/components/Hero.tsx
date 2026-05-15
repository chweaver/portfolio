import { profile, summary } from '@/data/portfolio';

const STATS = [
  { label: 'VMs running', value: '4', sub: 'pfSense + 3 Linux' },
  { label: 'Subnets routed', value: '2', sub: 'LAN + LAB200' },
  { label: 'Firewall rules', value: '3', sub: 'pass / block / pass' },
  { label: 'Lab phase', value: '2/5', sub: 'Phase 3 in design' },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
      <div
        className="pointer-events-none absolute inset-x-0 -top-16 h-72 bg-[radial-gradient(closest-side,rgba(34,211,238,0.18),transparent_70%)] blur-3xl"
        aria-hidden
      />
      <div className="container-narrow relative">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
            {profile.location}
          </p>
          <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight text-ink leading-[1.05]">
            {profile.shortName}
          </h1>
          <p className="mt-4 font-mono text-sm text-accent">
            MSP-bound · pfSense lab operator · Python in production
          </p>
          <p className="mt-6 text-lg leading-relaxed text-ink-dim">{profile.tagline}</p>
          <p className="mt-4 text-ink-dim leading-relaxed">
            I&apos;m {profile.age}, based in {profile.location.split(',')[0]}, and applying to MSPs across the
            Indianapolis metro for a tier-1 service desk or technical alignment role. CompTIA A+ is on the
            books for May 2026 and CCNA is queued right behind it.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#lab"
              className="rounded-md bg-accent px-4 py-2.5 font-mono text-sm font-medium text-bg hover:bg-accent-glow transition-colors"
            >
              See the lab →
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-md border border-bg-border bg-bg-elevated px-4 py-2.5 font-mono text-sm text-ink hover:border-accent/40 hover:text-accent transition-colors"
            >
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-bg-border bg-bg-elevated px-4 py-2.5 font-mono text-sm text-ink hover:border-accent/40 hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-bg-border bg-bg-elevated px-4 py-2.5 font-mono text-sm text-ink hover:border-accent/40 hover:text-accent transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="card p-5">
              <div className="font-mono text-3xl text-accent">{s.value}</div>
              <div className="mt-1 text-sm text-ink">{s.label}</div>
              <div className="font-mono text-xs text-ink-faint">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal-green" />
              Built and verified
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-ink-dim">
              {summary.built.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="font-mono text-signal-green">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal-amber" />
              Designed, not yet built
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-ink-dim">
              {summary.planned.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="font-mono text-signal-amber">○</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 max-w-3xl text-sm italic text-ink-faint border-l-2 border-bg-border pl-4">
          {summary.honesty}
        </p>
      </div>
    </section>
  );
}
