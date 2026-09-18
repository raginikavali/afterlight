import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        afterlight: {
          bg: '#07090C',
          'bg-secondary': '#0B0E12',
          surface: '#101419',
          'surface-elevated': '#151A20',
          line: '#242A31',
          'text-muted': '#7E8792',
          'text-secondary': '#AAB2BC',
          'text-primary': '#F3F5F7',
          amber: '#F4B860',
          'amber-bright': '#FFD58A',
          matched: '#B8D8C0',
          warning: '#D8A76A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'hero': 'clamp(3.5rem, 8vw, 9rem)',
        'display': 'clamp(2.5rem, 5vw, 5rem)',
        'heading': 'clamp(1.75rem, 3.5vw, 3.5rem)',
        'subheading': 'clamp(1.25rem, 2vw, 1.75rem)',
      },
      letterSpacing: {
        'display': '-0.04em',
        'heading': '-0.03em',
        'tight': '-0.02em',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'draw-line': 'drawLine 1s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        glow: {
          '0%': { opacity: '0.6' },
          '100%': { opacity: '1' },
        },
        drawLine: {
          '0%': { strokeDashoffset: '100%' },
          '100%': { strokeDashoffset: '0%' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
