import { Section } from './Section';
import { TopologyGraph } from './TopologyGraph';
import { ipTable, linuxLab } from '@/data/portfolio';

export function NetworkTopology() {
  return (
    <Section
      id="network"
      eyebrow="Network"
      title="One network: AD and Linux behind a single pfSense"
      contextCard="DC01 and WS01 on LAN run the live AD domain; ubuntu-base and rocky-base on LAB200 are the Linux side. Each node turns green as its hardening lab (SSH, Samba, BIND9, rsync) completes, read live from the Linux lab guide."
    >
      <div className="card p-6 overflow-hidden">
        <TopologyGraph />
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] text-ink-dim">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#2c5bd6' }} /> LAN 192.168.100.0/24
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#1e8a5a' }} /> LAB200 192.168.200.0/24
          </span>
          <span className="inline-flex items-center gap-1.5 text-signal-green">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#1e8a5a' }} /> green check = lab complete (live)
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

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="card p-5">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-2">DNS path</div>
          <div className="text-sm text-ink-dim leading-relaxed">
            pfSense Unbound listens on both internal interfaces and forwards to Cloudflare{' '}
            <code className="font-mono text-accent">1.1.1.1</code>. The Linux DNS lab adds a BIND9 resolver on
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
        <div className="card p-5">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-2">Mixed Linux</div>
          <div className="text-sm text-ink-dim leading-relaxed">
            Three distros on purpose: Ubuntu (netplan), Debian (ifupdown), Rocky (NetworkManager). Client
            shops run mixed Linux, so that is three network-config models, all configured by hand.
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
