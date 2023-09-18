import button from './Button'
import buttonGroup from './ButtonGroup'
import type { App, Plugin } from 'vue'

export const ButtonGroup = buttonGroup

export const Button = Object.assign(button, {
  Group: buttonGroup,
  install(app: App) {
    app.component(button.name, button)
    app.component(buttonGroup.name, buttonGroup)
    return app
  },
})

/* istanbul ignore next */

export default Button as typeof Button & Plugin & {
  readonly Group: typeof ButtonGroup
}

export * from './props'
export * from './type'
export * from './utils'
