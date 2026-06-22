import { Section } from './Section';
import { TopologyGraph } from './TopologyGraph';
import { ipTable, linuxLab } from '@/data/portfolio';

export function NetworkTopology() {
  return (
    <Section
      id="network"
      eyebrow="03 / Network"
      title="One network: AD and Linux behind a single pfSense"
      contextCard="Two routed subnets behind a single pfSense. The Windows side (DC01, WS01) runs the live AD domain; the Linux side (ubuntu, rocky) is in place as VMs. Its hardening labs (SSH, Samba, BIND9, rsync) are not started yet; each node turns green here as its lab completes, read live from the Linux lab guide, with the detail tracked at the bottom of this page."
    >
      <div className="card p-6 overflow-hidden">
        <TopologyGraph />
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] text-ink-dim">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#22d3ee' }} /> LAN 192.168.100.0/24
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#10b981' }} /> LAB200 192.168.200.0/24
          </span>
          <span className="inline-flex items-center gap-1.5 text-signal-green">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#10b981' }} /> green check = lab complete (live)
          </span>
          <a
            href={`${linuxLab.guideBaseUrl}topology/`}
            target="_blank"
            rel="noreferrer"
            className="text-accent underline-offset-2 hover:underline"
          >
            open the guide topology &rarr;
          </a>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="card p-5">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-2">DNS path</div>
          <div className="text-sm text-ink-dim leading-relaxed">
            pfSense Unbound listens on both internal interfaces and forwards to Cloudflare{' '}
            <code className="font-mono text-accent">1.1.1.1</code>. The planned Linux DNS lab will add a BIND9 resolver on
            rocky-base to conditionally forward <code className="font-mono text-accent">corp.lab</code> to
            DC01.
          </div>
        </div>
        <div className="card p-5">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
            DHCP authority
          </div>
          <div className="text-sm text-ink-dim leading-relaxed">
            VMware DHCP is off on both VMnets so pfSense is the single authority. Two DHCP servers would
            mean duplicate offers and unpredictable leases.
          </div>
        </div>
      </div>

      <details className="group mt-6">
        <summary className="card flex cursor-pointer list-none items-center justify-between p-4 hover:border-accent/40">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            IP addressing table
          </span>
          <span className="font-mono text-xs text-ink-faint group-open:hidden">show ↓</span>
          <span className="hidden font-mono text-xs text-ink-faint group-open:inline">hide ↑</span>
        </summary>
        <div className="card mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-bg-elevated text-left">
              <tr className="text-ink-dim font-mono text-xs uppercase tracking-wider">
                <th className="px-5 py-4 font-normal">Asset</th>
                <th className="px-5 py-4 font-normal">VMware NIC</th>
                <th className="px-5 py-4 font-normal">Address</th>
                <th className="px-5 py-4 font-normal">Mask</th>
                <th className="px-5 py-4 font-normal">Role</th>
              </tr>
            </thead>
            <tbody>
              {ipTable.map((row, i) => (
                <tr key={row.asset} className={i % 2 === 0 ? 'bg-bg-card/60' : ''}>
                  <td className="px-5 py-4 font-mono text-ink">{row.asset}</td>
                  <td className="px-5 py-4 font-mono text-ink-dim">{row.nic}</td>
                  <td className="px-5 py-4 font-mono text-accent">{row.address}</td>
                  <td className="px-5 py-4 font-mono text-ink-faint">{row.mask}</td>
                  <td className="px-5 py-4 text-ink-dim">{row.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </Section>
  );
}
