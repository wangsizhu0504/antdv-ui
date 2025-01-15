import type { MouseEventHandler } from '@antdv/types'
import type { ExtractPropTypes } from 'vue'
import type { CheckboxChangeEvent, CheckboxOptionType, CheckboxValueType } from './interface'
import { arrayType, booleanType, functionType, PropTypes, stringType } from '@antdv/utils'

export function abstractCheckboxGroupProps() {
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

export function abstractCheckboxProps() {
  return {
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
  }
}

export function checkboxGroupProps() {
  return {
    ...abstractCheckboxGroupProps(),
    'defaultValue': arrayType<CheckboxValueType[]>(),
    'value': arrayType<CheckboxValueType[]>(),
    'onChange': functionType<(checkedValue: CheckboxValueType[]) => void>(),
    'onUpdate:value': functionType<(checkedValue: CheckboxValueType[]) => void>(),
  }
}
export function checkboxProps() {
  return {
    ...abstractCheckboxProps(),
    indeterminate: booleanType(false),
  }
}

export function checkboxRenderProps() {
  return {
    prefixCls: String,
    name: String,
    id: String,
    type: String,
    defaultChecked: { type: [Boolean, Number], default: undefined },
    checked: { type: [Boolean, Number], default: undefined },
    disabled: Boolean,
    tabindex: { type: [Number, String] },
    readonly: Boolean,
    autofocus: Boolean,
    value: PropTypes.any,
    required: Boolean,
  }
}

export type CheckboxProps = Partial<ExtractPropTypes<ReturnType<typeof checkboxProps>>>

export type CheckboxRenderProps = Partial<ExtractPropTypes<ReturnType<typeof checkboxRenderProps>>>

export type CheckboxGroupProps = Partial<ExtractPropTypes<ReturnType<typeof checkboxGroupProps>>>
