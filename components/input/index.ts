import input from './Input'
import group from './Group'
import search from './Search'
import textArea from './TextArea'
import password from './Password'
import type { App, Plugin } from 'vue'

export const InputGroup = group
export const InputSearch = search
export const Textarea = textArea
export const InputPassword = password

export const Input = Object.assign(input, {
  Group: group,
  Search: search,
  TextArea: textArea,
  Password: password,
  install(app: App) {
    app.component(input.name, input)
    app.component(group.name, group)
    app.component(search.name, search)
    app.component(textArea.name, textArea)
    app.component(password.name, password)
    return app
  },
})

export default Input as typeof Input & Plugin & {
  readonly Group: typeof group
  readonly Search: typeof search
  readonly TextArea: typeof textArea
  readonly Password: typeof password
}

export * from './types'
export * from './props'
