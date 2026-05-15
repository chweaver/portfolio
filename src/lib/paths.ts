/**
 * Returns the configured Next.js basePath (set in next.config.mjs).
 * Used to prefix manual asset URLs in <img src> and fetch() calls,
 * because Next.js only auto-prefixes <Link> and next/image — not raw fetch.
 */
export function basePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH || '';
}

/**
 * Build a URL for a static asset under /public, respecting basePath.
 * Encodes the path component so filenames with spaces work in production.
 */
export function publicAsset(path: string): string {
  const clean = path.startsWith('/') ? path.slice(1) : path;
  const encoded = clean.split('/').map(encodeURIComponent).join('/');
  return `${basePath()}/${encoded}`;
}
