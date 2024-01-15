import type { App, Plugin } from 'vue'
import ACheckbox from './src/Checkbox'
import ACheckboxGroup from './src/Group'

export const CheckboxGroup = ACheckboxGroup

export const Checkbox = Object.assign(ACheckbox, {
  Group: CheckboxGroup,
  install(app: App) {
    app.component(ACheckbox.name, ACheckbox)
    app.component(ACheckboxGroup.name, ACheckboxGroup)
    return app
  },

})

export default Checkbox as typeof Checkbox & Plugin & {
  readonly Group: typeof CheckboxGroup
}

export * from './src/interface'
export * from './src/props'
