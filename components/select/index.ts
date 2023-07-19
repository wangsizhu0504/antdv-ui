import Select from './select'
import type { App } from 'vue'
import type { OptGroup, Option } from '../vc-select'

/* istanbul ignore next */
Select.install = function (app: App) {
  app.component(Select.name, Select)
  app.component(Select.Option.displayName, Select.Option)
  app.component(Select.OptGroup.displayName, Select.OptGroup)
  return app
}

export * from './type'
export * from './props'

export const SelectOption = Select.Option
export const SelectOptGroup = Select.OptGroup

export default Select as typeof Select &
Plugin & {
  readonly Option: typeof Option
  readonly OptGroup: typeof OptGroup
  readonly SECRET_COMBOBOX_MODE_DO_NOT_USE: 'SECRET_COMBOBOX_MODE_DO_NOT_USE'
}
