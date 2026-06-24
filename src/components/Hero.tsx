import { profile, summary, heroGlance } from '@/data/portfolio';
import { publicAsset } from '@/lib/paths';
import { HeroLabStat } from './HeroLabStat';
import { HeroStatusPill } from './HeroStatusPill';

const STATS = [
  { label: 'Subnets routed', value: '2', sub: 'LAN + LAB200' },
  { label: 'Firewall rules', value: '3', sub: 'pass / block / pass' },
  { label: 'Network lab VMs', value: '4', sub: 'pfSense + 3 Linux' },
];

export function Hero() {
  // scroll-mt-40 is larger than the sticky nav + lab strip stack, so a /#top load
  // (and the nav logo link) clamps to scroll 0 instead of landing slightly scrolled
  // down with the sticky bars overlapping the hero.
  return (
    <section id="top" className="scroll-mt-40 relative pt-14 pb-14 md:pt-20 md:pb-20">
      <div className="container-narrow relative">
        <div className="max-w-3xl">
          <div className="mb-7">
            <HeroStatusPill />
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.07em] font-medium text-ink-faint">
            <span className="text-accent" aria-hidden>
              &#9656;{' '}
            </span>
            {profile.shortName} · Indianapolis metro
          </p>
          <h1 className="mt-4 tracking-[-0.035em] text-ink-strong">
            <span className="block text-[2.1rem] md:text-[3.4rem] font-bold leading-[1.04]">
              {profile.headlineLead}
            </span>
            <span className="mt-4 block text-lg md:text-2xl font-normal leading-snug tracking-tight text-ink-dim">
              {profile.headlineRest}
            </span>
          </h1>
          {/* At-a-glance strip: the 5-second recruiter scan. Hairline-separated
              cells via a 1px gap over a border-colored background. */}
          <div className="mt-8 grid max-w-[880px] grid-cols-2 gap-px overflow-hidden rounded-xl border border-bg-border bg-bg-border md:grid-cols-4">
            {heroGlance.map((g) => (
              <div key={g.k} className="bg-bg-card px-4 py-3">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-faint">
                  {g.k}
                </div>
                <div className="mt-1 text-sm leading-snug text-ink">{g.v}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={publicAsset('/Charlie-Weaver-Resume.pdf')} download className="btn-primary">
              Download resume ↓
            </a>
            <a href={`mailto:${profile.email}`} className="btn-secondary">
              Contact Charlie
            </a>
            <a href="#ad-lab" className="btn-secondary">
              See lab proof →
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

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4">
          <HeroLabStat />
          {STATS.map((s) => (
            <div key={s.label} className="card p-5">
              <div className="font-mono text-4xl text-ink-strong tabular-nums leading-none">
                {s.value}
              </div>
              <div className="mt-2 text-sm font-medium text-ink">{s.label}</div>
              <div className="font-mono text-xs text-ink-faint">{s.sub}</div>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-sm text-ink-faint">{summary.honesty}</p>
      </div>
    </section>
  );
}
