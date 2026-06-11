import { Section } from './Section';
import { firewallRules, implicitBehavior, verificationLog, pfsenseLog } from '@/data/portfolio';

export function FirewallRules() {
  return (
    <Section
      id="firewall"
      eyebrow="02 / Firewall"
      title="Define, test, document, explain"
      contextCard="The point of this section: I can write a firewall rule, test it, document the intent, and verify it in the log. The same workflow a client firewall change needs. Three rules on the LAB200 interface, deny by default and permit by exception."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {firewallRules.map((rule) => (
          <RuleCard key={rule.id} rule={rule} />
        ))}
      </div>

      <p className="mt-6 max-w-3xl border-l-4 border-accent bg-accent/5 px-4 py-3 text-sm text-ink-dim">
        <span className="font-semibold text-ink">Order matters.</span> Rule 1 (the TCP/22 permit) sits
        above rule 2 (the broad block) on purpose. Flip them and the block shadows the permit, so SSH
        would fail. That is the same first-match mistake that breaks client ACLs.
      </p>

      <details className="group mt-6">
        <summary className="card flex cursor-pointer list-none items-center justify-between p-4 hover:border-accent/40">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            Verification, logs, and implicit deny
          </span>
          <span className="font-mono text-xs text-ink-faint group-open:hidden">show ↓</span>
          <span className="hidden font-mono text-xs text-ink-faint group-open:inline">hide ↑</span>
        </summary>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="card overflow-hidden">
            <div className="border-b border-bg-border bg-bg-elevated px-5 py-3 font-mono text-xs uppercase tracking-widest text-accent">
              Verification (captured from lab)
            </div>
            <pre className="overflow-x-auto whitespace-pre p-5 font-mono text-[12px] leading-relaxed text-ink">
              {verificationLog}
            </pre>
          </div>
          <div className="card overflow-hidden">
            <div className="border-b border-bg-border bg-bg-elevated px-5 py-3 font-mono text-xs uppercase tracking-widest text-accent">
              pfSense firewall log
            </div>
            <pre className="overflow-x-auto whitespace-pre p-5 font-mono text-[12px] leading-relaxed text-ink">
              {pfsenseLog}
            </pre>
          </div>
        </div>

        <div className="mt-4 card p-5">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
            Implicit default-deny behavior
          </div>
          <ul className="space-y-2 text-sm text-ink-dim">
            {implicitBehavior.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="font-mono text-signal-red">×</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </details>
    </Section>
  );
}

type Rule = typeof firewallRules[number];

function RuleCard({ rule }: { rule: Rule }) {
  const action = rule.action === 'pass' ? 'pass' : 'block';
  const actionClass = action === 'pass' ? 'pill-green' : 'pill-amber';
  const accentClass = action === 'pass' ? 'border-signal-green/30' : 'border-signal-red/30';

  return (
    <div className={`card p-5 border-t-2 ${accentClass}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-xs text-ink-faint">RULE #{rule.id}</span>
        <span className={`pill ${actionClass} uppercase`}>{action}</span>
      </div>

      <div className="mb-3">
        <div className="text-sm text-ink font-medium">{rule.name}</div>
        <div className="font-mono text-[11px] text-ink-faint mt-0.5">pf id {rule.pfsenseId}</div>
      </div>

      <div className="space-y-2 text-sm">
        <RuleRow label="interface" value={rule.interface} />
        <RuleRow label="proto" value={rule.proto} />
        <RuleRow label="source" value={rule.source} />
        <RuleRow label="dest" value={rule.destination} />
        <RuleRow label="port" value={rule.port} />
      </div>

      <div className="mt-4 pt-4 border-t border-bg-border">
        <div className="text-xs uppercase tracking-wider text-ink-faint font-mono mb-1">Intent</div>
        <div className="text-sm text-ink-dim leading-relaxed">{rule.intent}</div>
      </div>
      <div className="mt-3">
        <div className="text-xs uppercase tracking-wider text-ink-faint font-mono mb-1">Verification</div>
        <div className="font-mono text-[12px] text-ink leading-relaxed">{rule.verification}</div>
      </div>
    </div>
  );
}

function RuleRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 font-mono">
      <span className="text-xs uppercase tracking-wider text-ink-faint">{label}</span>
      <span className="text-ink text-right">{value}</span>
    </div>
  );
}
