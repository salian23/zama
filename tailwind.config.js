/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#07080a',
          50: '#f4f4f3',
          100: '#e3e3e0',
          200: '#c4c4bd',
          300: '#9d9d92',
          400: '#6f6f64',
          500: '#494a41',
          600: '#33342c',
          700: '#212219',
          800: '#16170f',
          900: '#0c0d08',
          950: '#07080a',
        },
        tea: {
          50: '#f2f6ee',
          100: '#e2ebd7',
          200: '#c6d8b2',
          300: '#a2bf85',
          400: '#7fa060',
          500: '#5c7d43',
          600: '#456233',
          700: '#354c29',
          800: '#243420',
          900: '#182417',
          950: '#0d150c',
        },
        gold: {
          50: '#fbf6ea',
          100: '#f5e9c9',
          200: '#eed49a',
          300: '#e3ba69',
          400: '#d4a24a',
          500: '#c08c39',
          600: '#a06e2d',
          700: '#7e5426',
          800: '#5f3f22',
          900: '#42301f',
        },
        cream: '#f4ecda',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Manrope"', 'sans-serif'],
      },
      backgroundImage: {
        grain: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      letterSpacing: {
        widest2: '0.35em',
      },
    },
  },
  plugins: [],
}
