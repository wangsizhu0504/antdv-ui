import compact from './Compact'
import space from './Space'
import type { App, Plugin } from 'vue'

export { NoCompactStyle } from './NoCompactStyle'
export const Compact = compact

export const Space = Object.assign(space, {
  Compact,
  install(app: App) {
    app.component(space.name, space)
    app.component(compact.name, compact)
    return app
  },
})

export default Space as typeof Space & Plugin & {
  readonly Compact: typeof Compact
}

export * from './props'
export * from './types'
export * from './context'
