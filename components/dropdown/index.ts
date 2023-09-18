import dropdown from './Dropdown'
import button from './DropdownButton'
import type { App, Plugin } from 'vue'

export const DropdownButton = button
export const Dropdown = Object.assign(dropdown, {
  Button: DropdownButton,
  install(app: App) {
    app.component(dropdown.name, dropdown)
    app.component(button.name, button)
    return app
  },
})

export default Dropdown as typeof Dropdown & Plugin & {
  readonly Button: typeof DropdownButton
}

export * from './props'
export * from './types'
