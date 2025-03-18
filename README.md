# vitest-browser-lit

Render Lit components in Vitest Browser Mode. This library follows `testing-library` principles and exposes only [locators](https://vitest.dev/guide/browser/locators) and utilities that encourage you to write tests that closely resemble how your Lit components are used.

`vitest-browser-lit` aims to deliver a good developer experience in Vitest Browser Mode by incorporating the [locators API](https://vitest.dev/guide/browser/locators.html) and [retry-ability](https://vitest.dev/guide/browser/assertion-api.html) mechanism directly into the `render` result. This allows you to call user methods without needing to verify the element's existence or wait for external events (like API calls) to render the element.

Requires `vitest` and `@vitest/browser` 2.1.0 or higher.

```tsx
import { render } from 'vitest-browser-lit'
import { expect, test } from 'vitest'
import { html } from 'lit'

test('counter button increments the count', async () => {
  const screen = render(html`<counter-element count="1"></counter-element>`)

  await screen.getByRole('button', { name: 'Increment' }).click()

  await expect.element(screen.getByText('Count is 2')).toBeVisible()
})
```

`vitest-browser-lit` also automatically injects `render` method on the `page`. Example:

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ['./setup-file.ts'],
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [{ browser: 'chromium' }],
    },
  },
})

// ./setup-file.ts
// add an import at the top of your setup file so TypeScript can pick up types
import 'vitest-browser-lit'
```

```tsx
import { page } from '@vitest/browser/context'
import { test } from 'vitest'
import { html } from 'lit'

test('counter button increments the count', async () => {
  const screen = page.render(html`<counter-element count="1"></counter-element>`)
})
```

`vitest-browser-lit` performs cleanup of the component before the test begins, allowing you to see the rendered result in your UI. If you prefer to disable auto-cleanup, you can import the `render` function from `vitest-browser-lit/pure`.

## Special thanks

- Inspired by [`@testing-library/react`](https://github.com/testing-library/react-testing-library) and [`vitest-browser-react`](https://github.com/vitest-dev/vitest-browser-react)
