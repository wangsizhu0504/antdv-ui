import ADropdown from './src/Dropdown'
import ADropdownButton from './src/DropdownButton'
import type { App, Plugin } from 'vue'

export const DropdownButton = ADropdownButton

export const Dropdown = Object.assign(ADropdown, {
  Button: DropdownButton,
  install(app: App) {
    app.component(ADropdown.name, ADropdown)
    app.component(ADropdownButton.name, ADropdownButton)
    return app
  },
})

export default Dropdown as typeof Dropdown & Plugin & {
  readonly Button: typeof DropdownButton
}

export * from './src/props'
export * from './src/types'
