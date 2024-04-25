import installer from './install'

export * from '@antdv/components'
export * from '@antdv/constants'
export * from '@antdv/hooks'
export * from '@antdv/types'
export { theme } from '@antdv/theme'
export { useConfigContextInject as useAntdContext } from '@antdv/components'

export const install = installer.install
export const version = installer.version
export default installer
export { default as dayjs } from 'dayjs'
