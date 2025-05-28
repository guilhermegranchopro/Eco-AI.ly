/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        light: {
          background: '#f8fafc',
          surface: '#ffffff',
          'surface-secondary': '#f1f5f9',
          'surface-tertiary': '#e2e8f0',
          text: '#374151',
          'text-secondary': '#6b7280',
          'text-muted': '#9ca3af',
          border: '#e5e7eb',
          'border-light': '#f3f4f6',
        }
      }
    },
  },
  plugins: [],
};
