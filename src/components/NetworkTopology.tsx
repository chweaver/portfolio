import { Section } from './Section';
import { ipTable } from '@/data/portfolio';

export function NetworkTopology() {
  return (
    <Section
      id="network"
      eyebrow="02 / Network"
      title="Topology and IP plan"
      contextCard="Two routed subnets with enforced separation. The same skill behind guest-versus-corp and dev-versus-prod segmentation at a client site. pfSense is the single router and DHCP authority, and the lab VMs sit on static IPs below the scope so rules and SSH targets stay predictable."
    >
      <div className="card p-6 overflow-hidden">
        <TopologySVG />
      </div>

      <div className="mt-8 card overflow-hidden">
        <div className="border-b border-bg-border bg-bg-elevated px-5 py-3">
          <div className="font-mono text-xs uppercase tracking-widest text-accent">
            IP addressing table
          </div>
        </div>
        <div className="overflow-x-auto">
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
                <tr
                  key={row.asset}
                  className={i % 2 === 0 ? 'bg-bg-card/60' : ''}
                >
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
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="card p-5">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
            DNS path
          </div>
          <div className="text-sm text-ink-dim leading-relaxed">
            pfSense Unbound listens on both internal interfaces and forwards to Cloudflare{' '}
            <code className="font-mono text-accent">1.1.1.1</code> and{' '}
            <code className="font-mono text-accent">1.0.0.1</code>. Each VM&apos;s{' '}
            <code className="font-mono text-ink">/etc/resolv.conf</code> points at its default gateway.
          </div>
        </div>
        <div className="card p-5">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
            DHCP authority
          </div>
          <div className="text-sm text-ink-dim leading-relaxed">
            VMware DHCP is disabled on VMnet2 and VMnet3 so pfSense is the single authority. If both ran DHCP
            you&apos;d get duplicate offers and unpredictable leases.
          </div>
        </div>
      </div>
    </Section>
  );
}

function TopologySVG() {
  return (
    <svg
      viewBox="0 0 880 460"
      className="w-full h-auto"
      role="img"
      aria-label="Network topology: internet to home router to VMware NAT to pfSense routing two subnets to three Linux VMs"
    >
      <defs>
        <linearGradient id="lan" x1="0" x2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="lab" x1="0" x2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
        </linearGradient>
        <marker id="arrow" viewBox="0 -5 10 10" refX="8" refY="0" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,-5 L10,0 L0,5" fill="#475569" />
        </marker>
      </defs>

      {/* Internet */}
      <g>
        <circle cx="440" cy="40" r="22" fill="#0f141b" stroke="#1f2937" />
        <text x="440" y="44" textAnchor="middle" fill="#e5e7eb" fontSize="11" fontFamily="ui-monospace">
          internet
        </text>
      </g>

      {/* Home router */}
      <g>
        <rect x="380" y="90" width="120" height="36" rx="6" fill="#0f141b" stroke="#1f2937" />
        <text x="440" y="113" textAnchor="middle" fill="#9ca3af" fontSize="11" fontFamily="ui-monospace">
          home router
        </text>
      </g>

      {/* VMware NAT */}
      <g>
        <rect x="370" y="148" width="140" height="36" rx="6" fill="#0f141b" stroke="#1f2937" />
        <text x="440" y="171" textAnchor="middle" fill="#9ca3af" fontSize="11" fontFamily="ui-monospace">
          VMnet8 (NAT)
        </text>
      </g>

      {/* pfSense */}
      <g>
        <rect x="340" y="208" width="200" height="64" rx="8" fill="#0f141b" stroke="#22d3ee" strokeWidth="1.5" />
        <text x="440" y="230" textAnchor="middle" fill="#22d3ee" fontSize="12" fontFamily="ui-monospace" fontWeight="600">
          pfSense CE 2.7.x
        </text>
        <text x="440" y="248" textAnchor="middle" fill="#9ca3af" fontSize="10" fontFamily="ui-monospace">
          LAN  192.168.100.1/24
        </text>
        <text x="440" y="262" textAnchor="middle" fill="#9ca3af" fontSize="10" fontFamily="ui-monospace">
          LAB200  192.168.200.1/24
        </text>
      </g>

      {/* LAN cloud (ubuntu-base + debian-base) */}
      <g>
        <rect x="80" y="300" width="280" height="120" rx="12" fill="url(#lan)" stroke="#22d3ee" strokeOpacity="0.3" />
        <text x="100" y="324" fill="#22d3ee" fontSize="10" fontFamily="ui-monospace" letterSpacing="1">
          LAN · VMnet2 · 192.168.100.0/24
        </text>
        <g transform="translate(100, 340)">
          <rect width="118" height="60" rx="6" fill="#141b24" stroke="#1f2937" />
          <text x="59" y="22" textAnchor="middle" fill="#e5e7eb" fontSize="11" fontFamily="ui-monospace">
            ubuntu-base
          </text>
          <text x="59" y="40" textAnchor="middle" fill="#22d3ee" fontSize="11" fontFamily="ui-monospace">
            .100.10
          </text>
          <text x="59" y="54" textAnchor="middle" fill="#6b7280" fontSize="9" fontFamily="ui-monospace">
            SSH target
          </text>
        </g>
        <g transform="translate(230, 340)">
          <rect width="118" height="60" rx="6" fill="#141b24" stroke="#1f2937" />
          <text x="59" y="22" textAnchor="middle" fill="#e5e7eb" fontSize="11" fontFamily="ui-monospace">
            debian-base
          </text>
          <text x="59" y="40" textAnchor="middle" fill="#22d3ee" fontSize="11" fontFamily="ui-monospace">
            .100.11
          </text>
          <text x="59" y="54" textAnchor="middle" fill="#6b7280" fontSize="9" fontFamily="ui-monospace">
            second host
          </text>
        </g>
      </g>

      {/* LAB cloud (rocky-base) */}
      <g>
        <rect x="520" y="300" width="280" height="120" rx="12" fill="url(#lab)" stroke="#10b981" strokeOpacity="0.3" />
        <text x="540" y="324" fill="#10b981" fontSize="10" fontFamily="ui-monospace" letterSpacing="1">
          LAB200 · VMnet3 · 192.168.200.0/24
        </text>
        <g transform="translate(600, 340)">
          <rect width="160" height="60" rx="6" fill="#141b24" stroke="#1f2937" />
          <text x="80" y="22" textAnchor="middle" fill="#e5e7eb" fontSize="11" fontFamily="ui-monospace">
            rocky-base
          </text>
          <text x="80" y="40" textAnchor="middle" fill="#10b981" fontSize="11" fontFamily="ui-monospace">
            192.168.200.12
          </text>
          <text x="80" y="54" textAnchor="middle" fill="#6b7280" fontSize="9" fontFamily="ui-monospace">
            test client
          </text>
        </g>
      </g>

      {/* Connection lines */}
      <line x1="440" y1="62" x2="440" y2="90" stroke="#475569" markerEnd="url(#arrow)" />
      <line x1="440" y1="126" x2="440" y2="148" stroke="#475569" markerEnd="url(#arrow)" />
      <line x1="440" y1="184" x2="440" y2="208" stroke="#475569" markerEnd="url(#arrow)" />
      <line x1="380" y1="272" x2="220" y2="300" stroke="#22d3ee" strokeOpacity="0.5" />
      <line x1="500" y1="272" x2="660" y2="300" stroke="#10b981" strokeOpacity="0.5" />
    </svg>
  );
}
