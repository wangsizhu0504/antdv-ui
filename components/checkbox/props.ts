import PropTypes from '../_util/vue-types'
import { arrayType, booleanType, functionType, stringType } from '../_util/type'
import type { CheckboxChangeEvent, CheckboxOptionType, CheckboxValueType } from './types'
import type { ExtractPropTypes } from 'vue'
import type { MouseEventHandler } from '../_util/EventInterface'

export const abstractCheckboxGroupProps = () => {
  return {
    name: String,
    prefixCls: String,
    options: arrayType<Array<CheckboxOptionType | string | number>>(
      [] as Array<CheckboxOptionType | string | number>,
    ),
    disabled: Boolean,
    id: String,
  }
}

export const abstractCheckboxProps = () => ({
  'prefixCls': String,
  'defaultChecked': booleanType(),
  'checked': booleanType(),
  'disabled': booleanType(),
  'isGroup': booleanType(),
  'value': PropTypes.any,
  'name': String,
  'id': String,
  'indeterminate': booleanType(),
  'type': stringType('checkbox'),
  'autofocus': booleanType(),
  'onChange': functionType<(e: CheckboxChangeEvent) => void>(),
  'onUpdate:checked': functionType<(checked: boolean) => void>(),
  'onClick': functionType<MouseEventHandler>(),
  'skipGroup': booleanType(false),
})

export const checkboxGroupProps = () => ({
  ...abstractCheckboxGroupProps(),
  'defaultValue': arrayType<Array<CheckboxValueType>>(),
  'value': arrayType<Array<CheckboxValueType>>(),
  'onChange': functionType<(checkedValue: Array<CheckboxValueType>) => void>(),
  'onUpdate:value': functionType<(checkedValue: Array<CheckboxValueType>) => void>(),
})
export const checkboxProps = () => ({
  ...abstractCheckboxProps(),
  indeterminate: booleanType(false),
})

export type CheckboxProps = Partial<ExtractPropTypes<ReturnType<typeof checkboxProps>>>

export type CheckboxGroupProps = Partial<ExtractPropTypes<ReturnType<typeof checkboxGroupProps>>>
