import type { App, Plugin } from 'vue'
import { VcOptGroup, VcOption } from '@antdv/vue-components'
import ASelect from './src/Select'

export const SelectOption = VcOption
export const SelectOptGroup = VcOptGroup

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
  readonly Option: typeof VcOption
  readonly OptGroup: typeof VcOptGroup
  readonly SECRET_COMBOBOX_MODE_DO_NOT_USE: 'SECRET_COMBOBOX_MODE_DO_NOT_USE'
}

export * from './src/interface'
export * from './src/props'
