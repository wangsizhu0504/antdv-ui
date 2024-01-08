import type { App, Plugin } from 'vue'
import ACollapse from './src/Collapse'
import ACollapsePanel from './src/CollapsePanel'

export const CollapsePanel = ACollapsePanel

export const Collapse = Object.assign(ACollapse, {
  Panel: ACollapsePanel,
  install(app: App) {
    app.component(ACollapse.name, ACollapse)
    app.component(ACollapsePanel.name, ACollapsePanel)
    return app
  },
})

export default Collapse as typeof Collapse & Plugin & {
  readonly Panel: typeof CollapsePanel
}

export * from './src/props'
export * from './src/types'
