import Tabs, { TabPane } from './src'
import type { App, Plugin } from 'vue'

export type { TabsProps, TabPaneProps } from './src'

const AntdTabs = Tabs
AntdTabs.TabPane = TabPane

/* istanbul ignore next */
AntdTabs.install = function (app: App) {
  app.component(AntdTabs.name, AntdTabs)
  app.component(AntdTabs.TabPane.name, AntdTabs.TabPane)
  return app
}

export default AntdTabs as typeof AntdTabs &
Plugin & {
  readonly TabPane: typeof TabPane
}

export { TabPane }
