/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
  ],
  theme: {
    extend: {
      // ─── COLOUR SYSTEM ────────────────────────────────────────────────────
      // Drawn from the brand asset library: forest-green emblem, cream running
      // figure, silver-sage olive foliage, and warm terracotta aged urns.
      colors: {
        primary: {
          50:  '#F2F5F1',
          100: '#E0E8DD',
          200: '#C2D1BC',
          300: '#9DB495',
          400: '#6F8E66',
          500: '#4E7044',
          600: '#3A5732',  // primary brand green
          700: '#2E4628',
          800: '#23371F',
          900: '#1A2A17',  // near-black green for deep text on cream
          DEFAULT: '#2E4628',
        },
        secondary: {
          50:  '#F6F7F3',
          100: '#E9ECE1',
          200: '#D6DAC8',
          300: '#BCC3A6',
          400: '#9FA886',
          500: '#838D6A',  // olive sage
          600: '#697254',
          700: '#525941',
          800: '#3E4332',
          900: '#2B2F23',
          DEFAULT: '#838D6A',
        },
        accent: {
          50:  '#FBF1EC',
          100: '#F4DDD0',
          200: '#E8BCA3',
          300: '#D99772',
          400: '#C9784F',
          500: '#B45F38',  // terracotta — primary CTA fill
          600: '#984B2C',
          700: '#7A3C25',
          800: '#5E2F1F',
          900: '#46241A',
          DEFAULT: '#B45F38',
        },
        // Page atmosphere — warm cream/limestone (replaces clinical white)
        background: '#F7F4EC',
        // Elevated cards, panels — pure white reads "fresh" against cream
        surface: '#FFFFFF',
        // Deep green-black body text on cream
        'text-base': '#1F2A1A',
        // Olive-grey secondary text, captions, labels
        'text-muted': '#5E6B54',
        // Soft sand — dividers, card edges, input outlines
        border: '#E2DCCB',
      },

      // ─── TYPOGRAPHY ───────────────────────────────────────────────────────
      // Fraunces — high-contrast old-style serif, crafted/editorial/heritage
      // Mulish   — warm humanist sans, legible and reassuring for the audience
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body:    ['Mulish', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem',   { lineHeight: '1.02', letterSpacing: '-0.02em'  }],
        'display-lg': ['3.25rem',  { lineHeight: '1.06', letterSpacing: '-0.015em' }],
        'heading-xl': ['2.25rem',  { lineHeight: '1.15', letterSpacing: '-0.01em'  }],
        'heading-lg': ['1.75rem',  { lineHeight: '1.2',  letterSpacing: '-0.005em' }],
        'heading-md': ['1.375rem', { lineHeight: '1.3'                             }],
        'body-lg':    ['1.1875rem',{ lineHeight: '1.7'                             }],
        'body-md':    ['1.0625rem',{ lineHeight: '1.7'                             }],
        'body-sm':    ['0.9375rem',{ lineHeight: '1.6'                             }],
        'label':      ['0.8125rem',{ lineHeight: '1.4', letterSpacing: '0.12em', fontWeight: '600' }],
      },

      // ─── SPACING & LAYOUT ─────────────────────────────────────────────────
      // spacing tokens → py-section, py-section-lg, gap-section, etc.
      spacing: {
        'section':    '6rem',   // standard section py (desktop); use py-20 mobile
        'section-lg': '8rem',   // hero / major breakpoints
      },
      // maxWidth is a separate Tailwind scale — must be explicit for max-w-container
      maxWidth: {
        'container': '80rem',   // 1280px — used as max-w-container across all sections
      },

      // ─── BORDER RADIUS ────────────────────────────────────────────────────
      borderRadius: {
        'brand':    '0.5rem',  // cards, inputs — soft not bubbly (8px)
        'brand-lg': '1rem',    // feature panels, image containers (16px)
        'pill':     '9999px',  // buttons — gently rounded pill for warmth
      },

      // ─── SHADOWS ──────────────────────────────────────────────────────────
      boxShadow: {
        'brand':    '0 2px 12px -2px rgba(31, 42, 26, 0.08)',    // resting cards
        'brand-lg': '0 16px 40px -12px rgba(31, 42, 26, 0.18)', // hover / elevated
      },
    },
  },
  plugins: [],
};
