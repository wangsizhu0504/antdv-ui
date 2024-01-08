import {
  PropTypes,
  anyType,
  booleanType,
  functionType,
  objectType,
  someType,
  stringType,
  tuple,
} from '@antdv/utils'
import type { Options } from 'scroll-into-view-if-needed'
import type { ComponentPublicInstance, ExtractPropTypes, HTMLAttributes, PropType } from 'vue'
import type { ValidateMessages } from '@antdv/locale'
import type { SizeType } from '../../config-provider'
import type { ColProps } from '../../grid/'
import type {
  Callbacks,
  FormExpose,
  FormItemExpose,
  FormLabelAlign,
  RequiredMark,
  Rule,
} from './types'

export function formProps() {
  return {
    layout: PropTypes.oneOf(tuple('horizontal', 'inline', 'vertical')),
    labelCol: objectType<ColProps & HTMLAttributes>(),
    wrapperCol: objectType<ColProps & HTMLAttributes>(),
    colon: booleanType(),
    labelAlign: stringType<FormLabelAlign>(),
    labelWrap: booleanType(),
    prefixCls: String,
    requiredMark: someType<RequiredMark | ''>([String, Boolean]),
    /** @deprecated Will warning in future branch. Pls use `requiredMark` instead. */
    hideRequiredMark: booleanType(),
    model: PropTypes.object,
    rules: objectType<{ [k: string]: Rule[] | Rule }>(),
    validateMessages: objectType<ValidateMessages>(),
    validateOnRuleChange: booleanType(),
    // 提交失败自动滚动到第一个错误字段
    scrollToFirstError: anyType<boolean | Options>(),
    onSubmit: functionType<(e: Event) => void>(),
    name: String,
    validateTrigger: someType<string | string[]>([String, Array]),
    size: stringType<SizeType>(),
    disabled: booleanType(),
    onValuesChange: functionType<Callbacks['onValuesChange']>(),
    onFieldsChange: functionType<Callbacks['onFieldsChange']>(),
    onFinish: functionType<Callbacks['onFinish']>(),
    onFinishFailed: functionType<Callbacks['onFinishFailed']>(),
    onValidate: functionType<Callbacks['onValidate']>(),
  }
}
export function formItemProps() {
  return {
    htmlFor: String,
    prefixCls: String,
    label: PropTypes.any,
    help: PropTypes.any,
    extra: PropTypes.any,
    labelCol: { type: Object as PropType<ColProps & HTMLAttributes> },
    wrapperCol: { type: Object as PropType<ColProps & HTMLAttributes> },
    hasFeedback: { type: Boolean, default: false },
    colon: { type: Boolean, default: undefined },
    labelAlign: String as PropType<FormLabelAlign>,
    prop: { type: [String, Number, Array] as PropType<string | number | Array<string | number>> },
    name: { type: [String, Number, Array] as PropType<string | number | Array<string | number>> },
    rules: [Array, Object] as PropType<Rule[] | Rule>,
    autoLink: { type: Boolean, default: true },
    required: { type: Boolean, default: undefined },
    validateFirst: { type: Boolean, default: undefined },
    validateStatus: PropTypes.oneOf(tuple('', 'success', 'warning', 'error', 'validating')),
    validateTrigger: { type: [String, Array] as PropType<string | string[]> },
    messageVariables: { type: Object as PropType<Record<string, string>> },
    hidden: Boolean,
    noStyle: Boolean,
    tooltip: String,
  }
}

export type FormItemProps = Partial<ExtractPropTypes<ReturnType<typeof formItemProps>>>

export type FormProps = Partial<ExtractPropTypes<ReturnType<typeof formProps>>>

export type FormInstance = ComponentPublicInstance<FormProps, FormExpose>

export type FormItemInstance = ComponentPublicInstance<FormItemProps, FormItemExpose>
