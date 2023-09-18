import form from './Form'
import formItem from './FormItem'
import formItemRest, { useInjectFormItemContext } from './FormItemContext'
import type useForm from './useForm'
import type { App, Plugin } from 'vue'

export const FormItem = formItem
export const FormItemRest = formItemRest
export { useInjectFormItemContext }

export const Form = Object.assign(form, {
  ItemRest: formItemRest,
  useInjectFormItemContext,
  install(app: App) {
    app.component(form.name, form)
    app.component(formItem.name, formItem)
    app.component(formItemRest.name, formItemRest)
    return app
  },
})

export default Form as typeof Form & Plugin & {
  readonly Item: typeof Form.Item
  readonly ItemRest: typeof FormItemRest
  readonly useForm: typeof useForm
  readonly useInjectFormItemContext: typeof useInjectFormItemContext
}

export * from './types'
export * from './props'
