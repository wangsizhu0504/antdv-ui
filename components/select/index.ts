import { OptGroup, Option } from '../vc-select'
import select from './select'
import type { App, Plugin } from 'vue'

export const SelectOption = Option
export const SelectOptGroup = OptGroup

export const Select = Object.assign(select, {
  install(app: App) {
    app.component(select.name, select)
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
