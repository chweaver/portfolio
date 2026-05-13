import { Section } from './Section';
import { firewallRules, implicitBehavior, verificationLog, pfsenseLog } from '@/data/portfolio';

export function FirewallRules() {
  return (
    <Section
      id="firewall"
      eyebrow="03 / Firewall"
      title="Three rules and an implicit deny"
      subtitle="Each rule has an intent and a verification command. The default-deny at the bottom of every pfSense ruleset matters too — it's why LAB200 traffic toward LAN times out without an explicit drop rule. This rule pair (block ICMP, pass SSH) proves the firewall is doing per-protocol matching, not just routing."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {firewallRules.map((rule) => (
          <RuleCard key={rule.id} rule={rule} />
        ))}
      </div>

      <div className="mt-8 card p-6">
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

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="card overflow-hidden">
          <div className="border-b border-bg-border bg-bg-elevated px-5 py-3 flex items-center justify-between">
            <div className="font-mono text-xs uppercase tracking-widest text-accent">
              Verification (captured from lab)
            </div>
            <span className="font-mono text-xs text-ink-faint">bash</span>
          </div>
          <pre className="font-mono text-[12px] leading-relaxed text-ink p-5 overflow-x-auto whitespace-pre">
            {verificationLog}
          </pre>
        </div>
        <div className="card overflow-hidden">
          <div className="border-b border-bg-border bg-bg-elevated px-5 py-3 flex items-center justify-between">
            <div className="font-mono text-xs uppercase tracking-widest text-accent">
              pfSense firewall log
            </div>
            <span className="font-mono text-xs text-ink-faint">Status → System Logs → Firewall</span>
          </div>
          <pre className="font-mono text-[12px] leading-relaxed text-ink p-5 overflow-x-auto whitespace-pre">
            {pfsenseLog}
          </pre>
        </div>
      </div>

      <p className="mt-6 text-sm italic text-ink-faint border-l-2 border-accent/40 pl-4 max-w-3xl">
        Three lines, three rules, three intents. The log is the audit trail. This is how I&apos;d validate a
        rule change on a real client firewall: write the rule, snapshot the config, generate the test traffic,
        watch the log, document the result, close the ticket.
      </p>
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
