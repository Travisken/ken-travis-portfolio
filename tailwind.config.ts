import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ['var(--font-quicksand)', 'sans-serif'],
         bricolage: ['var(--font-bricolage)', 'sans-serif'],
        shadows: ['var(--font-shadows)', 'cursive']
      }
    }
  },
  plugins: []
}

export default config
