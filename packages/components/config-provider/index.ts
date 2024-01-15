import { withInstall } from '@antdv/utils'
import type { Plugin } from 'vue'
import AConfigProvider from './src/ConfigProvider'
import type { setGlobalConfig } from './src/ConfigProvider'

export const ConfigProvider = withInstall(AConfigProvider)

export default ConfigProvider as typeof ConfigProvider & Plugin & {
  readonly config: typeof setGlobalConfig
}

export * from './src/props'
export * from './src/interface'
export * from './src/context'
export { globalConfigForApi } from './src/config'
export { default as useAntdContext } from './src/hooks/useConfigInject'
