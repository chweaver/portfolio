import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-plex-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-bricolage)', 'var(--font-plex-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Daylight Ops: warm light "operational" palette. Token names kept from
        // the prior dark theme so utilities (bg-bg-card, text-ink-dim, etc.)
        // cascade to the new values.
        bg: {
          DEFAULT: '#eef1f5', // paper (cool light mist)
          elevated: '#f7f9fb', // surface-2: pills, sunken rows, table headers
          card: '#ffffff', // surface: cards / panels
          border: '#dbe1e9', // hairline borders
          'border2': '#c5ceda', // stronger border: ghost buttons, node pills (bg-bg-border2)
        },
        accent: {
          DEFAULT: '#2c5bd6', // slate blue
          dim: '#234ebe', // accent text on light (AA-safe), and hover
          glow: '#234ebe',
          wash: '#eaf0fc', // accent-tinted backgrounds
        },
        ink: {
          DEFAULT: '#28323f', // body
          strong: '#161d27', // headings, key values
          dim: '#586577', // secondary text
          faint: '#8a96a6', // mono labels, captions
        },
        signal: {
          green: '#1e8a5a',
          amber: '#c77a12',
          red: '#c0392b',
        },
      },
      boxShadow: {
        sm: '0 1px 2px rgba(20,40,80,0.05)',
        card: '0 10px 26px -18px rgba(20,40,80,0.4), 0 1px 2px rgba(20,40,80,0.04)',
        lift: '0 18px 38px -20px rgba(20,40,80,0.45)',
        glow: '0 8px 18px -10px rgba(44,91,214,0.7)',
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
