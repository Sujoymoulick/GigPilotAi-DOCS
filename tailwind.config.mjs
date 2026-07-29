/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Astro Starlight specific colors
        sl: {
          // Deep dark space colors
          bg: '#0f0e17', // main body background
          sidebar: '#16141f', // sidebar background
          card: '#16141f', // card background
          code: '#16141f', // code block background
          header: '#0f0e17', // header background
          
          // Accent colors (Indigo/Purple)
          accent: {
            50: '#f5f3ff',
            100: '#ede9fe',
            200: '#ddd6fe',
            300: '#c084fc', // accent-high
            400: '#a78bfa',
            500: '#8b5cf6', // main accent purple
            600: '#7c3aed',
            700: '#6d28d9',
            800: '#5b21b6',
            900: '#4c1d95',
            950: '#2e1065',
          },
          
          // Star/Gold accent colors
          gold: {
            DEFAULT: '#ffd60a',
            hover: '#eab308',
            low: 'rgba(254, 240, 138, 0.1)',
          },

          // Muted text colors (Gray-Violet)
          gray: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#c3c1d1', // secondary text
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
            950: '#020817',
          }
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      typography: (theme) => ({
        starlight: {
          css: {
            '--tw-prose-body': theme('colors.sl.gray.300'),
            '--tw-prose-headings': '#ffffff',
            '--tw-prose-lead': theme('colors.sl.gray.400'),
            '--tw-prose-links': theme('colors.sl.accent.300'),
            '--tw-prose-bold': '#ffffff',
            '--tw-prose-counters': theme('colors.sl.gray.400'),
            '--tw-prose-bullets': theme('colors.sl.gray.500'),
            '--tw-prose-hr': 'rgba(255, 255, 255, 0.1)',
            '--tw-prose-quotes': theme('colors.sl.gray.200'),
            '--tw-prose-quote-borders': theme('colors.sl.accent.500'),
            '--tw-prose-captions': theme('colors.sl.gray.400'),
            '--tw-prose-code': theme('colors.sl.accent.300'),
            '--tw-prose-pre-code': theme('colors.sl.gray.200'),
            '--tw-prose-pre-bg': theme('colors.sl.code'),
            '--tw-prose-th-borders': 'rgba(255, 255, 255, 0.1)',
            '--tw-prose-td-borders': 'rgba(255, 255, 255, 0.05)',
            maxWidth: 'none',
            color: theme('colors.sl.gray.300'),
            a: {
              color: theme('colors.sl.accent.300'),
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': { color: theme('colors.sl.accent.200'), textDecoration: 'underline' },
            },
            'h1, h2, h3, h4': { color: '#ffffff', fontWeight: '700' },
            strong: { color: '#ffffff' },
            code: {
              color: theme('colors.sl.accent.300'),
              backgroundColor: 'rgba(139, 92, 246, 0.15)',
              padding: '0.15em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '500',
              fontSize: '0.875em',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            pre: {
              backgroundColor: theme('colors.sl.code'),
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '0.5rem',
              color: theme('colors.sl.gray.200'),
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
              padding: 0,
            },
            th: {
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              color: '#ffffff',
              fontWeight: '600',
            },
            td: {
              color: theme('colors.sl.gray.300'),
            },
            blockquote: {
              borderLeftColor: theme('colors.sl.accent.500'),
              backgroundColor: 'rgba(139, 92, 246, 0.05)',
              color: theme('colors.sl.gray.300'),
            },
          },
        },
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.sl.gray.900'),
            '--tw-prose-headings': theme('colors.sl.gray.950'),
            '--tw-prose-links': theme('colors.sl.accent.600'),
            '--tw-prose-bold': theme('colors.sl.gray.950'),
            '--tw-prose-code': theme('colors.sl.accent.700'),
            '--tw-prose-pre-bg': theme('colors.sl.gray.100'),
            maxWidth: 'none',
            code: {
              backgroundColor: theme('colors.sl.gray.100'),
              color: theme('colors.sl.accent.700'),
              padding: '0.1em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '500',
              fontSize: '0.875em',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
          },
        },
      }),
      animation: {
        'fade-in': 'fadeIn 0.35s ease-out',
        'slide-down': 'slideDown 0.25s ease-out',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0', transform: 'translateY(6px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { from: { opacity: '0', transform: 'translateY(-6px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.25)',
        'glow-gold': '0 0 20px rgba(255, 214, 10, 0.25)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
