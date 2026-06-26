import { heroCertRoadmap } from '@/data/portfolio';

// Dot treatment per state. `next` (CCNA) is a hollow accent ring to read as the
// upcoming network-engineering milestone; `current` pulses; `done` is filled green.
const DOT: Record<string, string> = {
  done: 'bg-signal-green border-signal-green',
  current: 'bg-accent border-accent',
  next: 'bg-bg-card border-accent',
  later: 'bg-bg-card border-bg-border2',
};

export function HeroCertRoadmap() {
  const { caption, steps } = heroCertRoadmap;

  return (
    <div className="card p-5">
      <div className="section-eyebrow">Cert roadmap</div>
      <p className="mt-1 text-xs text-ink-faint">{caption}</p>

      <ol className="relative mt-5 space-y-4">
        {steps.map((s, i) => (
          <li key={s.name} className="relative flex gap-3">
            {i < steps.length - 1 && (
              <span
                className="absolute left-[5px] top-4 -bottom-3 w-px bg-bg-border"
                aria-hidden
              />
            )}
            <span
              className={`relative z-10 mt-[5px] h-[11px] w-[11px] shrink-0 rounded-full border-2 ${DOT[s.state]} ${s.state === 'current' ? 'animate-pulse-slow' : ''}`}
              aria-hidden
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-sm font-semibold text-ink-strong">{s.name}</span>
                {s.code && (
                  <span className="font-mono text-[10.5px] text-ink-faint">{s.code}</span>
                )}
                {'flag' in s && s.flag && (
                  <span className="rounded-full bg-accent-wash px-2 py-px font-mono text-[9.5px] uppercase tracking-[0.08em] text-accent-dim">
                    {s.flag}
                  </span>
                )}
              </div>
              <div className="mt-0.5 text-xs text-ink-dim">{s.note}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
