import FloatButton from './FloatButton'
import FloatButtonGroup from './FloatButtonGroup'
import BackTop from './BackTop'
import type { SizeType as FloatButtonSize } from '../config-provider'
import type { App, Plugin } from 'vue'

import type {
  BackTopProps,
  FloatButtonGroupProps,
  FloatButtonProps,
  FloatButtonShape,
  FloatButtonType,
} from './interface'

export type {
  FloatButtonProps,
  FloatButtonShape,
  FloatButtonType,
  FloatButtonGroupProps,
  BackTopProps,
  FloatButtonSize,
}

FloatButton.Group = FloatButtonGroup
FloatButton.BackTop = BackTop

/* istanbul ignore next */
FloatButton.install = function (app: App) {
  app.component(FloatButton.name, FloatButton)
  app.component(FloatButtonGroup.name, FloatButtonGroup)
  app.component(BackTop.name, BackTop)
  return app
}

export { FloatButtonGroup, BackTop }

export default FloatButton as typeof FloatButton &
Plugin & {
  readonly Group: typeof FloatButtonGroup
  readonly BackTop: typeof BackTop
}
