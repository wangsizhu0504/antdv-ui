import { withInstall } from '../_utils/vue'
import AConfigProvider from './src/ConfigProvider'
import type { setGlobalConfig } from './src/ConfigProvider'
import type { Plugin } from 'vue'

export const ConfigProvider = withInstall(AConfigProvider)

export default ConfigProvider as typeof ConfigProvider & Plugin & {
  readonly config: typeof setGlobalConfig
}

export * from './src/props'
export * from './src/types'
export * from './src/context'
