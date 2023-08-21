import Form, { formProps } from './Form'
import FormItem, { formItemProps } from './FormItem'
import useForm from './useForm'
import FormItemRest, { useInjectFormItemContext } from './FormItemContext'
import type { App, Plugin } from 'vue'

export type { Rule, RuleObject } from './interface'

export type { FormProps, FormInstance } from './Form'
export type { FormItemProps, FormItemInstance } from './FormItem'

const AntdForm = Form
AntdForm.useInjectFormItemContext = useInjectFormItemContext
AntdForm.ItemRest = FormItemRest
/* istanbul ignore next */
AntdForm.install = function (app: App) {
  app.component(AntdForm.name, AntdForm)
  app.component(AntdForm.Item.name, AntdForm.Item)
  app.component(AntdForm.ItemRest.name, AntdForm.ItemRest)
  return app
}

export { FormItem, formItemProps, formProps, FormItemRest, useForm, useInjectFormItemContext }

export default AntdForm as typeof AntdForm &
Plugin & {
  readonly Item: typeof Form.Item
  readonly ItemRest: typeof FormItemRest
  readonly useForm: typeof useForm
  readonly useInjectFormItemContext: typeof useInjectFormItemContext
}
