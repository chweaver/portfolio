import { Section } from './Section';
import { hostSpec } from '@/data/portfolio';

export function LabOverview() {
  return (
    <Section
      id="lab"
      eyebrow="01 / Lab"
      title="The host and the hypervisor"
      subtitle="Daily-driver Windows 11 workstation running VMware Workstation Pro. Three custom VMnets carry the lab; the host's physical NIC stays on its own network. Why VMware and not Hyper-V or Proxmox: friendlier vNIC editor, Windows 11 has to keep running for everything else, and nested Proxmox is the Phase 4 plan."
    >
      <div className="grid gap-3 md:grid-cols-2">
        {hostSpec.map((s) => (
          <div key={s.label} className="card p-4 flex items-start gap-4">
            <div className="font-mono text-xs uppercase tracking-widest text-accent w-20 flex-shrink-0 pt-1">
              {s.label}
            </div>
            <div>
              <div className="text-ink font-medium">{s.value}</div>
              <div className="font-mono text-xs text-ink-faint mt-1">{s.note}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 card p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            VM resource allocation at runtime
          </span>
          <span className="font-mono text-xs text-ink-faint">6 vCPU · 6 GB RAM · ~70 GB thin</span>
        </div>
        <div className="text-sm text-ink-dim">
          Well under host capacity. 64 GB RAM upgrade planned for Phase 3 + Phase 4 when Windows Server and a
          nested Proxmox guest join the lab.
        </div>
      </div>
    </Section>
  );
}
