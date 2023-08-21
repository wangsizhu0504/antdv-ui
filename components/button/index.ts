import Button from './button'
import ButtonGroup from './button-group'
import type { App, Plugin } from 'vue'

import type { ButtonProps, ButtonShape, ButtonType } from './buttonTypes'
import type { ButtonGroupProps } from './button-group'
import type { SizeType as ButtonSize } from '../config-provider'

export type { ButtonProps, ButtonShape, ButtonType, ButtonGroupProps, ButtonSize }

const AntdButton = Button
AntdButton.Group = ButtonGroup

/* istanbul ignore next */
Button.install = function (app: App) {
  app.component(AntdButton.name, AntdButton)
  app.component(AntdButton.Group.name, AntdButton.Group)
  return app
}

export { ButtonGroup }

export default AntdButton as typeof AntdButton &
Plugin & {
  readonly Group: typeof ButtonGroup
}
