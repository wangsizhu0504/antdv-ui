import Select from './select'
import type { App, Plugin } from 'vue'
import type { OptGroup, Option } from '../vc-select'

const AntdSelect = Select
/* istanbul ignore next */
AntdSelect.install = function (app: App) {
  app.component(AntdSelect.name, AntdSelect)
  app.component(AntdSelect.Option.displayName, AntdSelect.Option)
  app.component(AntdSelect.OptGroup.displayName, AntdSelect.OptGroup)
  return app
}

export * from './type'
export * from './props'

export const SelectOption = AntdSelect.Option
export const SelectOptGroup = AntdSelect.OptGroup

export default AntdSelect as typeof AntdSelect &
Plugin & {
  readonly Option: typeof Option
  readonly OptGroup: typeof OptGroup
  readonly SECRET_COMBOBOX_MODE_DO_NOT_USE: 'SECRET_COMBOBOX_MODE_DO_NOT_USE'
}
