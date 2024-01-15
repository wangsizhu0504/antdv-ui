import type { App, Plugin } from 'vue'
import floatButton from './src/FloatButton'
import floatButtonGroup from './src/FloatButtonGroup'
import backTop from './src/BackTop'

export const BackTop = backTop
export const FloatButtonGroup = floatButtonGroup

export const FloatButton = Object.assign(floatButton, {
  Group: floatButtonGroup,
  BackTop: backTop,
  install(app: App) {
    app.component(floatButton.name, floatButton)
    app.component(floatButtonGroup.name, floatButtonGroup)
    app.component(BackTop.name, BackTop)
    return app
  },
})

export default FloatButton as typeof FloatButton & Plugin & {
  readonly Group: typeof FloatButtonGroup
  readonly BackTop: typeof BackTop
}

export * from './src/props'
export * from './src/interface'
