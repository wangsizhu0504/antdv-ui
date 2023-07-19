import Tabs, { TabPane } from './src'
import type { App, Plugin } from 'vue'

export type { TabsProps, TabPaneProps } from './src'

Tabs.TabPane = TabPane

/* istanbul ignore next */
Tabs.install = function (app: App) {
  app.component(Tabs.name, Tabs)
  app.component(TabPane.name, TabPane)
  return app
}

export default Tabs as typeof Tabs &
Plugin & {
  readonly TabPane: typeof TabPane
}

export { TabPane }
