import radio from './Radio'
import group from './Group'
import radioButton from './RadioButton'
import type { App, Plugin } from 'vue'

export const RadioGroup = group
export const RadioButton = radioButton

export const Radio = Object.assign(radio, {
  Group: group,
  Button: radioButton,
  install(app: App) {
    app.component(radio.name, radio)
    app.component(RadioGroup.name, RadioGroup)
    app.component(RadioButton.name, RadioButton)
    return app
  },
})

export default Radio as typeof Radio & Plugin & {
  readonly Group: typeof RadioGroup
  readonly Button: typeof RadioButton
}

export * from './types'
export * from './props'
