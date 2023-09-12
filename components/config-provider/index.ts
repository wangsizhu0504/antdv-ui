import ConfigProvider from './ConfigProvider'
import type { setGlobalConfig } from './ConfigProvider'
import type { App, Plugin } from 'vue'

export * from './props'
export * from './type'
export * from './config'

const AConfigProvider = ConfigProvider
AConfigProvider.install = function (app: App) {
  app.component(ConfigProvider.name, ConfigProvider)
}

export default AConfigProvider as typeof ConfigProvider & Plugin & {
  readonly config: typeof setGlobalConfig
}
