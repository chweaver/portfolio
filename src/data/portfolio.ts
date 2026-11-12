export const adLab = {
  guideRepo: 'ad-lab-guide',
  guideBaseUrl: 'https://chweaver.github.io/ad-lab-guide/',
  statusUrl: 'https://chweaver.github.io/ad-lab-guide/lab-status.json',
} as const;

// A short troubleshooting reflection shown in the AD lab section: what the
// build-out taught, kept plain and specific.
export const adLabReflection =
  'Most of what stuck came from things breaking. A domain join that fails is usually DNS. Group Policy problems rarely announce themselves, so you live in the event logs. The worst was folder redirection silently refusing to work: I ruled out permissions, ownership, GPO scope, and networking one at a time before tracing it to a "grant exclusive rights" setting fighting my share\'s permissions.';

// The Linux lab guide reports status exactly like the AD lab guide: a small script
// parses the per-phase `**Status:**` lines and publishes lab-status.json with the
// site. The portfolio fetches it live on load (useLabStatus), so finishing a lab
// and pushing the guide updates this page on the next visit, with no sync step.
export const linuxLab = {
  guideRepo: 'linux-lab-guide',
  guideBaseUrl: 'https://chweaver.github.io/linux-lab-guide/',
  statusUrl: 'https://chweaver.github.io/linux-lab-guide/lab-status.json',
} as const;

// Topology model for the live network graph (NetworkTopology / TopologyGraph).
// The AD addresses (DC01/WS01) come from the separate ad-lab-guide.
// `labs` lists the linux-lab-guide lab ids that build or harden a node; a node
// whose labs are all complete gets the "done" treatment (otherwise "in progress"
// or "pending"), read live from linuxLab.statusUrl, so the graph updates on the
// next visit when the guide is pushed. Nodes with no labs are established
// infrastructure. The Linux roles stay generic (Ubuntu Server, Rocky Linux) until
// the guide reports a lab, so a node never claims a service (Samba, BIND9, rsync)
// the lab has not stood up yet, while still tracking the live status.
export type TopoNodeType = 'firewall' | 'server' | 'workstation';

export interface TopoSubnet {
  id: string;
  label: string;
  color: string;
}

export interface TopoNode {
  id: string;
  type: TopoNodeType;
  label: string;
  ip: string;
  subnet: string;
  role?: string;
  labs?: string[];
  established?: boolean;
}

export const topologySubnets: TopoSubnet[] = [
  { id: 'lan', label: 'LAN · 192.168.100.0/24', color: '#22d3ee' },
  { id: 'lab200', label: 'LAB200 · 192.168.200.0/24', color: '#10b981' },
];

export const topologyNodes: TopoNode[] = [
  { id: 'pfsense', type: 'firewall', label: 'pfSense CE 2.7.x', ip: '192.168.100.1 / .200.1', subnet: 'lan', role: 'Router + firewall + DHCP', established: true },
  { id: 'dc01', type: 'server', label: 'DC01 (corp.lab)', ip: '192.168.100.5', subnet: 'lan', role: 'AD DS / DNS', established: true },
  { id: 'ws01', type: 'workstation', label: 'WS01 (Win 11)', ip: '192.168.100.20', subnet: 'lan', role: 'Domain client', established: true },
  { id: 'ubuntu', type: 'server', label: 'ubuntu-base', ip: '192.168.100.10', subnet: 'lan', role: 'Ubuntu Server (LAN)', labs: ['ssh', 'samba'] },
  { id: 'rocky', type: 'server', label: 'rocky-base', ip: '192.168.200.12', subnet: 'lab200', role: 'Rocky Linux (LAB200)', labs: ['bind9', 'rsync'] },
  { id: 'ops01', type: 'server', label: 'ops01', ip: '192.168.200.20', subnet: 'lab200', role: 'Ubuntu Server (LAB200)', labs: ['syslog', 'monitoring', 'patching'] },
];

export const profile = {
  name: 'Charles "Charlie" Weaver',
  shortName: 'Charlie Weaver',
  location: 'Carmel, IN 46032',
  email: 'charliewgz6@gmail.com',
  linkedin: 'https://www.linkedin.com/in/charlie-weaver-it/',
  github: 'https://github.com/chweaver',
  tagline: 'Entry-level IT support technician in the Indianapolis metro, CompTIA A+ certified, with hands-on Active Directory, pfSense, Linux, and Proxmox experience from a documented home lab.',
  // Full headline kept as the canonical string (SEO/meta). The hero renders it in
  // two tiers for scannability: headlineLead large, headlineRest smaller.
  headline: 'IT support technician, backed by a live homelab: Active Directory, pfSense, Linux, and a Proxmox server, documented and verified.',
  headlineLead: 'IT support technician.',
  headlineRest: 'Backed by a live homelab: Active Directory, pfSense, Linux, and a Proxmox server, documented and verified.',
  // Short trajectory line in the hero: makes the network-engineering goal explicit
  // without repeating the support framing already in the headline.
  aim: 'My goal is network engineering. The routed, firewalled lab is the foundation; Network+ is in progress, then CCNA.',
} as const;

// The hero renders only `honesty`; the built/planned arrays were removed with
// the old hero cards.
export const summary = {
  honesty:
    'Looking for my first IT role. Everything here is self-built: built items are complete and verified, and planned items are labeled separately.',
};

// At-a-glance hero strip: the 5-second recruiter scan. Values trace to real data
// (profile.location, the certs list, the lab stack, current availability).
export const heroGlance = [
  { k: 'Location', v: 'Carmel, IN · Indianapolis metro' },
  { k: 'Certs', v: 'CompTIA A+ certified · Network+ in progress' },
  { k: 'Stack', v: 'AD · pfSense · Linux · Proxmox' },
  { k: 'Status', v: 'Available now' },
] as const;

// Compact credential path shown on the right of the hero: a curated, ordered view
// that makes the network-engineering trajectory explicit. States stay honest and in
// sync with `certs` below (CompTIA A+ certified, Network+ in progress, then CCNA).
export const heroCertRoadmap = {
  caption: 'The path toward network engineering',
  steps: [
    { name: 'CompTIA A+', code: '', state: 'done', note: 'Certified June 2026' },
    { name: 'CompTIA Network+', code: 'N10-009', state: 'current', note: 'In progress' },
    { name: 'CCNA', code: '200-301', state: 'later', note: 'Routing and switching', flag: 'Network track' },
    { name: 'AZ-104', code: '', state: 'later', note: 'Cloud and M365' },
  ],
} as const;

// Outcome-first projects grid. This is the scannable index a hiring manager
// reads in a couple of seconds: result first, then problem / built / result and
// the stack. The detailed sections below (Firewall, Network, the live AD and
// Linux feeds) remain the underlying proof. Status is honest: done vs in-progress.
export type ProjectStatus = 'done' | 'in-progress' | 'planned';

export interface Project {
  title: string;
  outcome: string;
  status: ProjectStatus;
  problem: string;
  built: string;
  result: string;
  stack: string[];
  repo: string;
  // Custom label for the outbound link button (falls back to the repo host/path).
  linkLabel?: string;
  // Span the full projects row (md:col-span-3) for a card with much more text.
  wide?: boolean;
}

export const projects: Project[] = [
  {
    title: 'Active Directory domain',
    outcome: 'corp.lab live: DC, OUs, AGDLP groups, GPOs, file services, login scripts',
    status: 'in-progress',
    problem: 'Stand up and run the identity layer a small shop depends on, end to end.',
    built: 'Domain controller on Server 2022, organizational units, users, AGDLP groups, a domain-joined Windows 11 client, Group Policy, file shares with home folders and folder redirection, a GPO login script, and drive maps targeted by security group.',
    result: 'WS01 authenticates against corp.lab and policy applies on login: redirected folders, the login script, and the IT drive map are all verified on the client. Progress through the rest of the guide is tracked live below.',
    stack: ['Windows Server', 'Active Directory', 'GPO', 'File shares', 'DNS'],
    repo: adLab.guideBaseUrl,
    linkLabel: 'Open the AD lab guide',
  },
  {
    title: 'Linux lab build',
    outcome: 'Lab 1 complete: key-only SSH, locked-down sshd, ufw + fail2ban, validated',
    status: 'in-progress',
    problem: 'Bridge Linux into the Windows domain the way a real mixed network runs, then operate it: logs, metrics, patches.',
    built: 'On ubuntu-base: key-based login proven before password auth went off, sshd locked down through a 99-hardening.conf drop-in, ufw deny-by-default, and fail2ban watching the auth log.',
    result: 'Lab 1 (SSH hardening) is complete and validated: key login works, password and root logins are refused, and fail2ban bans repeated failures. Queued after it: Samba on the domain, BIND9, rsync backups, then rsyslog, Prometheus + Grafana on Docker, and automated patching on ops01.',
    stack: ['Linux', 'OpenSSH', 'Samba', 'BIND9', 'rsync', 'rsyslog', 'Prometheus', 'Docker'],
    repo: linuxLab.guideBaseUrl,
    linkLabel: 'Open the Linux lab guide',
  },
  {
    title: 'Segmented pfSense network',
    outcome: '3 firewall rules, tested and logged',
    status: 'done',
    problem: 'Design, apply, and verify a real client-style firewall policy.',
    built: 'Two routed /24 subnets behind one pfSense, deny by default with permit by exception, plus DHCP and DNS authority.',
    result: 'SSH from LAB200 punches through to LAN, ping is dropped, both confirmed in the pfSense filter log.',
    stack: ['pfSense', 'TCP/IP', 'Firewall', 'Routing', 'DHCP'],
    repo: '',
  },
  {
    title: 'Proxmox home server',
    outcome: 'One Proxmox host running local AI, Home Assistant, DNS, and a game server',
    status: 'done',
    problem: 'Run real services on real hardware, not just lab VMs, and keep them running.',
    built: 'Proxmox VE on a server I assembled from spare parts (Ryzen 9 3950X, 32 GB RAM, RTX 2080). The GPU is passed through to a container that serves local AI models with Ollama, alongside a Whisper speech-to-text container, a Home Assistant VM, a Technitium DNS container, and a Minecraft server VM.',
    result: 'When the server stopped powering on, I traced the fault to a failed power supply, replaced it, and brought every guest back up. Backups are restore-tested: I restored a container backup to a throwaway ID, confirmed the service came up, then removed the copy.',
    stack: ['Proxmox VE', 'LXC', 'GPU passthrough', 'Ollama', 'Whisper', 'Home Assistant', 'Technitium DNS', 'Backup and restore'],
    repo: '',
    wide: true,
  },
  {
    title: 'Self-hosted AI workspace (Odysseus)',
    outcome: 'Private AI workspace running as a multi-container Docker stack on my own GPU',
    status: 'done',
    problem: 'I wanted real reps running containerized services over time, and an AI workspace that keeps my data on my own machine.',
    built: 'Four-service Docker Compose stack (app, ChromaDB, SearXNG, ntfy) with models served by Ollama. When they offloaded to the CPU on a 12 GB card, I capped context windows, turned on flash attention and KV-cache quantization, and moved the model store to its own SSD to keep everything on the GPU. Hardened it: outbound-only firewall, non-root, model API on localhost, app behind per-user login.',
    result: 'My daily driver, rebuildable on any machine from a script and a git bundle, which is how it also runs on the Proxmox server. A Python test battery scores each model, so model choice is measured, not guessed.',
    stack: ['Docker', 'Docker Compose', 'Linux', 'Ollama', 'Python'],
    repo: '',
    wide: true,
  },
];

// Support work for real people, outside the lab: shown as a strip under the
// projects grid. Every line is something Charlie reported directly; keep the
// wording at that level (no invented counts, clients, or outcomes).
export const outsideLab = {
  eyebrow: 'Outside the lab',
  title: 'Hands-on support for real people',
  items: [
    { k: 'PC builds', v: 'Built or rebuilt 6 to 10 PCs for other people.' },
    {
      k: 'Family and friends support',
      v: 'PC repair and upgrades, Wi-Fi and home network problems, phone and account help, printers and smart home devices.',
    },
  ],
} as const;

export const ipTable = [
  { asset: 'pfSense WAN', nic: 'VMnet8 (NAT)', address: '192.168.19.133 (DHCP)', mask: '/24', role: 'Uplink to host NAT pool' },
  { asset: 'pfSense LAN', nic: 'VMnet2', address: '192.168.100.1', mask: '/24', role: 'LAN gateway' },
  { asset: 'pfSense LAB200', nic: 'VMnet3', address: '192.168.200.1', mask: '/24', role: 'LAB200 gateway' },
  { asset: 'ubuntu-base', nic: 'VMnet2', address: '192.168.100.10', mask: '/24', role: 'LAN SSH target' },
  { asset: 'debian-base', nic: 'VMnet2', address: '192.168.100.11', mask: '/24', role: 'LAN second host' },
  { asset: 'rocky-base', nic: 'VMnet3', address: '192.168.200.12', mask: '/24', role: 'LAB200 test client (originates inter-subnet traffic)' },
];

export const firewallRules = [
  {
    id: 1,
    name: 'Allow rocky SSH to ubuntu',
    pfsenseId: '1778460476',
    interface: 'LAB200',
    action: 'pass' as const,
    proto: 'TCP',
    source: 'LAB200 net',
    destination: '192.168.100.10',
    port: '22',
    intent: 'Punch a single TCP/22 hole from LAB200 to the ubuntu host on LAN. Specific permit, evaluated before the broader block on rule 2.',
    verification: 'ssh vybz@192.168.100.10 from rocky-base (192.168.200.12) connects and authenticates.',
  },
  {
    id: 2,
    name: 'Block LAB200 to LAN',
    pfsenseId: '1778460176',
    interface: 'LAB200',
    action: 'block' as const,
    proto: 'any',
    source: 'LAB200 net',
    destination: '192.168.100.0/24',
    port: 'any',
    intent: 'Block everything else from LAB200 toward LAN. ICMP, UDP, and any TCP port outside the explicit pass above are dropped.',
    verification: 'ping -c 4 192.168.100.10 from rocky-base returns 100% packet loss while SSH to the same host still succeeds.',
  },
  {
    id: 3,
    name: 'LAB200 default permit',
    pfsenseId: '1778459597',
    interface: 'LAB200',
    action: 'pass' as const,
    proto: 'any',
    source: 'LAB200 net',
    destination: 'any',
    port: 'any',
    intent: 'Default permit for LAB200 outbound. LAN destinations were already handled by rules 1 and 2, so this rule catches everything else (internet, NTP, DNS upstream).',
    verification: 'curl -s https://ifconfig.me from rocky-base returns the WAN-side IP.',
  },
];

export const implicitBehavior = [
  'LAN → LAB200 has no explicit permit on the LAN ruleset, so the LAN default-deny applies. SSH from ubuntu-base to rocky-base times out.',
  'pfSense rule order is top-down, first match wins. The TCP/22 permit (rule 1) lands before the broader LAB200 → LAN block (rule 2), which is why SSH punches through while ping does not.',
  'LAB200 → internet works via rule 3. LAN → internet works via the default LAN-allow rule pfSense ships with.',
];

export const verificationLog = `# From rocky-base (LAB200, 192.168.200.12):

[vybz@rocky-base ~]$ ssh vybz@192.168.100.10
vybz@192.168.100.10's password:
Welcome to Ubuntu 24.04.4 LTS (GNU/Linux 6.8.0-111-generic x86_64)
Last login: Fri May 15 05:00:53 2026 from 192.168.200.12
vybz@ubuntu-base:~$ exit
Connection to 192.168.100.10 closed.

[vybz@rocky-base ~]$ ping -c 4 192.168.100.10
PING 192.168.100.10 (192.168.100.10) 56(84) bytes of data.
--- 192.168.100.10 ping statistics ---
4 packets transmitted, 0 received, 100% packet loss, time 3105ms

[vybz@rocky-base ~]$ curl -s https://ifconfig.me
192.168.19.133`;

// Three representative lines drawn from public/logs/filter.log,
// one per LAB200 rule. em2 = OPT1/LAB200. Real filterlog CSV simplified for display.
export const pfsenseLog = `2026-05-10 20:48:54  LAB200(em2)  pass    rule 1778460476  TCP   192.168.200.12:41370 → 192.168.100.10:22   SYN
2026-05-10 20:51:04  LAB200(em2)  block   rule 1778460176  ICMP  192.168.200.12         → 192.168.100.10        echo request
2026-05-10 20:48:34  LAB200(em2)  pass    rule 1778459597  UDP   192.168.200.12:39017   → 66.42.71.197:123      NTP`;

export type SkillRow = {
  element: string;
  aplus: string;
  netplus: string;
  ccna: string;
  msp: string;
  category: 'hardware' | 'network' | 'security' | 'ops' | 'cisco';
};

export const skillsMatrix: SkillRow[] = [
  {
    element: 'Custom PC build (Ryzen 9, DDR5, NVMe, PSU sizing)',
    aplus: '1201 3.3, 3.4, 3.5, 3.6',
    netplus: 'n/a',
    ccna: 'n/a',
    msp: 'Workstation builds, hardware swaps, BIOS/UEFI, repair vs replace decisions',
    category: 'hardware',
  },
  {
    element: 'VMware Workstation Pro install and config',
    aplus: '1201 4.1, 1202 1.10',
    netplus: '1.2',
    ccna: 'n/a',
    msp: 'Spinning up disposable VMs to reproduce client issues, test patches',
    category: 'ops',
  },
  {
    element: 'Subnetting two private /24 networks',
    aplus: '1201 2.6',
    netplus: '1.4, 1.6',
    ccna: '1.6, 1.7',
    msp: 'Designing client LAN segments, sizing DHCP scopes, guest vs corp separation',
    category: 'network',
  },
  {
    element: 'pfSense as inter-subnet router',
    aplus: '1201 2.5, 2.6',
    netplus: '2.1',
    ccna: '3.1, 3.3',
    msp: 'Inter-VLAN routing, SVI configuration on L3 switches',
    category: 'network',
  },
  {
    element: 'pfSense as stateful firewall',
    aplus: '1202 2.10',
    netplus: '4.3, 4.4',
    ccna: '5.5, 5.6',
    msp: 'Implementing client firewall policy changes with documentation',
    category: 'security',
  },
  {
    element: 'Firewall rule design (3 rules + implicit deny)',
    aplus: '1202 2.10',
    netplus: '4.3, 4.4',
    ccna: '5.5',
    msp: 'Reading rulesets, adding rules with change documentation',
    category: 'security',
  },
  {
    element: 'Linux install, package mgmt, network config (3 distros)',
    aplus: '1202 1.2, 1.9',
    netplus: '3.1, 3.2',
    ccna: '4.8',
    msp: 'Tier-1 Linux triage (systemctl, journalctl, package install, log review): the first response when a Linux box stops serving',
    category: 'ops',
  },
  {
    element: 'Snapshot strategy (pre-change, named, rolled back)',
    aplus: '1202 4.2, 4.3',
    netplus: '3.2, 3.3',
    ccna: 'n/a',
    msp: 'Pre-change snapshots on Hyper-V/VMware/Proxmox at client sites',
    category: 'ops',
  },
  {
    element: 'Documentation (this portfolio)',
    aplus: '1202 4.1',
    netplus: '3.2',
    ccna: 'n/a',
    msp: 'Runbooks, knowledge base articles, client environment docs',
    category: 'ops',
  },
  {
    element: 'Cisco Packet Tracer foundation (2960, SVI, 2 PCs)',
    aplus: 'n/a',
    netplus: '2.3, 2.4',
    ccna: '2.1, 2.2, 2.4',
    msp: 'Reading switch configs, switch refresh support, VLAN troubleshooting',
    category: 'cisco',
  },
  {
    element: 'Eve-NG Pro installed (activated after the A+)',
    aplus: '1201 4.1',
    netplus: 'n/a',
    ccna: '6.1',
    msp: 'Pre-deployment device labs, recreating client topology to test changes',
    category: 'cisco',
  },
];

export type CoverageLevel = 'light' | 'light-to-moderate' | 'moderate' | 'strong';

export const certCoverage: { exam: string; band: string; level: CoverageLevel; notes: string }[] = [
  {
    exam: 'CompTIA A+ (220-1201 + 220-1202)',
    band: 'Light-to-moderate',
    level: 'light-to-moderate',
    notes: 'Virtualization, PC hardware, and Linux install and config are direct. Mobile, printers, OS imaging, macOS, and most Windows-side OS and remote-access objectives are not in the lab.',
  },
  {
    exam: 'Network+ N10-009',
    band: 'Moderate',
    level: 'moderate',
    notes: 'Subnetting, routing, basic firewall, and L1-L7 troubleshooting are direct. Wireless, cloud, WAN/SDN, and IPv6 are not in the lab.',
  },
  {
    exam: 'CCNA 200-301 v1.1',
    band: 'Light',
    level: 'light',
    notes: 'Single Packet Tracer topology to date. IOS configuration, OSPF, services on IOS, security, wireless, and automation come with CCNA study.',
  },
];

export const coverageMethodology =
  'Self-assessed against the published blueprints. Bands reflect what the lab covers directly; study closes the rest.';

export const skillsOverview = [
  {
    column: 'Operating Systems',
    items: [
      'Windows 10 and 11, Windows Server 2022',
      'Linux (Ubuntu, Debian, Rocky)',
      'macOS and Chrome OS (user level)',
      'Basic shell',
    ],
  },
  {
    column: 'Networking',
    items: ['TCP/IP', 'DNS', 'DHCP', 'Switching', 'VLANs', 'Firewall rules', 'OSI model'],
  },
  {
    column: 'Identity and Tooling',
    items: [
      'Active Directory: domain controller, OUs, users, AGDLP groups',
      'Group Policy, file shares, folder redirection, login scripts, drive maps',
      'Microsoft 365, ServiceNow, Jira: familiar, not yet hands-on',
    ],
  },
  {
    column: 'Servers and Hardware',
    items: [
      'Proxmox VE: VMs, containers, GPU passthrough, restore-tested backups',
      'VMware Workstation Pro, Docker',
      'PC builds, diagnosis, and part replacement',
    ],
  },
];

export const certTierOrder = ['Completed', 'Foundation · next'] as const;

export const certs = [
  {
    name: 'CompTIA A+',
    code: '220-1201 + 220-1202',
    status: 'passed' as const,
    tier: 'Completed' as const,
    target: 'Certified June 2026',
    why: 'Hardware, networking, virtualization, operating systems, security, and software troubleshooting. The baseline credential for IT support work, both cores complete.',
  },
  {
    name: 'CompTIA Network+',
    code: 'N10-009',
    status: 'in-progress' as const,
    tier: 'Foundation · next' as const,
    target: 'Networking baseline',
    why: 'Vendor-neutral networking: addressing, routing and switching concepts, wireless, and troubleshooting. The step between A+ and CCNA.',
  },
  {
    name: 'Cisco CCNA',
    code: '200-301 v1.1',
    status: 'queued' as const,
    tier: 'Foundation · next' as const,
    target: 'Routing and switching',
    why: 'Routing, switching, and the fundamentals behind every client network.',
  },
  {
    name: 'Microsoft Azure Administrator',
    code: 'AZ-104',
    status: 'queued' as const,
    tier: 'Foundation · next' as const,
    target: 'Cloud and M365',
    why: 'Identity, tenants, and the Azure and M365 stack MSPs run for clients.',
  },
];

// Long-term breadth (MSP-ownership track, security/governance certs) intentionally
// omitted: too forward-looking for an entry-level screen.
