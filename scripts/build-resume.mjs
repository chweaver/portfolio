// Renders public/Charlie-Weaver-Resume.pdf from the RESUME content block below.
// To update the resume: edit RESUME, run `node scripts/build-resume.mjs`, open the
// PDF to eyeball it, then commit this script and the PDF together. Keep the copy
// rules from AGENTS.md section 10: no em dashes, honest claims only.
import PDFDocument from 'pdfkit';
import { createWriteStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const out = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'Charlie-Weaver-Resume.pdf');

const RESUME = {
  name: 'Charles Weaver',
  contact: ['Carmel, IN', 'charliewgz6@gmail.com', 'linkedin.com/in/charlie-weaver-it', 'chweaver.github.io/portfolio'],
  summary:
    "CompTIA A+ certified, with Network+ in progress. My hands-on experience comes from a home lab I built and document: a Windows Server 2022 Active Directory domain, a Proxmox VE server, a pfSense-segmented network, and Linux servers. I've built or rebuilt 6 to 10 PCs for other people and handle tech support for family and friends. I've also worked customer-facing jobs where I regularly ran the store solo.",
  skills: [
    ['Systems', 'Windows 10 and 11, Windows Server 2022, Linux (Ubuntu, Debian, Rocky), macOS, Chrome OS'],
    ['Active Directory', 'Users, security groups, Group Policy, file shares, folder redirection, login scripts, drive maps'],
    ['Networking', 'TCP/IP, DNS, DHCP, VLANs, subnetting, pfSense firewall rules, network segmentation'],
    ['Virtualization', 'Proxmox VE (VMs, containers, GPU passthrough, backups), VMware Workstation Pro, Docker'],
    ['Hardware and support', 'PC building and repair, part diagnosis and replacement, printers, home Wi-Fi and networks'],
    ['Tools', 'Git, Bash, PowerShell basics, Python'],
    ['Familiar, not yet hands-on', 'Microsoft 365, ServiceNow, Jira'],
  ],
  projects: [
    {
      title: 'Active Directory Domain Lab',
      status: 'In progress, documented',
      bullets: [
        'Run a Windows Server 2022 domain controller with a domain-joined Windows 11 workstation; create and manage user accounts, security groups, and Group Policy objects.',
        'Configured file shares, redirected home folders, login scripts, and mapped drives, each verified at user login.',
        'Every phase is written up as a public step-by-step guide, linked from my portfolio.',
      ],
    },
    {
      title: 'Proxmox Home Server',
      status: 'Running',
      bullets: [
        'Built a Proxmox VE host from spare parts and run virtual machines and containers on it: local AI with GPU passthrough, Home Assistant, DNS, and a game server, with restore-tested backups.',
        'Traced a no-power failure to a dead power supply, replaced it, and brought every guest back up.',
      ],
    },
    {
      title: 'pfSense Firewall Lab',
      status: 'Complete, documented',
      bullets: [
        'Built a two-subnet network routed through a pfSense firewall in VMware, wrote deny-by-default rules that allow only specific SSH traffic, and proved them with live tests and firewall log captures.',
      ],
    },
    {
      title: 'Linux Server Lab',
      status: 'Ongoing',
      bullets: [
        "Hand-configured Ubuntu, Debian, and Rocky Linux servers with each distribution's native network tooling, then completed and validated SSH hardening on Ubuntu (key-only login, ufw, fail2ban).",
      ],
    },
  ],
  experience: [
    {
      title: 'Informal IT support, family and friends',
      dates: 'Ongoing',
      bullets: [
        'Built or rebuilt 6 to 10 PCs for other people.',
        'Repair and upgrades, Wi-Fi and home networks, phone and account help, printers and smart home devices.',
      ],
    },
    {
      title: 'Team Member, SubDaze, Zionsville, IN',
      dates: 'July 2025 to October 2025',
      bullets: [
        'Regularly operated the store solo, handling customers, POS, and closing tasks without on-site backup.',
        'Managed cash accountability and end-of-shift documentation.',
      ],
    },
  ],
  education: [
    'CompTIA A+ (220-1201 and 220-1202): Certified June 2026',
    'CompTIA Network+ (N10-009): In progress. CCNA (200-301): Planned next',
    'Carmel High School, Graduated 2024',
  ],
};

// Layout constants (US letter, matches the original template: blue small-caps
// section headers over a light rule, bold rows with right-aligned italic notes).
const MARGIN = 48;
const MARGIN_BOTTOM = 40;
const PAGE_W = 612;
const CONTENT_W = PAGE_W - MARGIN * 2;
const BLUE = '#2f80ed';
const INK = '#1f2328';
const BODY = '#3f4650';
const FAINT = '#6b7280';
const RULE = '#e2e5e9';

const doc = new PDFDocument({
  size: 'letter',
  margins: { top: MARGIN, bottom: MARGIN_BOTTOM, left: MARGIN, right: MARGIN },
  info: { Title: 'Charles Weaver Resume', Author: 'Charles Weaver' },
});
doc.pipe(createWriteStream(out));

// Start a new page instead of splitting a row across the page boundary
// (pdfkit would otherwise leave the bullet dot behind on the old page).
function guard(needed) {
  if (doc.y + needed > doc.page.height - MARGIN_BOTTOM) doc.addPage();
}

function section(title) {
  doc.moveDown(0.6);
  guard(48);
  doc.font('Helvetica-Bold').fontSize(10).fillColor(BLUE);
  doc.text(title.toUpperCase(), MARGIN, doc.y, { characterSpacing: 1.4 });
  const y = doc.y + 3;
  doc.moveTo(MARGIN, y).lineTo(PAGE_W - MARGIN, y).lineWidth(0.8).strokeColor(RULE).stroke();
  doc.y = y + 8;
}

function titleRow(left, right) {
  guard(30);
  const y = doc.y;
  doc.font('Helvetica-Bold').fontSize(10).fillColor(INK);
  doc.text(left, MARGIN, y, { width: CONTENT_W - 112 });
  const after = doc.y;
  doc.font('Helvetica-Oblique').fontSize(9).fillColor(FAINT);
  doc.text(right, MARGIN, y + 1, { width: CONTENT_W, align: 'right' });
  doc.y = Math.max(after, doc.y) + 1;
}

function bullet(text) {
  guard(24);
  const y = doc.y;
  doc.font('Helvetica').fontSize(10).fillColor(BODY);
  doc.text('•', MARGIN + 4, y);
  doc.text(text, MARGIN + 16, y, { width: CONTENT_W - 16, lineGap: 1.2 });
  doc.y += 2;
}

// Header
doc.font('Helvetica-Bold').fontSize(22).fillColor(INK).text(RESUME.name, MARGIN, MARGIN);
doc.moveDown(0.25);
doc.font('Helvetica').fontSize(9.5).fillColor(FAINT).text(RESUME.contact.join('  |  '));

section('Summary');
doc.font('Helvetica').fontSize(10).fillColor(BODY).text(RESUME.summary, { width: CONTENT_W, lineGap: 1.4 });

section('Technical skills');
for (const [label, items] of RESUME.skills) {
  doc.font('Helvetica-Bold').fontSize(10).fillColor(INK).text(`${label}: `, MARGIN, doc.y, { continued: true, lineGap: 1.4 });
  doc.font('Helvetica').fillColor(BODY).text(items, { width: CONTENT_W, lineGap: 1.4 });
  doc.y += 1;
}

section('Projects');
for (const p of RESUME.projects) {
  titleRow(p.title, p.status);
  for (const b of p.bullets) bullet(b);
  doc.y += 2;
}

section('Experience');
for (const job of RESUME.experience) {
  titleRow(job.title, job.dates);
  for (const b of job.bullets) bullet(b);
  doc.y += 2;
}

section('Education and certifications');
for (const line of RESUME.education) bullet(line);

doc.end();
console.log('Wrote', out);
