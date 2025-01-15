import type { InputStatus, KeyboardEventHandler, SizeType } from '@antdv/types'

import { booleanType, functionType, PropTypes, someType, stringType } from '@antdv/utils'

// CSSINJS
import type { ExtractPropTypes } from 'vue'
import type { ValueType } from './interface'

export function inputElementProps() {
  return {
  /** value will show as string */
    stringMode: booleanType(),

    defaultValue: someType<ValueType>([String, Number]),
    value: someType<ValueType>([String, Number]),

    prefixCls: stringType<string>(),
    min: someType<ValueType>([String, Number]),
    max: someType<ValueType>([String, Number]),
    step: someType<ValueType>([String, Number], 1),
    tabindex: Number,
    controls: booleanType(true),
    readonly: booleanType(),
    disabled: booleanType(),
    autofocus: booleanType(),
    keyboard: booleanType(true),

    /** Parse display value to validate number */
    parser: functionType<(displayValue: string | undefined) => ValueType>(),
    /** Transform `value` to display value show in input */
    formatter:
    functionType<
      (value: ValueType | undefined, info: { userTyping: boolean, input: string }) => string
    >(),
    /** Syntactic sugar of `formatter`. Config precision of display. */
    precision: Number,
    /** Syntactic sugar of `formatter`. Config decimal separator of display. */
    decimalSeparator: String,

    onInput: functionType<(text: string) => void>(),
    onChange: functionType<(value: ValueType) => void>(),
    onPressEnter: functionType<KeyboardEventHandler>(),

    onStep:
    functionType<(value: ValueType, info: { offset: ValueType, type: 'up' | 'down' }) => void>(),
    onBlur: functionType<(e: FocusEvent) => void>(),
    onFocus: functionType<(e: FocusEvent) => void>(),
  }
}

export function inputNumberProps() {
  return {
    ...inputElementProps(),
    'size': stringType<SizeType>(),
    'bordered': booleanType(true),
    'placeholder': String,
    'name': String,
    'id': String,
    'type': String,
    'addonBefore': PropTypes.any,
    'addonAfter': PropTypes.any,
    'prefix': PropTypes.any,
    'onUpdate:value': functionType<(value: ValueType) => void>(),
    'valueModifiers': Object,
    'status': stringType<InputStatus>(),
  }
}

export type InputNumberProps = Partial<ExtractPropTypes<ReturnType<typeof inputNumberProps>>>
