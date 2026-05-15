import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const repo = process.env.GITHUB_PAGES_REPO || '';
const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd && repo ? `/${repo}` : '';

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath,
  assetPrefix: isProd && repo ? `/${repo}/` : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  turbopack: { root: __dirname },
};

export default nextConfig;
