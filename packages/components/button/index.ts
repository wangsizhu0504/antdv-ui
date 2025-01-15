import type { App, Plugin } from 'vue'
import AButton from './src/Button'
import AButtonGroup from './src/ButtonGroup'

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

export * from './src/interface'
export * from './src/props'
export * from './src/utils'
