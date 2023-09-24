import defaultLocale from '../../locale/lang/en_US'
import { classNames } from '../../_utils/dom'
import { useLocaleReceiver } from '../../locale-provider'
import Col from '../../grid/Col'
import { useInjectForm } from './context'
import type { FormItemLabelProps, FormLabelAlign } from './types'
import type { FunctionalComponent } from 'vue'

const FormItemLabel: FunctionalComponent<FormItemLabelProps> = (props, { slots, emit, attrs }) => {
  const { prefixCls, htmlFor, labelCol, labelAlign, colon, required, requiredMark } = {
    ...props,
    ...attrs,
  }
  const [formLocale] = useLocaleReceiver('Form')
  const label = props.label ?? slots.label?.()
  if (!label) return null
  const {
    vertical,
    labelAlign: contextLabelAlign,
    labelCol: contextLabelCol,
    labelWrap,
    colon: contextColon,
  } = useInjectForm()
  const mergedLabelCol: FormItemLabelProps['labelCol'] = labelCol || contextLabelCol?.value || {}

  const mergedLabelAlign: FormLabelAlign | undefined = labelAlign || contextLabelAlign?.value

  const labelClsBasic = `${prefixCls}-item-label`
  const labelColClassName = classNames(
    labelClsBasic,
    mergedLabelAlign === 'left' && `${labelClsBasic}-left`,
    mergedLabelCol.class,
    {
      [`${labelClsBasic}-wrap`]: !!labelWrap.value,
    },
  )

  let labelChildren = label
  // Keep label is original where there should have no colon
  const computedColon = colon === true || (contextColon?.value !== false && colon !== false)
  const haveColon = computedColon && !vertical.value
  // Remove duplicated user input colon
  if (haveColon && typeof label === 'string' && (label as string).trim() !== '')
    labelChildren = (label as string).replace(/[:|：]\s*$/, '')

  labelChildren = (
    <>
      {labelChildren}
      {slots.tooltip?.({ class: `${prefixCls}-item-tooltip` })}
    </>
  )

  // Add required mark if optional
  if (requiredMark === 'optional' && !required) {
    labelChildren = (
      <>
        {labelChildren}
        <span class={`${prefixCls}-item-optional`}>
          {formLocale.value?.optional || defaultLocale.Form?.optional}
        </span>
      </>
    )
  }
  const labelClassName = classNames({
    [`${prefixCls}-item-required`]: required,
    [`${prefixCls}-item-required-mark-optional`]: requiredMark === 'optional',
    [`${prefixCls}-item-no-colon`]: !computedColon,
  })
  return (
    <Col {...mergedLabelCol} class={labelColClassName}>
      <label
        for={htmlFor}
        class={labelClassName}
        title={typeof label === 'string' ? label : ''}
        onClick={e => emit('click', e)}
      >
        {labelChildren}
      </label>
    </Col>
  )
}

FormItemLabel.displayName = 'FormItemLabel'
FormItemLabel.inheritAttrs = false

export default FormItemLabel
