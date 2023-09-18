import { OptGroup, Option } from '../vc-select'
import ASelect from './select'
import type { App, Plugin } from 'vue'

export const SelectOption = Option
export const SelectOptGroup = OptGroup

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
  readonly Option: typeof Option
  readonly OptGroup: typeof OptGroup
  readonly SECRET_COMBOBOX_MODE_DO_NOT_USE: 'SECRET_COMBOBOX_MODE_DO_NOT_USE'
}

export * from './types'
export * from './props'
