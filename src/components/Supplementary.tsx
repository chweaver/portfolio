import { Section } from './Section';
import { tradingBot, bashApp, profile } from '@/data/portfolio';

export function Supplementary() {
  return (
    <Section
      id="supp"
      eyebrow="09 / Side work"
      title="Side projects"
      subtitle="Not lab work, but worth including because they show what I produce on my own time."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="pill pill-accent">Python</span>
          </div>
          <h3 className="text-lg font-semibold text-ink mt-2">{tradingBot.name}</h3>
          <p className="text-sm text-ink-dim mt-2 leading-relaxed">{tradingBot.lead}</p>
          <p className="text-sm text-ink-dim mt-2 leading-relaxed">{tradingBot.target}</p>
          <div className="mt-3 flex items-center gap-2 text-xs font-mono text-ink-faint">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal-amber" />
            <span>{tradingBot.repoStatus}</span>
            <a className="link ml-auto" href={`mailto:${profile.email}?subject=Automation%20project%20code%20review`}>
              request →
            </a>
          </div>

          <div className="mt-5">
            <div className="text-xs uppercase tracking-wider text-ink-faint font-mono mb-2">Components</div>
            <div className="space-y-3">
              {tradingBot.components.map((c) => (
                <div key={c.name} className="rounded-md border border-bg-border bg-bg-elevated/40 p-3">
                  <div className="font-mono text-sm text-accent">{c.name}</div>
                  <div className="text-sm text-ink-dim mt-1">{c.role}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <div className="text-xs uppercase tracking-wider text-ink-faint font-mono mb-2">MSP-relevant skills it shows</div>
            <ul className="space-y-1.5 text-sm text-ink-dim">
              {tradingBot.skills.map((s) => (
                <li key={s} className="flex gap-2">
                  <span className="font-mono text-accent">→</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-5 text-xs italic text-ink-faint border-l-2 border-bg-border pl-3">
            {tradingBot.honesty}
          </p>
        </div>

        <div className="card p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="pill pill-accent">Bash</span>
            <span className="pill">self-built</span>
          </div>
          <h3 className="text-lg font-semibold text-ink mt-2">{bashApp.name}</h3>
          <p className="text-sm text-ink-dim mt-2 leading-relaxed">{bashApp.pitch}</p>
          <div className="mt-3 flex items-center gap-2 text-xs font-mono text-ink-faint">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal-amber" />
            <span>{bashApp.repoStatus}</span>
            <a className="link ml-auto" href={`mailto:${profile.email}?subject=Bash%20learning%20app%20walkthrough`}>
              request →
            </a>
          </div>

          <div className="mt-5">
            <div className="text-xs uppercase tracking-wider text-ink-faint font-mono mb-2">Sample exercises</div>
            <div className="space-y-2.5">
              {bashApp.exercises.map((e) => (
                <details key={e.topic} className="group rounded-md border border-bg-border bg-bg-elevated/40">
                  <summary className="cursor-pointer list-none px-3 py-2 flex items-center justify-between">
                    <span className="font-mono text-sm text-accent">{e.topic}</span>
                    <span className="font-mono text-xs text-ink-faint group-open:rotate-90 transition-transform">
                      ›
                    </span>
                  </summary>
                  <div className="px-3 pb-3 text-sm text-ink-dim border-t border-bg-border pt-2">
                    {e.sample}
                  </div>
                </details>
              ))}
            </div>
          </div>

          <p className="mt-auto pt-5 text-xs italic text-ink-faint border-l-2 border-bg-border pl-3">
            Not original computer science. A practical drill book with the lab as the consistent backdrop.
            Builds muscle memory for the commands that come up on tier-1 Linux tickets.
          </p>
        </div>
      </div>
    </Section>
  );
}
