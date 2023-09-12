import Collapse from './Collapse'
import CollapsePanel from './CollapsePanel'
import type { App, Plugin } from 'vue'

const AntdCollapse = Collapse
AntdCollapse.Panel = CollapsePanel

/* istanbul ignore next */
AntdCollapse.install = function (app: App) {
  app.component(AntdCollapse.name, AntdCollapse)
  app.component(AntdCollapse.Panel.name, AntdCollapse.Panel)
  return app
}

export default AntdCollapse as typeof AntdCollapse & Plugin & {
  readonly Panel: typeof CollapsePanel
}

export * from './props'
export * from './type'
