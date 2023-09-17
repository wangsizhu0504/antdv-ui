import Input from './Input'
import Group from './Group'
import Search from './Search'
import TextArea from './TextArea'
import Password from './Password'
import type { App, Plugin } from 'vue'

const AntdInput = Input
AntdInput.Group = Group
AntdInput.Search = Search
AntdInput.TextArea = TextArea
AntdInput.Password = Password

/* istanbul ignore next */
AntdInput.install = function (app: App) {
  app.component(AntdInput.name, AntdInput)
  app.component(AntdInput.Group.name, AntdInput.Group)
  app.component(AntdInput.Search.name, AntdInput.Search)
  app.component(AntdInput.TextArea.name, AntdInput.TextArea)
  app.component(AntdInput.Password.name, AntdInput.Password)
  return app
}

export {
  Group as InputGroup,
  Search as InputSearch,
  TextArea as Textarea,
  Password as InputPassword,
}

export default AntdInput as typeof AntdInput & Plugin & {
  readonly Group: typeof Group
  readonly Search: typeof Search
  readonly TextArea: typeof TextArea
  readonly Password: typeof Password
}

export * from './type'
export * from './props'
