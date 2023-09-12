import Button from './Button'
import ButtonGroup from './ButtonGroup'
import type { App, Plugin } from 'vue'

export * from './props'
export * from './type'
export * from './utils'

const AntdButton = Button
AntdButton.Group = ButtonGroup

/* istanbul ignore next */
Button.install = function (app: App) {
  app.component(AntdButton.name, AntdButton)
  app.component(AntdButton.Group.name, AntdButton.Group)
  return app
}

export { ButtonGroup }

export default AntdButton as typeof AntdButton & Plugin & {
  readonly Group: typeof ButtonGroup
}
