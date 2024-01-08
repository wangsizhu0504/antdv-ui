import type { App, Plugin } from 'vue'
import { VcSelectOptGroup, VcSelectOption } from '@antdv/vue-components'
import ASelect from './src/Select'

export const SelectOption = VcSelectOption
export const SelectOptGroup = VcSelectOptGroup

export const Select = Object.assign(ASelect, {
  install(app: App) {
    app.component(ASelect.name, ASelect)
    app.component(SelectOption.displayName, SelectOption)
    app.component(SelectOptGroup.displayName, SelectOptGroup)
    return app
  },
})
/* istanbul ignore next */

export default Select as typeof Select & Plugin & {
  readonly Option: typeof VcSelectOption
  readonly OptGroup: typeof VcSelectOptGroup
  readonly SECRET_COMBOBOX_MODE_DO_NOT_USE: 'SECRET_COMBOBOX_MODE_DO_NOT_USE'
}

export * from './src/types'
export * from './src/props'
