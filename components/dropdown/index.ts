import Dropdown from './Dropdown'
import DropdownButton from './DropdownButton'
import type { App, Plugin } from 'vue'

const ADropdown = Dropdown
ADropdown.Button = DropdownButton

/* istanbul ignore next */
ADropdown.install = function (app: App) {
  app.component(ADropdown.name, ADropdown)
  app.component(ADropdown.Button.name, ADropdown.Button)
  return app
}

export default ADropdown as typeof ADropdown & Plugin & {
  readonly Button: typeof DropdownButton
}
export { Dropdown, DropdownButton }

export * from './props'
export * from './type'
