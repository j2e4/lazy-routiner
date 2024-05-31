import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'ping-slow': 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        // https://www.shutterstock.com/ko/blog/101-free-color-combinations-design-inspiration/
        'theme-neutral': {
          100: '#e1dcd9',
          200: '#8f8681',
          300: '#a67f78',
          330: '#c5aba7',
          350: '#d2bebb',
          400: '#32435f',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
