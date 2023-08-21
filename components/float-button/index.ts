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

const AntdFloatButton = FloatButton
AntdFloatButton.Group = FloatButtonGroup
AntdFloatButton.BackTop = BackTop

/* istanbul ignore next */
FloatButton.install = function (app: App) {
  app.component(AntdFloatButton.name, AntdFloatButton)
  app.component(AntdFloatButton.Group.name, AntdFloatButton.Group)
  app.component(AntdFloatButton.BackTop.name, AntdFloatButton.BackTop)
  return app
}

export { FloatButtonGroup, BackTop }

export default AntdFloatButton as typeof AntdFloatButton &
Plugin & {
  readonly Group: typeof FloatButtonGroup
  readonly BackTop: typeof BackTop
}
