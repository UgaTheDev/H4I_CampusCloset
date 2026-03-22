import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          olive: '#4A5540',
          sage: '#8B9B7E',
          tan: '#C4AA82',
          khaki: '#B8A88A',
          lavender: '#9B8EA8',
          brown: '#3E2C1C',
          cream: '#F5F0E8',
        },
      },
      fontFamily: {
        display: ['Brasika', 'serif'],
        body: ['Telegraf', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
