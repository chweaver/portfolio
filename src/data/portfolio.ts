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
  tagline: 'Entry-level IT technician for tier-1 MSP, help desk, and NOC roles in the Indianapolis metro, with hands-on Active Directory, pfSense, and Linux lab experience.',
  headline: 'Entry-level IT technician ready for tier-1 MSP work, with hands-on Active Directory, pfSense, Linux, and documentation experience.',
  labPhase: 'Network lab complete, Active Directory lab in progress (tracked live from the lab guide)',
} as const;

export const summary = {
  built: [
    'Live Active Directory domain (corp.lab): domain controller, OUs, users, AGDLP groups, a domain-joined Windows 11 client, and a verified first GPO',
    'Segmented pfSense lab routing two subnets, with three firewall rules tested and logged',
    'Ubuntu, Debian, and Rocky Linux VMs with hand-configured networking',
    'Public documentation: this site, the AD lab guide, and named snapshots at every clean state',
  ],
  planned: [
    'AD file shares, home folders, login scripts, and help-desk drills (phases 9-12)',
    'Monitoring for pfSense and the domain controller',
    'Proxmox and Cisco lab phases alongside CCNA study',
  ],
  honesty:
    'No professional MSP tenure yet. Built items are complete and verified; planned items are labeled separately.',
};

export const readiness = [
  {
    kicker: 'systems',
    text: 'Windows, Linux, Active Directory basics, and network troubleshooting',
  },
  {
    kicker: 'network',
    text: 'Built and documented a segmented pfSense lab with verified firewall rules',
  },
  {
    kicker: 'directory',
    text: 'Practiced users, OUs, groups, domain controller setup, and AD structure',
  },
  {
    kicker: 'documentation',
    text: 'Writes clear documentation and separates built work from planned work',
  },
  {
    kicker: 'tooling',
    text: 'Comfortable learning PSA/RMM and Microsoft 365 workflows on the job',
  },
  {
    kicker: 'target roles',
    text: 'Service desk, help desk, NOC, technical alignment, and junior sysadmin',
  },
] as const;

export const howIWork = [
  'Verify before claiming',
  'Document steps and outcomes',
  'Keep changes reversible with snapshots and checkpoints',
  'Ask clear questions and escalate with useful notes',
  'Translate technical work into plain English',
] as const;

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

export const labEnvironment = {
  purpose:
    'I built and maintain a local virtualization lab to practice common MSP tasks safely: domain work, firewall changes, Linux triage, and rollbacks, without touching anything in production.',
  platforms: [
    'Windows 11 Pro',
    'VMware Workstation Pro',
    'Windows Server 2022',
    'pfSense CE',
    'Ubuntu Server',
    'Debian',
    'Rocky Linux',
  ],
  hardwareNote:
    'Host: custom Ryzen 9 build, 32 GB DDR5, NVMe storage. The VM load runs well under host capacity, with named snapshots before every risky change.',
} as const;

export const vmInventory = [
  {
    name: 'pfsense-base',
    os: 'pfSense CE 2.7.x',
    proves: 'Routing, firewall policy, and DHCP/DNS authority for both subnets',
    spec: '2 vCPU · 2 GB · WAN/VMnet8 + LAN/VMnet2 + OPT1/VMnet3',
    ips: ['192.168.100.1', '192.168.200.1'],
    snapshot: 'clean-rules-applied',
  },
  {
    name: 'ubuntu-base',
    os: 'Ubuntu Server 24.04.4 LTS',
    proves: 'SSH target and day-to-day Linux troubleshooting practice',
    spec: '2 vCPU · 2 GB · VMnet2',
    ips: ['192.168.100.10'],
    snapshot: 'ssh-baseline',
  },
  {
    name: 'debian-base',
    os: 'Debian 12 (bookworm)',
    proves: 'Second LAN host: package and network-config differences from Ubuntu',
    spec: '1 vCPU · 1 GB · VMnet2',
    ips: ['192.168.100.11'],
    snapshot: 'pristine',
  },
  {
    name: 'rocky-base',
    os: 'Rocky Linux 10.1 (Red Quartz)',
    proves: 'RHEL-family exposure and the cross-subnet test traffic the firewall rules act on',
    spec: '1 vCPU · 1 GB · VMnet3',
    ips: ['192.168.200.12'],
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
    element: 'OpenSSH server hardening (pw -> key -> port -> fail2ban)',
    aplus: '1202 2.7, 4.9',
    netplus: '4.1, 4.3',
    ccna: '4.8, 5.3',
    msp: 'Remote server access, jump hosts, MFA for admin sessions: how you reach client firewalls and routers without exposing credentials',
    category: 'security',
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
    element: 'Eve-NG Pro installed (post-A+ activation)',
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
    items: [
      'Active Directory: domain controller, OUs, users, AGDLP groups',
      'Microsoft 365, ServiceNow, Jira: familiar, not yet hands-on',
    ],
  },
];

export const nearTermPlan = [
  {
    label: 'Finish A+ Core 2',
    detail: 'Core 1 passed May 18, 2026. Core 2 exam targeted for mid-June.',
    status: 'in-progress' as const,
  },
  {
    label: 'Complete the AD lab build-out',
    detail:
      'Group Policy is done. File shares, home folders, login scripts, and help-desk drills are next (phases 9-12, tracked live above).',
    status: 'in-progress' as const,
  },
  {
    label: 'Practice ticket-style troubleshooting drills',
    detail: 'Password resets, account lockouts, drive mappings, and GPO checks, written up like tickets.',
    status: 'planned' as const,
  },
  {
    label: 'Earn a tier-1 MSP, help desk, or NOC seat',
    detail: 'Indianapolis metro. Learn the PSA/RMM stack and ticket flow at production pace.',
    status: 'planned' as const,
  },
  {
    label: 'Continue CCNA study',
    detail: 'Networking depth alongside the day job, with Packet Tracer and Eve-NG labs in the background.',
    status: 'planned' as const,
  },
];

export const planClose =
  'Near-term focus: earn a tier-1 MSP, help desk, or NOC role, build production experience, and keep growing toward network support.';

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
    target: 'In study after Core 2',
    why: 'Networking depth for NOC and network-support work, studied alongside the lab.',
  },
];

export const laterCerts =
  'Later, as the role calls for it: Network+ (if an employer requires it), CCNP Enterprise, and Security+.';

// careerStages removed in v4: the three-stage timeline read as future-heavy for an
// entry-level screen. Near-term focus now lives in nearTermPlan above.
