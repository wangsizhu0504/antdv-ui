import { booleanType, functionType, someType, stringType } from '../_util/type'
import type { KeyboardEventHandler } from '../_util/EventInterface'
import type { ValueType } from './utils/MiniDecimal'

export const vcInputNumberProps = () => ({
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
})
