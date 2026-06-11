import { Section } from './Section';
import { vmInventory } from '@/data/portfolio';

export function VMInventory() {
  return (
    <Section
      id="vms"
      eyebrow="04 / VMs"
      title="What each VM proves"
      contextCard="Three Linux distros on purpose, because client shops run mixed Linux: Ubuntu uses netplan, Debian uses ifupdown, Rocky uses NetworkManager. Three network-config models, all configured by hand."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {vmInventory.map((vm) => (
          <div key={vm.name} className="card p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-mono text-lg text-accent">{vm.name}</div>
                <div className="font-mono text-xs text-ink-faint mt-0.5">{vm.os}</div>
              </div>
              <span className="pill pill-green">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal-green" />
                {vm.snapshot}
              </span>
            </div>

            <p className="mt-4 text-sm text-ink leading-relaxed">{vm.proves}</p>

            <p className="mt-4 border-t border-bg-border pt-3 font-mono text-xs text-ink-faint">
              {vm.spec} · <span className="text-accent">{vm.ips.join(' · ')}</span>
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
