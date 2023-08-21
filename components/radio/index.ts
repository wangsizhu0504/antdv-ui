import Radio from './Radio'
import Group from './Group'
import Button from './RadioButton'
import type { App, Plugin } from 'vue'

export type { RadioProps } from './Radio'
export type { RadioGroupProps } from './Group'
export type { RadioChangeEventTarget, RadioChangeEvent } from './interface'
const AntdRadio = Radio
AntdRadio.Group = Group
AntdRadio.Button = Button

/* istanbul ignore next */
AntdRadio.install = function (app: App) {
  app.component(AntdRadio.name, AntdRadio)
  app.component(AntdRadio.Group.name, AntdRadio.Group)
  app.component(AntdRadio.Button.name, AntdRadio.Button)
  return app
}

export { Button, Group, Button as RadioButton, Group as RadioGroup }
export default AntdRadio as typeof AntdRadio &
Plugin & {
  readonly Group: typeof Group
  readonly Button: typeof Button
}
