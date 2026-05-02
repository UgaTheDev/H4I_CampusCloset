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
          olive:        { DEFAULT: '#3F604D', light: '#C1CEBF' },
          blue:         { DEFAULT: '#7B8CAB', light: '#CED8E0' },
          tan:          { DEFAULT: '#BB8F5C', light: '#F4E8DB' },
          lavender:     { DEFAULT: '#7C6C89', light: '#DFD6E3' },
          brown:        { DEFAULT: '#4D3A29', light: '#8B6644' },
          cream:        '#F7F4F0',
          'dark-olive':  '#5F6A4F',
          terra:        '#C5543A',
          text:         '#222222',
          'stat-green': '#F6F7F4',
          'stat-tan':   '#EDE7DD',
          'stat-terra': '#FDF5F3',
          'faq-active': '#F5F7F9',
        },
      },
      fontFamily: {
        display: ['"Brasika Display"', 'serif'],
        body: ['Telegraf', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
