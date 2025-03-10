import type { App, Plugin } from 'vue';
import type useForm from './src/useForm';
import AForm from './src/Form';
import AFormItem from './src/FormItem';
import AFormItemRest, { useInjectFormItemContext } from './src/FormItemContext';

export const FormItem = AFormItem;
export const FormItemRest = AFormItemRest;
export { useInjectFormItemContext };

export const Form = Object.assign(AForm, {
  ItemRest: AFormItemRest,
  useInjectFormItemContext,
  install(app: App) {
    app.component(AForm.name, AForm);
    app.component(AFormItem.name, AFormItem);
    app.component(AFormItemRest.name, AFormItemRest);
    return app;
  },
});

export default Form as typeof Form & Plugin & {
  readonly Item: typeof FormItem
  readonly ItemRest: typeof FormItemRest
  readonly useForm: typeof useForm
  readonly useInjectFormItemContext: typeof useInjectFormItemContext
};

export * from './src/interface';
export * from './src/props';
