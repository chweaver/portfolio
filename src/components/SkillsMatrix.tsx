'use client';

import { useState, useMemo } from 'react';
import { Section } from './Section';
import {
  skillsMatrix,
  skillsOverview,
  certCoverage,
  coverageMethodology,
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

export function SkillsMatrix() {
  const [filter, setFilter] = useState<Filter>('all');

  const rows = useMemo(
    () => (filter === 'all' ? skillsMatrix : skillsMatrix.filter((r) => r.category === filter)),
    [filter]
  );

  return (
    <Section
      id="skills"
      eyebrow="05 / Skills"
      title="Skills coverage"
      subtitle="A three-column overview at the top, then every lab element traced to A+ 220-1101/1102, Network+ N10-009, CCNA 200-301 v1.1, and the MSP tier-1 application it speaks to. Filter by area if you only care about one cert."
    >
      <div className="mb-10 grid gap-4 md:grid-cols-3">
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

      <div className="mt-10">
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
