import Dropdown from './dropdown'
import DropdownButton from './dropdown-button'
import { dropdownButtonProps, dropdownProps } from './props'
import type { App, Plugin } from 'vue'

export type { DropdownProps } from './dropdown'
export type { DropdownButtonProps } from './dropdown-button'

const AntdDropdown = Dropdown
AntdDropdown.Button = DropdownButton

/* istanbul ignore next */
AntdDropdown.install = function (app: App) {
  app.component(AntdDropdown.name, AntdDropdown)
  app.component(AntdDropdown.Button.name, AntdDropdown.Button)
  return app
}

export { DropdownButton, dropdownProps, dropdownButtonProps }

export default AntdDropdown as typeof AntdDropdown &
Plugin & {
  readonly Button: typeof DropdownButton
}
