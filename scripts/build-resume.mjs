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
    'Hands-on IT technician, CompTIA A+ certified, Security+ in progress. I taught myself by building and running a full home lab the way a real shop would: plan each change, document it, test it. Customer-facing work taught me to stay calm and solve problems for people under pressure, which is the core of good help desk support.',
  skills: [
    ['Systems', 'Windows 10 and 11, Windows Server 2022, Active Directory, Group Policy, Linux (Ubuntu, Debian, Rocky)'],
    ['Networking', 'TCP/IP, DNS, DHCP, VLANs, subnetting, pfSense firewalls'],
    ['Virtualization', 'VMware Workstation Pro, Docker'],
    ['Tools', 'Git, Bash'],
    ['Familiar, not yet hands-on', 'Microsoft 365, ServiceNow, Jira'],
    ['Hardware', 'PC building, troubleshooting, storage configuration'],
  ],
  projects: [
    {
      title: 'Active Directory Domain Lab',
      status: 'In progress, documented',
      bullets: [
        'Run a live Windows Server 2022 domain with users, security groups, Group Policy, file shares, and redirected home folders, the same setup a small business would use.',
        'Joined a Windows 11 client to the domain and verified logins, policies, and folder redirection all apply correctly.',
        'Every phase is written up as a public step-by-step guide on my lab guide sites, linked from my portfolio.',
      ],
    },
    {
      title: 'pfSense Firewall Lab',
      status: 'Complete, documented',
      bullets: [
        'Built a two-subnet virtual network routed through a pfSense firewall in VMware.',
        'Wrote deny-by-default rules that allow only specific SSH traffic, then proved they work with live tests and firewall log captures.',
      ],
    },
    {
      title: 'Linux Server Lab',
      status: 'Ongoing',
      bullets: [
        'Hand-configured Ubuntu, Debian, and Rocky Linux servers, each using a different network configuration method.',
        'They serve as the test machines behind the firewall lab, with snapshots taken before every change.',
      ],
    },
  ],
  experience: [
    {
      title: 'Deli and Prepared Foods Associate, Whole Foods Market, Indianapolis, IN',
      dates: 'March 2026 to April 2026',
      bullets: ['Customer service in a high-volume retail environment with strict food safety standards.'],
    },
    {
      title: 'Shift Supervisor, SubDaze, Zionsville, IN',
      dates: 'July 2025 to October 2025',
      bullets: [
        'Supervised a small team during peak hours and resolved most customer issues without escalation.',
        'Handled cash, inventory checks, and end-of-shift documentation.',
      ],
    },
  ],
  education: [
    'CompTIA A+ (220-1201 and 220-1202): Certified June 2026',
    'CompTIA Security+ (SY0-701): In preparation, exam targeted for late August 2026',
    'CCNA (200-301): Planned',
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
