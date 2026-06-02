export const adLab = {
  guideRepo: 'ad-lab-guide',
  guideBaseUrl: 'https://chweaver.github.io/ad-lab-guide/',
  statusUrl: 'https://chweaver.github.io/ad-lab-guide/lab-status.json',
} as const;

export const profile = {
  name: 'Charles "Charlie" Weaver',
  shortName: 'Charlie Weaver',
  location: 'Carmel, IN 46032',
  email: 'charliewgz6@gmail.com',
  linkedin: 'https://www.linkedin.com/in/charlie-weaver-it/',
  github: 'https://github.com/chweaver',
  age: 20,
  tagline: 'MSP-bound IT generalist with a routed two-subnet pfSense lab and Python automation.',
  labPhase: 'Phase 2 complete, Phase 3 in design',
} as const;

export const summary = {
  built: [
    'Windows 11 host running VMware Workstation Pro 25H2u1',
    'pfSense CE 2.7.x routing two private /24 subnets',
    'Three Linux VMs (Ubuntu, Debian, Rocky) across the subnets',
    'Three firewall rules with documented verification commands',
    'Named snapshots at every clean state',
    'Packet Tracer foundation scene (2960, VLAN1 SVI, two PCs)',
  ],
  planned: [
    'Windows Server 2022 DC: AD DS, AD-integrated DNS, file server, GPOs',
    'Two Windows 11 clients domain-joined for GPO testing',
    'Zabbix or LibreNMS monitoring pfSense + DC',
    'Nested Proxmox VE inside VMware (Phase 4)',
    'Packet Tracer phases 2-7 and Eve-NG ramp (Phase 5)',
  ],
  honesty:
    'No professional MSP tenure yet. Everything marked "built" is built. Everything marked "planned" is planned.',
};

export const subnets = [
  {
    name: 'LAN',
    cidr: '192.168.100.0/24',
    gateway: '192.168.100.1',
    vmnet: 'VMnet2',
    color: 'cyan',
  },
  {
    name: 'LAB200',
    cidr: '192.168.200.0/24',
    gateway: '192.168.200.1',
    vmnet: 'VMnet3',
    color: 'green',
  },
] as const;

export const ipTable = [
  { asset: 'pfSense WAN', nic: 'VMnet8 (NAT)', address: '192.168.19.133 (DHCP)', mask: '/24', role: 'Uplink to host NAT pool' },
  { asset: 'pfSense LAN', nic: 'VMnet2', address: '192.168.100.1', mask: '/24', role: 'LAN gateway' },
  { asset: 'pfSense LAB200', nic: 'VMnet3', address: '192.168.200.1', mask: '/24', role: 'LAB200 gateway' },
  { asset: 'ubuntu-base', nic: 'VMnet2', address: '192.168.100.10', mask: '/24', role: 'LAN SSH target' },
  { asset: 'debian-base', nic: 'VMnet2', address: '192.168.100.11', mask: '/24', role: 'LAN second host' },
  { asset: 'rocky-base', nic: 'VMnet3', address: '192.168.200.12', mask: '/24', role: 'LAB200 test client (originates inter-subnet traffic)' },
];

export const hostSpec = [
  { label: 'CPU', value: 'AMD Ryzen 9 7950X3D', note: '16C/32T, SVM enabled for nested virt' },
  { label: 'RAM', value: '32 GB DDR5', note: '64 GB upgrade planned for Phase 3+4' },
  { label: 'GPU', value: 'NVIDIA RTX 4070 Ti', note: 'Not allocated to lab' },
  { label: 'Storage', value: 'NVMe Gen4 SSD', note: 'VMs under C:\\VMs\\Lab1-Foundations\\' },
  { label: 'OS', value: 'Windows 11 Pro 25H2', note: 'Hyper-V disabled (VMware conflict)' },
  { label: 'Hypervisor', value: 'VMware Workstation Pro 25H2u1', note: 'Type 2, free personal-use tier' },
];

export const vmInventory = [
  {
    name: 'pfsense-base',
    os: 'pfSense CE 2.7.x',
    vcpu: 2,
    ram: '2 GB',
    disk: '20 GB',
    nics: 'WAN/VMnet8, LAN/VMnet2, OPT1/VMnet3',
    ips: ['WAN 192.168.19.133', '192.168.100.1', '192.168.200.1'],
    role: 'Router & firewall',
    snapshot: 'clean-rules-applied',
  },
  {
    name: 'ubuntu-base',
    os: 'Ubuntu Server 24.04.4 LTS',
    vcpu: 2,
    ram: '2 GB',
    disk: '20 GB',
    nics: 'VMnet2',
    ips: ['192.168.100.10'],
    role: 'LAN SSH target',
    snapshot: 'ssh-baseline',
  },
  {
    name: 'debian-base',
    os: 'Debian 12 (bookworm)',
    vcpu: 1,
    ram: '1 GB',
    disk: '15 GB',
    nics: 'VMnet2',
    ips: ['192.168.100.11'],
    role: 'LAN second host',
    snapshot: 'pristine',
  },
  {
    name: 'rocky-base',
    os: 'Rocky Linux 10.1 (Red Quartz)',
    vcpu: 1,
    ram: '1 GB',
    disk: '15 GB',
    nics: 'VMnet3',
    ips: ['192.168.200.12'],
    role: 'LAB200 test client (originates inter-subnet traffic)',
    snapshot: 'pristine',
  },
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
    netplus: '—',
    ccna: '—',
    msp: 'Workstation builds, hardware swaps, BIOS/UEFI, repair vs replace decisions',
    category: 'hardware',
  },
  {
    element: 'VMware Workstation Pro install and config',
    aplus: '1201 4.1, 1202 1.10',
    netplus: '1.2',
    ccna: '—',
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
    msp: 'Tier-1 Linux triage: systemctl, journalctl, package install, log review',
    category: 'ops',
  },
  {
    element: 'OpenSSH server hardening (pw -> key -> port -> fail2ban)',
    aplus: '1202 2.7, 4.9',
    netplus: '4.1, 4.3',
    ccna: '4.8, 5.3',
    msp: 'Remote server access, jump hosts, MFA for admin sessions',
    category: 'security',
  },
  {
    element: 'Snapshot strategy (pre-change, named, rolled back)',
    aplus: '1202 4.2, 4.3',
    netplus: '3.2, 3.3',
    ccna: '—',
    msp: 'Pre-change snapshots on Hyper-V/VMware/Proxmox at client sites',
    category: 'ops',
  },
  {
    element: 'Documentation (this portfolio)',
    aplus: '1202 4.1',
    netplus: '3.2',
    ccna: '—',
    msp: 'Runbooks, knowledge base articles, client environment docs',
    category: 'ops',
  },
  {
    element: 'Cisco Packet Tracer foundation (2960, SVI, 2 PCs)',
    aplus: '—',
    netplus: '2.3, 2.4',
    ccna: '2.1, 2.2, 2.4',
    msp: 'Reading switch configs, switch refresh support, VLAN troubleshooting',
    category: 'cisco',
  },
  {
    element: 'Eve-NG Pro installed (post-A+ activation)',
    aplus: '1201 4.1',
    netplus: '—',
    ccna: '6.1',
    msp: 'Pre-deployment device labs, recreating client topology to test changes',
    category: 'cisco',
  },
];

export type CoverageLevel = 'light' | 'light-to-moderate' | 'moderate' | 'strong';

export const certCoverage: { exam: string; band: string; level: CoverageLevel; notes: string }[] = [
  {
    exam: 'A+ 220-1201 (Core 1)',
    band: 'Moderate',
    level: 'moderate',
    notes: 'Virtualization and PC hardware are direct. Mobile devices, printers, and OS imaging are not in the lab.',
  },
  {
    exam: 'A+ 220-1202 (Core 2)',
    band: 'Light-to-moderate',
    level: 'light-to-moderate',
    notes: 'Linux features, backup, and remote access are direct. Most Windows-side OS, mobile, and macOS objectives are not.',
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
    notes: 'Single Packet Tracer scene to date. IOS configuration, OSPF, services on IOS, security, wireless, and automation are the Phase 5 ramp.',
  },
];

export const coverageMethodology =
  'Self-assessed against the published blueprints. Bands reflect what the lab and prior work directly cover; study and exam prep close the remainder. Not a substitute for the exams themselves.';

export const skillsOverview = [
  {
    column: 'Operating Systems',
    items: ['Windows', 'Linux (Ubuntu, Debian, Rocky)', 'Basic shell'],
  },
  {
    column: 'Networking',
    items: ['TCP/IP', 'DNS', 'DHCP', 'Switching', 'VLANs', 'Firewall rules', 'OSI model'],
  },
  {
    column: 'Identity and Tooling',
    items: ['Active Directory', 'ServiceNow', 'Jira', 'Microsoft 365'],
  },
];

export const phases = [
  {
    id: 1,
    title: 'Foundation',
    status: 'complete' as const,
    period: 'Prior to doc',
    summary: 'Host build, VMware install, Packet Tracer foundation scene.',
    items: [
      'Built Ryzen 9 host',
      'Installed Windows 11 Pro + VMware Workstation Pro',
      'Cisco Packet Tracer: 2960 + VLAN1 SVI + 2 PCs',
    ],
  },
  {
    id: 2,
    title: 'pfSense & Multi-Subnet Lab',
    status: 'complete' as const,
    period: '~3 weeks of evenings',
    summary: 'Two routed /24 subnets behind pfSense with three firewall rules and named snapshots.',
    items: [
      'pfSense CE 2.7.x routing LAN + LAB200',
      'Ubuntu/Debian/Rocky VMs distributed across subnets',
      'Three firewall rules + documented implicit deny',
      'Snapshot strategy: clean-install, baseline, pre-change',
    ],
  },
  {
    id: 3,
    title: 'Windows Server, AD, GPO, Monitoring',
    status: 'planned' as const,
    period: 'Aug 2026 - Feb 2027 (post-A+)',
    summary:
      'Six-month window covering AD-integrated DNS, GPO testing across subnets, a file server, and a lightweight monitoring stack. Wider scope than 3 months because juggling Phase 3 with a new MSP job means evenings, not full days.',
    items: [
      'Windows Server 2022 DC at lab.weaver.local',
      'OUs: Users, Computers, Groups, Service Accounts, Disabled',
      '5+ GPOs: password policy, banner, drive mapping, lock, audit',
      'File share with AGDLP-style permissions',
      'Zabbix/LibreNMS: pfSense SNMP + DC agent',
    ],
    note: 'Scope may narrow based on what gets used at work first.',
  },
  {
    id: 4,
    title: 'Nested Proxmox',
    status: 'planned' as const,
    period: 'Nov 2026 - Jan 2027',
    summary: 'Proxmox VE nested under VMware to prove nested virt and learn the platform.',
    items: [
      'Proxmox VE inside VMware (SVM/nested enabled)',
      '60 GB nested disk, two Debian guests',
      'Proxmox CLI + web UI fluency',
    ],
  },
  {
    id: 5,
    title: 'Cisco Labs (Packet Tracer + Eve-NG)',
    status: 'planned' as const,
    period: 'Jan-Jul 2027, parallel to CCNA',
    summary: 'Seven-phase Packet Tracer plan plus Eve-NG ramp with real IOSv images.',
    items: [
      'VLANs + 802.1Q trunking',
      'Router-on-a-stick + inter-VLAN routing',
      'Static routing -> OSPF (single area, then multi-area)',
      'DHCP/NTP/SSH on IOS',
      'Extended ACLs, port security, BPDU guard',
    ],
  },
];

export const certs = [
  {
    name: 'CompTIA A+ Core 1',
    code: '220-1201',
    status: 'passed' as const,
    target: 'Passed May 18, 2026',
    why: 'Hardware, networking, virtualization, mobile devices. First half of the MSP gatekeeper cert.',
  },
  {
    name: 'CompTIA A+ Core 2',
    code: '220-1202',
    status: 'in-progress' as const,
    target: 'Mid-June 2026',
    why: 'Operating systems, security, software troubleshooting, operational procedures. Second half of the A+.',
  },
  {
    name: 'Cisco CCNA',
    code: '200-301 v1.1',
    status: 'queued' as const,
    target: 'Q3-Q4 2027',
    why: 'Real network engineering credential, MSP tier-2 / NOC eligibility.',
  },
  {
    name: 'CompTIA Network+',
    code: 'N10-009',
    status: 'optional' as const,
    target: 'TBD',
    why: 'Useful if a specific employer requires it; CCNA exceeds the blueprint.',
  },
  {
    name: 'Cisco CCNP Enterprise',
    code: '350-401 ENCOR + concentration',
    status: 'long-term' as const,
    target: '2028-2029',
    why: 'Career goal, network engineer track.',
  },
  {
    name: 'CompTIA Security+',
    code: 'SY0-701',
    status: 'long-term' as const,
    target: 'TBD',
    why: 'Cybersecurity as secondary specialization on a security engineering track.',
  },
];

export const careerStages = [
  {
    title: 'MSP Entry-Level',
    horizon: 'Next 0-18 months',
    roles: ['Tier-1 service desk', 'Help desk technician', 'Technical alignment specialist', 'NOC technician', 'Junior sysadmin'],
    bringing: [
      'Hands-on virtualization + networking that maps to real client environments',
      'Linux server fluency at help-desk depth',
      'Documentation discipline (this portfolio)',
      'Custom PC build background',
      'Python scripting for automation',
      'A+ in hand by start date',
    ],
    learning: [
      'PSA/RMM stack (ConnectWise, Datto, Kaseya, NinjaOne)',
      'Microsoft 365 admin in production (Exchange, SharePoint, Intune)',
      'Ticketing flow and SLA discipline at MSP pace',
      'Client-facing communication standards',
    ],
  },
  {
    title: 'Network Engineer',
    horizon: '~2029-2030',
    roles: ['MSP network engineer', 'Enterprise NetOps', 'Regional NOC engineer'],
    bringing: [
      'CCNA done, CCNP in progress',
      '18-24 months production network experience',
      'Documented ticket and project track record',
      'Lab grown into used-enterprise rack with real Cisco gear',
    ],
    learning: [],
  },
  {
    title: 'Long-term',
    horizon: 'Senior network or security engineering role',
    roles: [],
    bringing: [
      'Deep technical foundation across networking, systems, and security',
      'Years of MSP/NOC ops experience by this point',
      'A strong professional network in the Indianapolis tech scene',
    ],
    learning: [],
  },
];

export const tradingBot = {
  name: 'Python Scheduled Automation Project',
  lead: 'Scheduled Python service covering API authentication, structured logging, error handling, and retry logic against rate limits and intermittent failures.',
  target: 'Target API is Polymarket.',
  repoStatus: 'Private repo, code review available on request.',
  components: [
    {
      name: 'Execution engine',
      role: 'API authentication, order placement, position management, structured logging of every transaction',
    },
    {
      name: 'Signal and probability engine',
      role: 'Real-time data from Kalshi, The Odds API, Binance, and FedWatch, blended into signal estimates',
    },
  ],
  skills: [
    'API authentication across multiple providers (OAuth, API keys, signed requests)',
    'Scheduled job design (cron-like, idempotency, missed-run handling)',
    'Structured logging (JSON, levels, rotation)',
    'Error handling under real conditions (network failures, rate limits, partial fills)',
    'Multi-source data fusion into a single internal model',
    'Observability and recovery: structured logs, retries with backoff, idempotent reruns',
  ],
  honesty: "Solo project. Doesn't demonstrate team workflows, code review at scale, or CI/CD pipelines.",
};

export const bashApp = {
  name: 'Bash Learning App',
  pitch: 'Twelve bash topics, 8-12 exercises each, scenarios tied back to the home lab.',
  repoStatus: 'Private repo, walkthrough available on request.',
  exercises: [
    { topic: 'File operations', sample: 'Find all .conf files in /etc modified in the last 7 days; copy to timestamped backup dir.' },
    { topic: 'Process management', sample: 'Find every ssh process owned by charlie, sort by CPU, write top 3 PIDs to a file.' },
    { topic: 'Text processing', sample: 'Parse /var/log/auth.log; count failed login attempts per source IP.' },
    { topic: 'Network commands', sample: 'Ping every host in 192.168.200.0/24, report which are alive.' },
    { topic: 'Scripting basics', sample: 'Snapshot a list of VM names via VMware CLI, with rollback on failure.' },
    { topic: 'Permissions', sample: 'Set up a directory where two users can share files but neither can delete the other.' },
  ],
};
