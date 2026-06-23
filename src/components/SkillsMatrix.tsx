'use client';

import { useState, useMemo } from 'react';
import { Section } from './Section';
import {
  skillsMatrix,
  skillsOverview,
  certCoverage,
  coverageMethodology,
  certs,
  certTierOrder,
  type SkillRow,
  type CoverageLevel,
} from '@/data/portfolio';

type Filter = 'all' | SkillRow['category'];

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'hardware', label: 'Hardware' },
  { key: 'network', label: 'Network' },
  { key: 'security', label: 'Security' },
  { key: 'ops', label: 'Ops' },
  { key: 'cisco', label: 'Cisco' },
];

const CERT_STATUS: Record<string, { label: string; cls: string; dot: string }> = {
  passed: { label: 'Passed', cls: 'pill-green', dot: 'bg-signal-green' },
  'in-progress': { label: 'In progress', cls: 'pill-accent', dot: 'bg-accent' },
  scheduled: { label: 'Scheduled', cls: 'pill-green', dot: 'bg-signal-green' },
  queued: { label: 'Queued', cls: 'pill-accent', dot: 'bg-accent' },
  optional: { label: 'Optional', cls: 'pill-amber', dot: 'bg-signal-amber' },
  'long-term': { label: 'Long-term', cls: 'pill', dot: 'bg-ink-faint' },
};

export function SkillsMatrix() {
  const [filter, setFilter] = useState<Filter>('all');

  const rows = useMemo(
    () => (filter === 'all' ? skillsMatrix : skillsMatrix.filter((r) => r.category === filter)),
    [filter]
  );

  return (
    <Section
      id="skills"
      eyebrow="Skills & certifications"
      title="What I can work with"
      contextCard="Each lab element maps to A+, Network+, and CCNA objectives. The full table is one click below."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {skillsOverview.map((col) => (
          <div key={col.column} className="card p-5">
            <div className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
              {col.column}
            </div>
            <ul className="space-y-1.5 text-sm text-ink-dim">
              {col.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="font-mono text-accent">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <details className="group mt-6">
        <summary className="card flex cursor-pointer list-none items-center justify-between p-4 hover:border-accent/40">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            Cert mapping and exam coverage (technical detail)
          </span>
          <span className="font-mono text-xs text-ink-faint group-open:hidden">show ↓</span>
          <span className="hidden font-mono text-xs text-ink-faint group-open:inline">hide ↑</span>
        </summary>

        <div className="mt-6">
          <div className="flex flex-wrap gap-2 mb-6">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                  filter === f.key
                    ? 'bg-accent text-bg'
                    : 'border border-bg-border bg-bg-elevated text-ink-dim hover:text-accent hover:border-accent/40'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-bg-elevated/60 text-left">
                  <tr className="text-ink-faint font-mono text-xs uppercase tracking-wider">
                    <th className="px-4 py-3 font-normal min-w-[240px]">Lab element</th>
                    <th className="px-4 py-3 font-normal">A+</th>
                    <th className="px-4 py-3 font-normal">Net+</th>
                    <th className="px-4 py-3 font-normal">CCNA</th>
                    <th className="px-4 py-3 font-normal min-w-[260px]">MSP application</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr
                      key={row.element}
                      className={`${i % 2 === 0 ? 'bg-bg-card/40' : ''} hover:bg-accent/5 transition-colors`}
                    >
                      <td className="px-4 py-3 text-ink align-top">{row.element}</td>
                      <td className="px-4 py-3 font-mono text-xs text-ink-dim align-top">{row.aplus}</td>
                      <td className="px-4 py-3 font-mono text-xs text-ink-dim align-top">{row.netplus}</td>
                      <td className="px-4 py-3 font-mono text-xs text-ink-dim align-top">{row.ccna}</td>
                      <td className="px-4 py-3 text-ink-dim align-top">{row.msp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8">
            <div className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
              Lab coverage of each exam blueprint
            </div>
            <p className="text-xs text-ink-faint mb-4 max-w-3xl">{coverageMethodology}</p>
            <div className="space-y-3">
              {certCoverage.map((c) => (
                <div key={c.exam} className="card p-4">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="font-mono text-sm text-ink">{c.exam}</div>
                    <CoveragePill level={c.level} band={c.band} />
                  </div>
                  <div className="mt-2 text-xs text-ink-faint leading-relaxed">{c.notes}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </details>

      {/* Certifications, folded into this section */}
      <div className="mt-12 space-y-6">
        {certTierOrder.map((tier) => (
          <div key={tier}>
            <div className="font-mono text-xs uppercase tracking-widest text-ink-faint mb-3">{tier}</div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {certs
                .filter((cert) => cert.tier === tier)
                .map((cert) => {
                  const status = CERT_STATUS[cert.status];
                  return (
                    <div key={cert.name} className="card p-5 flex flex-col">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <span className={`pill ${status.cls}`}>
                          <span className={`inline-block h-1.5 w-1.5 rounded-full ${status.dot}`} />
                          {status.label}
                        </span>
                        <span className="font-mono text-xs text-ink-faint">{cert.target}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-ink">{cert.name}</h3>
                      <div className="font-mono text-xs text-accent mt-1">{cert.code}</div>
                      <p className="mt-3 text-sm text-ink-dim leading-relaxed flex-1">{cert.why}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 card p-6">
        <div className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
          A+ Core 2: on track for June 2026
        </div>
        <p className="text-sm text-ink-dim leading-relaxed">
          Core 1 (passed May 18, 2026) covered hardware, networking, and virtualization, most of which the
          lab handled directly. Core 2 study targets what the lab does not: Windows-specific OS, mobile,
          macOS, and software troubleshooting. Prep is Professor Messer, the Mike Meyers book, and Jason Dion
          practice tests, booking once scores hold above 85%.
        </p>
      </div>
    </Section>
  );
}

const LEVEL_CLASS: Record<CoverageLevel, string> = {
  light: 'pill-amber',
  'light-to-moderate': 'pill-amber',
  moderate: 'pill-accent',
  strong: 'pill-green',
};

function CoveragePill({ level, band }: { level: CoverageLevel; band: string }) {
  return <span className={`pill ${LEVEL_CLASS[level]} uppercase`}>{band}</span>;
}
