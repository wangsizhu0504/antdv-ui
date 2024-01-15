import type { App, Plugin } from 'vue'
import ATabs from './src/Tabs'
import ATabPane from './src/TabPanelList/TabPane'

export const TabPane = ATabPane

export const Tabs = Object.assign(ATabs, {
  TabPane: ATabPane,
  install(app: App) {
    app.component(ATabs.name, ATabs)
    app.component(ATabPane.name, ATabPane)
    return app
  },
})

export default Tabs as typeof Tabs & Plugin & {
  readonly TabPane: typeof TabPane
}

export * from './src/interface'
export * from './src/props'
