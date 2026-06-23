import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

const flatten = (c) => (Array.isArray(c) ? c : [c]);

const config = [
  { ignores: ['.next/**', 'out/**', 'node_modules/**', 'scripts/**', '.claude/**'] },
  ...flatten(coreWebVitals),
  ...flatten(typescript),
];

export default config;
