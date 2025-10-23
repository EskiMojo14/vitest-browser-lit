import type { LocatorSelectors } from 'vitest/browser'
import { utils } from 'vitest/browser'
import type { RenderOptions } from 'lit'
import { render as litRender } from 'lit'

const { debug, getElementLocatorSelectors } = utils

export interface ComponentRenderOptions extends RenderOptions {
  baseElement?: HTMLElement
  container?: HTMLElement
}

export interface RenderResult extends LocatorSelectors {
  container: HTMLElement
  baseElement: HTMLElement
  debug: typeof utils.debug
  unmount: () => void
  rerender: (template: unknown) => void
  asFragment: () => DocumentFragment
}

const containers = new Set<HTMLElement>()

export function render(
  template: unknown,
  {
    baseElement = document.body,
    container = baseElement.appendChild(document.createElement('div')),
    ...options
  }: ComponentRenderOptions = {},
): RenderResult {
  containers.add(container)
  litRender(template, container, options)
  return {
    container,
    baseElement,
    debug,
    unmount() {
      containers.delete(container)
      container.remove()
    },
    rerender(newTemplate: unknown) {
      litRender(newTemplate, container, options)
    },
    asFragment() {
      return document
        .createRange()
        .createContextualFragment(container.innerHTML)
    },
    ...getElementLocatorSelectors(container),
  }
}

export function cleanup(): void {
  for (const container of containers) {
    container.remove()
  }
  containers.clear()
}
