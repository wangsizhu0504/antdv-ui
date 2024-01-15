import { withInstall } from '@antdv/utils'
import ALocaleProvider from './src/LocaleProvider'

export const LocaleProvider = withInstall(ALocaleProvider)

export default LocaleProvider

export * from './src/useLocaleReceiver'
export * from './src/props'
export * from './src/interface'
