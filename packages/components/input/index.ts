import type { App, Plugin } from 'vue'
import AInput from './src/Input'
import AInputGroup from './src/Group'
import AInputSearch from './src/Search'
import AInputTextArea from './src/TextArea'
import AInputPassword from './src/Password'

export const InputGroup = AInputGroup
export const InputSearch = AInputSearch
export const Textarea = AInputTextArea
export const InputPassword = AInputPassword

export const Input = Object.assign(AInput, {
  Group: AInputGroup,
  Search: AInputSearch,
  TextArea: AInputTextArea,
  Password: AInputPassword,
  install(app: App) {
    app.component(AInput.name, AInput)
    app.component(AInputGroup.name, AInputGroup)
    app.component(AInputSearch.name, AInputSearch)
    app.component(AInputTextArea.name, AInputTextArea)
    app.component(AInputPassword.name, AInputPassword)
    return app
  },
})

export default Input as typeof Input & Plugin & {
  readonly Group: typeof AInputGroup
  readonly Search: typeof AInputSearch
  readonly TextArea: typeof AInputTextArea
  readonly Password: typeof AInputPassword
}

export * from './src/interface'
export * from './src/props'
