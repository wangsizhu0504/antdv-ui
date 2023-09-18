import collapse from './Collapse'
import collapsePanel from './CollapsePanel'
import type { App, Plugin } from 'vue'

export const CollapsePanel = collapsePanel

export const Collapse = Object.assign(collapse, {
  Panel: collapsePanel,
  install(app: App) {
    app.component(collapse.name, collapse)
    app.component(collapsePanel.name, collapsePanel)
    return app
  },
})

export default Collapse as typeof Collapse & Plugin & {
  readonly Panel: typeof CollapsePanel
}

export * from './props'
export * from './types'
