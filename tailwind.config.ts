import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
      colors: {
        bg: {
          DEFAULT: '#0a0e14',
          elevated: '#0f141b',
          card: '#141b24',
          border: '#1f2937',
        },
        accent: {
          DEFAULT: '#22d3ee',
          dim: '#0891b2',
          glow: '#67e8f9',
        },
        ink: {
          DEFAULT: '#e5e7eb',
          dim: '#9ca3af',
          // Lightened from #6b7280 (about 3.8:1 on the page bg, fails WCAG AA for
          // small text) to clear 4.5:1 for the small mono labels that use it.
          faint: '#7c8492',
        },
        signal: {
          green: '#10b981',
          amber: '#f59e0b',
          red: '#ef4444',
        },
      },
      boxShadow: {
        glow: '0 0 24px rgba(34, 211, 238, 0.15)',
        card: '0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 24px rgba(0,0,0,0.35)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
