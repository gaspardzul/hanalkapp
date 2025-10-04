/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta inspirada en Yelp
        yelp: {
          DEFAULT: '#D32323', // Rojo Yelp
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#D32323', // Rojo principal
          600: '#B91C1C',
          700: '#991B1B',
          800: '#7F1D1D',
          900: '#5F1515',
        },
        neutral: {
          DEFAULT: '#2B2B2B',
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#2B2B2B', // Texto principal
          900: '#171717',
        },
        accent: {
          DEFAULT: '#0073BB', // Azul para enlaces
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#0073BB',
          600: '#0062A3',
          700: '#00528A',
          800: '#004272',
          900: '#003359',
        },
        // Compatibilidad con código existente
        terracota: {
          DEFAULT: '#D32323',
          50: '#FEF2F2',
          500: '#D32323',
          600: '#B91C1C',
        },
        jade: {
          DEFAULT: '#D32323',
          50: '#FEF2F2',
          500: '#D32323',
          600: '#B91C1C',
        },
        gold: {
          DEFAULT: '#D32323',
          500: '#D32323',
          600: '#B91C1C',
        },
        arena: {
          DEFAULT: '#FFFFFF',
          50: '#FFFFFF',
          100: '#FAFAFA',
          200: '#F5F5F5',
        },
        cafe: {
          DEFAULT: '#2B2B2B',
          700: '#2B2B2B',
          800: '#171717',
        },
        azul: {
          DEFAULT: '#0073BB',
          500: '#0073BB',
          600: '#0062A3',
        },
        volcanic: {
          DEFAULT: '#2B2B2B',
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          500: '#737373',
          600: '#525252',
          700: '#2B2B2B',
          800: '#171717',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
