/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        siem: {
          bg: '#0D0F12',
          card: '#151A1F',
          border: '#1F2933',
          primary: '#A3FF12',
          secondary: '#22C55E',
          'text-primary': '#E5E7EB',
          'text-secondary': '#9CA3AF',
          'text-muted': '#6B7280'
        }
      },
      boxShadow: {
        'siem-card': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.5)',
        'siem-glow': '0 0 20px rgba(163, 255, 18, 0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
