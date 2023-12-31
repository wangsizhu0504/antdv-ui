import AButton from './src/Button'
import AButtonGroup from './src/ButtonGroup'
import type { App, Plugin } from 'vue'

export const ButtonGroup = AButtonGroup

export const Button = Object.assign(AButton, {
  Group: AButtonGroup,
  install(app: App) {
    app.component(AButton.name, AButton)
    app.component(AButtonGroup.name, AButtonGroup)
    return app
  },
})

/* istanbul ignore next */

export default Button as typeof Button & Plugin & {
  readonly Group: typeof ButtonGroup
}

export * from './src/props'
export * from './src/type'
export * from './src/utils'
