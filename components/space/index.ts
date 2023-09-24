import ACompact from './src/Compact'
import ASpace from './src/Space'
import type { App, Plugin } from 'vue'

export { NoCompactStyle } from './src/NoCompactStyle'
export const Compact = ACompact

export const Space = Object.assign(ASpace, {
  Compact,
  install(app: App) {
    app.component(ASpace.name, ASpace)
    app.component(ACompact.name, ACompact)
    return app
  },
})

export default Space as typeof Space & Plugin & {
  readonly Compact: typeof Compact
}

export * from './src/props'
export * from './src/types'
export * from './src/context'
