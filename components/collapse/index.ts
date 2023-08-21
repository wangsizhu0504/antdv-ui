import Collapse, { collapseProps } from './Collapse'
import CollapsePanel, { collapsePanelProps } from './CollapsePanel'
import type { App, Plugin } from 'vue'

export type { CollapseProps } from './Collapse'
export type { CollapsePanelProps } from './CollapsePanel'

const AntdCollapse = Collapse
AntdCollapse.Panel = CollapsePanel

/* istanbul ignore next */
AntdCollapse.install = function (app: App) {
  app.component(AntdCollapse.name, AntdCollapse)
  app.component(AntdCollapse.Panel.name, AntdCollapse.Panel)
  return app
}

export { CollapsePanel, collapseProps, collapsePanelProps }
export default AntdCollapse as typeof AntdCollapse &
Plugin & {
  readonly Panel: typeof CollapsePanel
}
