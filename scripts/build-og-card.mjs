// Renders the Open Graph share card (public/og-card.png, 1200x630) from an SVG via
// sharp. Run after editing the copy or brand below:  node scripts/build-og-card.mjs
// Keep the copy honest and em-dash free (commas, periods, colons, middots only).
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, '..', 'public', 'og-card.png');

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="50%" cy="0%" r="75%">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.16"/>
      <stop offset="55%" stop-color="#22d3ee" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0 H0 V48" fill="none" stroke="#94a3b8" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="#0a0e14"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <text x="80" y="104" font-family="'JetBrains Mono', monospace" font-size="30">
    <tspan fill="#10b981">$ </tspan><tspan fill="#e5e7eb">charlie@homelab:~</tspan>
  </text>
  <rect x="80" y="120" width="316" height="2" fill="#22d3ee"/>

  <text x="76" y="252" font-family="Inter, Arial, sans-serif" font-size="100" font-weight="700" fill="#e5e7eb">Charlie Weaver</text>

  <text x="80" y="314" font-family="Inter, Arial, sans-serif" font-size="36" font-weight="600" fill="#22d3ee">MSP tier-1 service desk candidate</text>

  <text x="80" y="372" font-family="'JetBrains Mono', monospace" font-size="25" fill="#9ca3af">Live Active Directory domain  ·  pfSense + firewall lab</text>
  <text x="80" y="408" font-family="'JetBrains Mono', monospace" font-size="25" fill="#9ca3af">CompTIA A+ Core 1 passed  ·  documented and verified</text>

  <text x="80" y="556" font-family="'JetBrains Mono', monospace" font-size="22" fill="#6b7280">Carmel, IN  ·  Indianapolis metro</text>
  <text x="1120" y="556" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="22" font-weight="700" fill="#22d3ee">chweaver.github.io/portfolio</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log('Wrote', out);
