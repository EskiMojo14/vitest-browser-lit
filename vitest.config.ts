import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    name: 'lit',
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [{ browser: 'chromium' }],
    },
  },
})
