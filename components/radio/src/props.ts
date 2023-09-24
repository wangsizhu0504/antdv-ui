import { PropTypes, arrayType, booleanType, functionType, stringType } from '../../_utils/vue'
import type { ExtractPropTypes } from 'vue'
import type { RadioChangeEvent, RadioGroupButtonStyle, RadioGroupChildOption, RadioGroupOptionType, RadioGroupSize } from './types'

import type { FocusEventHandler, MouseEventHandler } from '../../_utils/types'

export const radioGroupProps = () => ({
  'prefixCls': String,
  'value': PropTypes.any,
  'size': stringType<RadioGroupSize>(),
  'options': arrayType<Array<string | RadioGroupChildOption | number>>(),
  'disabled': booleanType(),
  'name': String,
  'buttonStyle': stringType<RadioGroupButtonStyle>('outline'),
  'id': String,
  'optionType': stringType<RadioGroupOptionType>('default'),
  'onChange': functionType<(e: RadioChangeEvent) => void>(),
  'onUpdate:value': functionType<(val: any) => void>(),
})

export const radioProps = () => ({
  'prefixCls': String,
  'checked': booleanType(),
  'disabled': booleanType(),
  'isGroup': booleanType(),
  'value': PropTypes.any,
  'name': String,
  'id': String,
  'autofocus': booleanType(),
  'onChange': functionType<(event: RadioChangeEvent) => void>(),
  'onFocus': functionType<FocusEventHandler>(),
  'onBlur': functionType<FocusEventHandler>(),
  'onClick': functionType<MouseEventHandler>(),
  'onUpdate:checked': functionType<(checked: boolean) => void>(),
  'onUpdate:value': functionType<(checked: boolean) => void>(),
})

export type RadioProps = Partial<ExtractPropTypes<ReturnType<typeof radioProps>>>

export type RadioGroupProps = Partial<ExtractPropTypes<ReturnType<typeof radioGroupProps>>>
