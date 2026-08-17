/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#FAFAF7',
          alt: '#F0EDE6',
        },
        ink: {
          DEFAULT: '#1A1A1A',
          light: '#3A3A3A',
        },
        muted: {
          DEFAULT: '#6B6960',
        },
        border: {
          DEFAULT: '#E2DED5',
          strong: '#C8C3B8',
        },
        'accent-red': {
          DEFAULT: '#C23A22',
          hover: '#A83020',
          light: '#FCEAE7',
        },
        'accent-teal': {
          DEFAULT: '#1B6B5A',
          hover: '#155A4B',
          light: '#E6F5F0',
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body: ['"Public Sans"', '-apple-system', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(26, 26, 26, 0.04), 0 4px 12px rgba(26, 26, 26, 0.03)',
        'card-hover': '0 4px 16px rgba(26, 26, 26, 0.08), 0 1px 4px rgba(26, 26, 26, 0.04)',
        'elevated': '0 8px 32px rgba(26, 26, 26, 0.10), 0 2px 8px rgba(26, 26, 26, 0.04)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.7s cubic-bezier(0.16,1,0.3,1)',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.16,1,0.3,1)',
        'float': 'float 8s ease-in-out infinite',
        'gallery-scroll': 'galleryScroll 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        galleryScroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-33.333333%))' },
        },
      },
    },
  },
  plugins: [],
}
