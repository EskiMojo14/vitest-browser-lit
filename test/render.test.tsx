import { html } from 'lit'
import { expect, test } from 'vitest'
import { page } from 'vitest/browser'
import { render } from '../src/index'
import './fixtures/hello-world'
import './fixtures/counter'

test('renders simple component', async () => {
  const screen = render(html`<hello-world></hello-world>`)
  await expect.element(page.getByText('Hello World')).toBeVisible()
  expect(screen.container).toMatchSnapshot()
})
test('renders counter', async () => {
  const screen = render(html`<counter-element count="1"></counter-element>`)

  await expect.element(screen.getByText('Count is 1')).toBeVisible()
  await screen.getByRole('button', { name: 'Increment' }).click()
  await expect.element(screen.getByText('Count is 2')).toBeVisible()
})
