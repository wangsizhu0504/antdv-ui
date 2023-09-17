import { withInstall } from '../_util/type'
import localeProvider from './LocaleProvider'

export const LocaleProvider = withInstall(localeProvider)

export default LocaleProvider

export * from './useLocaleReceiver'
export * from './props'
export * from './type'
