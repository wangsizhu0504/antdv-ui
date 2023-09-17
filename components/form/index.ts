import Form from './Form'
import FormItem from './FormItem'
import useForm from './useForm'
import FormItemRest, { useInjectFormItemContext } from './FormItemContext'
import type { App, Plugin } from 'vue'

export * from './type'
export * from './props'

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

export { FormItem, FormItemRest, useForm, useInjectFormItemContext }

export default AntdForm as typeof AntdForm &
Plugin & {
  readonly Item: typeof Form.Item
  readonly ItemRest: typeof FormItemRest
  readonly useForm: typeof useForm
  readonly useInjectFormItemContext: typeof useInjectFormItemContext
}
