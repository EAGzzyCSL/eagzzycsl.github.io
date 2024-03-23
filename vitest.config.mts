import { defineConfig } from 'vitest/config'
import * as path from 'path'
import * as jsYaml from 'js-yaml'

export default defineConfig({
  test: {
    include: ['**/*.test.{ts,tsx,js}'],
    exclude: ['node_modules', 'packages/site/.next/**'],
    coverage: {
      reporter: ['text', 'text-summary'],
    },
    alias: {
      '@': path.resolve(__dirname, './packages/site'),
    },
    environment: 'jsdom',
  },
  plugins: [
    {
      name: '',
      transform(code, id) {
        if (id.endsWith('.yaml')) {
          return `export default ${JSON.stringify(jsYaml.load(code))};`
        }
      },
    },
  ],
})
