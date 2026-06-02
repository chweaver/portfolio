import { Section } from './Section';
import { vmInventory } from '@/data/portfolio';

export function VMInventory() {
  return (
    <Section
      id="vms"
      eyebrow="04 / VMs"
      title="Virtual machine inventory"
      contextCard="Three Linux distros on purpose, because client shops run mixed Linux. Ubuntu uses netplan, Debian uses ifupdown, Rocky uses NetworkManager via nmcli: three different network-config models I have configured by hand. That is the fluency behind a ticket that says the Linux box cannot reach the printer."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {vmInventory.map((vm) => (
          <div key={vm.name} className="card p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="font-mono text-lg text-accent">{vm.name}</div>
                <div className="font-mono text-xs text-ink-faint mt-0.5">{vm.os}</div>
              </div>
              <span className="pill pill-green">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal-green" />
                {vm.snapshot}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4 text-center">
              <Stat label="vCPU" value={String(vm.vcpu)} />
              <Stat label="RAM" value={vm.ram} />
              <Stat label="Disk" value={vm.disk} />
            </div>

            <div className="space-y-2 text-sm">
              <Row label="NICs" value={vm.nics} mono />
              <Row label="IP" value={vm.ips.join(' · ')} mono accent />
              <Row label="Role" value={vm.role} />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-bg-border bg-bg-elevated/60 px-3 py-2">
      <div className="font-mono text-base text-ink">{value}</div>
      <div className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">{label}</div>
    </div>
  );
}

function Row({
  label,
  value,
  mono = false,
  accent = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <span className="font-mono text-xs uppercase tracking-wider text-ink-faint w-12 flex-shrink-0 pt-0.5">
        {label}
      </span>
      <span className={`${mono ? 'font-mono' : ''} ${accent ? 'text-accent' : 'text-ink-dim'}`}>{value}</span>
    </div>
  );
}
