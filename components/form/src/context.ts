import { computed, inject, provide } from 'vue'
import { FormContextKey } from '../../constant'
import { defaultValidateMessages } from './utils/messages'
import type { ComputedRef, InjectionKey } from 'vue'
import type { ValidateMessages } from '../../locale'
import type { ColProps } from '../../grid'
import type { FieldExpose, FormLabelAlign, RequiredMark, Rule, ValidateStatus } from './types'

export interface FormContextProps {
  model?: ComputedRef<any>
  vertical: ComputedRef<boolean>
  name?: ComputedRef<string>
  colon?: ComputedRef<boolean>
  labelAlign?: ComputedRef<FormLabelAlign>
  labelWrap?: ComputedRef<boolean>
  labelCol?: ComputedRef<ColProps>
  wrapperCol?: ComputedRef<ColProps>
  requiredMark?: ComputedRef<RequiredMark>
  // itemRef: (name: (string | number)[]) => (node: React.ReactElement) => void;
  addField: (eventKey: string, field: FieldExpose) => void
  removeField: (eventKey: string) => void
  validateTrigger?: ComputedRef<string | string[]>
  rules?: ComputedRef<{ [k: string]: Rule[] | Rule }>
  onValidate: (
    name: string | number | Array<string | number>,
    status: boolean,
    errors: string[] | null,
  ) => void
  validateMessages: ComputedRef<ValidateMessages>
}

export const useProvideForm = (state: FormContextProps) => {
  provide(FormContextKey, state)
}

export const useInjectForm = () => {
  return inject(FormContextKey, {
    name: computed(() => undefined),
    labelAlign: computed(() => 'right' as FormLabelAlign),
    vertical: computed(() => false),

    addField: (_eventKey: string, _field: FieldExpose) => {},

    removeField: (_eventKey: string) => {},
    model: computed(() => undefined),
    rules: computed(() => undefined),
    colon: computed(() => undefined),
    labelWrap: computed(() => undefined),
    labelCol: computed(() => undefined),
    requiredMark: computed(() => false),
    validateTrigger: computed(() => undefined),
    onValidate: () => {},
    validateMessages: computed(() => defaultValidateMessages),
  } as FormContextProps)
}

/** Used for ErrorList only */
export interface FormItemPrefixContextProps {
  prefixCls: ComputedRef<string>
  status?: ComputedRef<ValidateStatus>
}

export const FormItemPrefixContextKey: InjectionKey<FormItemPrefixContextProps> = Symbol(
  'formItemPrefixContextKey',
)

export const useProvideFormItemPrefix = (state: FormItemPrefixContextProps) => {
  provide(FormItemPrefixContextKey, state)
}

export const useInjectFormItemPrefix = () => {
  return inject(FormItemPrefixContextKey, {
    prefixCls: computed(() => ''),
  })
}
