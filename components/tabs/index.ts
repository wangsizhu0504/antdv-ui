import tabs from './src/Tabs'
import tabPane from './src/TabPanelList/TabPane'

import type { App, Plugin } from 'vue'

export const TabPane = tabPane

export const Tabs = Object.assign(tabs, {
  TabPane: tabPane,
  install(app: App) {
    app.component(tabs.name, tabs)
    app.component(tabPane.name, tabPane)
    return app
  },
})

export default Tabs as typeof Tabs & Plugin & {
  readonly TabPane: typeof TabPane
}

export * from './src/types'
export * from './src/props'
