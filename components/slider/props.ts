import {
  booleanType,
  functionType,
  objectType,
  someType,
  stringType,
} from '../_util/type'
import type { SliderMarks, SliderRange, Value } from './types'
import type { FocusEventHandler } from '../_util/EventInterface'
import type { TooltipPlacement } from '../tooltip/Tooltip'
import type { CSSProperties, ExtractPropTypes } from 'vue'

// CSSINJS

const defaultTipFormatter = (value: number) => (typeof value === 'number' ? value.toString() : '')
export const sliderProps = () => ({
  'id': String,
  'prefixCls': String,
  'tooltipPrefixCls': String,
  'range': someType<boolean | SliderRange>([Boolean, Object]),
  'reverse': booleanType(),
  'min': Number,
  'max': Number,
  'step': someType<null | number>([Object, Number]),
  'marks': objectType<SliderMarks>(),
  'dots': booleanType(),
  'value': someType<Value>([Array, Number]),
  'defaultValue': someType<Value>([Array, Number]),
  'included': booleanType(),
  'disabled': booleanType(),
  'vertical': booleanType(),
  'tipFormatter': someType<((value?: number) => any) | null>(
    [Function, Object],
  () => defaultTipFormatter,
  ),
  'tooltipOpen': booleanType(),
  /** @deprecated `tooltipVisible` is deprecated. Please use `tooltipOpen` instead. */
  'tooltipVisible': booleanType(),
  'tooltipPlacement': stringType<TooltipPlacement>(),
  'getTooltipPopupContainer': functionType<(triggerNode: HTMLElement) => HTMLElement>(),
  'autofocus': booleanType(),
  'handleStyle': someType<CSSProperties[] | CSSProperties>([Array, Object]),
  'trackStyle': someType<CSSProperties[] | CSSProperties>([Array, Object]),
  'onChange': functionType<(value: Value) => void>(),
  'onAfterChange': functionType<(value: Value) => void>(),
  'onFocus': functionType<FocusEventHandler>(),
  'onBlur': functionType<FocusEventHandler>(),
  'onUpdate:value': functionType<(value: Value) => void>(),
})

export type SliderProps = Partial<ExtractPropTypes<ReturnType<typeof sliderProps>>>
