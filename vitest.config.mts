import { defineConfig } from 'vitest/config'
import * as path from 'path'
import * as jsYaml from 'js-yaml'

export default defineConfig({
  oxc: {
    jsx: { runtime: 'automatic' },
  },
  test: {
    include: ['**/*.test.{ts,tsx,js}'],
    exclude: ['node_modules', 'packages/site/.next/**'],
    coverage: {
      reporter: ['text', 'text-summary'],
    },
    alias: {
      '@': path.resolve(import.meta.dirname, './packages/site'),
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
