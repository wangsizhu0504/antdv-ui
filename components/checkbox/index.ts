import Checkbox from './Checkbox'
import CheckboxGroup from './Group'
import type { App, Plugin } from 'vue'

const AntdCheckbox = Checkbox
AntdCheckbox.Group = CheckboxGroup

/* istanbul ignore next */
AntdCheckbox.install = function (app: App) {
  app.component(AntdCheckbox.name, AntdCheckbox)
  app.component(AntdCheckbox.Group.name, AntdCheckbox.Group)
  return app
}
export { CheckboxGroup }

export default AntdCheckbox as typeof AntdCheckbox & Plugin & {
  readonly Group: typeof CheckboxGroup
}

export * from './type'
export * from './props'
