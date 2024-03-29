// uno.config.ts
import presetWind from '@unocss/preset-wind'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [presetWind()],
  safelist: [
    'outline-red-500',
    'outline-4',
    ...['none', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
      (n) => `grid-cols-${n}`
    ),
  ],
})
