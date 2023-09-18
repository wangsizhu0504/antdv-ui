import checkbox from './Checkbox'
import checkboxGroup from './Group'
import type { App, Plugin } from 'vue'

export const CheckboxGroup = checkboxGroup

export const Checkbox = Object.assign(checkbox, {
  Group: CheckboxGroup,
  install(app: App) {
    app.component(checkbox.name, checkbox)
    app.component(checkboxGroup.name, checkboxGroup)
    return app
  },

})

export default Checkbox as typeof Checkbox & Plugin & {
  readonly Group: typeof CheckboxGroup
}

export * from './types'
export * from './props'
