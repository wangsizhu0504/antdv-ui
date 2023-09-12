import FloatButton from './FloatButton'
import FloatButtonGroup from './FloatButtonGroup'
import BackTop from './BackTop'
import type { App, Plugin } from 'vue'

const AFloatButton = FloatButton
AFloatButton.Group = FloatButtonGroup
AFloatButton.BackTop = BackTop

/* istanbul ignore next */
AFloatButton.install = function (app: App) {
  app.component(AFloatButton.name, AFloatButton)
  app.component(AFloatButton.Group.name, AFloatButton.Group)
  app.component(AFloatButton.BackTop.name, AFloatButton.BackTop)
  return app
}

export default AFloatButton as typeof AFloatButton & Plugin & {
  readonly Group: typeof FloatButtonGroup
  readonly BackTop: typeof BackTop
}

export { FloatButton, FloatButtonGroup, BackTop }
export * from './props'
export * from './type'
