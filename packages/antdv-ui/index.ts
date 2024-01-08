import installer from './install'

export * from '@antdv/components'
export * from '@antdv/constants'
export * from '@antdv/directives'
export * from '@antdv/hooks'
export * from '@antdv/types/global'
export { useConfigContextInject as useAntdContext } from '@antdv/components'

export const install = installer.install
export const version = installer.version
export default installer
export { default as dayjs } from 'dayjs'
