import { profile, summary } from '@/data/portfolio';
import { publicAsset } from '@/lib/paths';
import { HeroLabStat } from './HeroLabStat';

const STATS = [
  { label: 'Subnets routed', value: '2', sub: 'LAN + LAB200' },
  { label: 'Firewall rules', value: '3', sub: 'pass / block / pass' },
  { label: 'Network lab VMs', value: '4', sub: 'pfSense + 3 Linux' },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-16 pb-16 md:pt-24 md:pb-24">
      <div
        className="pointer-events-none absolute inset-x-0 -top-16 h-72 bg-[radial-gradient(closest-side,rgba(34,211,238,0.18),transparent_70%)] blur-3xl"
        aria-hidden
      />
      <div className="container-narrow relative">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
            {profile.shortName} · {profile.location}
          </p>
          <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-ink leading-[1.12]">
            {profile.headline}
          </h1>
          <p className="mt-5 font-mono text-sm accent-line">
            pfSense network lab · live Active Directory domain · CompTIA A+ Core 1 passed
          </p>
          <p className="mt-5 text-ink-dim leading-relaxed">
            Carmel-based, applying across the Indianapolis metro for a tier-1 service desk or
            technical alignment role. Passed CompTIA A+ Core 1 on May 18, 2026. Core 2 follows in
            mid-June and CCNA is queued behind it. The lab below is built to mirror the
            environments an MSP team manages: subnets, firewall policy, multi-distro Linux, and
            domain infrastructure.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#lab" className="btn-primary">
              See the lab →
            </a>
            <a href={`mailto:${profile.email}`} className="btn-secondary">
              Email
            </a>
            <a href={publicAsset('/Charlie-Weaver-Resume.pdf')} download className="btn-secondary">
              Resume (PDF) ↓
            </a>
            <span className="flex items-center gap-4 pl-1 text-sm">
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link">
                LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="link">
                GitHub
              </a>
            </span>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-4">
          <HeroLabStat />
          {STATS.map((s) => (
            <div key={s.label} className="card p-5">
              <div className="font-mono text-5xl md:text-6xl text-ink tabular-nums leading-none">
                {s.value}
              </div>
              <div className="mt-2 text-sm text-ink">{s.label}</div>
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
