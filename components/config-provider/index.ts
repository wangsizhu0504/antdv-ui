import { withInstall } from '../_util/type'
import configProvider from './ConfigProvider'
import type { setGlobalConfig } from './ConfigProvider'
import type { Plugin } from 'vue'

export const ConfigProvider = withInstall(configProvider)

export default ConfigProvider as typeof ConfigProvider & Plugin & {
  readonly config: typeof setGlobalConfig
}

export * from './props'
export * from './types'
export * from './config'
