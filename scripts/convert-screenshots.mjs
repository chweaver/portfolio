import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TARGET_DIR = path.join(ROOT, 'public', 'logs');
const QUALITY = 80;

const files = await fs.readdir(TARGET_DIR);
const pngs = files.filter((f) => f.toLowerCase().endsWith('.png'));

if (pngs.length === 0) {
  console.log(`No PNGs found in ${TARGET_DIR}`);
  process.exit(0);
}

const results = [];
for (const file of pngs) {
  const src = path.join(TARGET_DIR, file);
  const dest = path.join(TARGET_DIR, file.replace(/\.png$/i, '.webp'));
  const img = sharp(src);
  const meta = await img.metadata();
  await img.webp({ quality: QUALITY }).toFile(dest);
  const srcStat = await fs.stat(src);
  const destStat = await fs.stat(dest);
  results.push({
    file,
    width: meta.width,
    height: meta.height,
    pngKB: Math.round(srcStat.size / 1024),
    webpKB: Math.round(destStat.size / 1024),
  });
}

console.table(results);
console.log(`\nWrote ${results.length} WebP files at quality ${QUALITY}. PNG originals untouched.`);
