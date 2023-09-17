import PropTypes from '../_util/vue-types'

import type { FocusEventHandler, KeyboardEventHandler } from '../_util/EventInterface'
import type { Direction } from '../config-provider'
import type { ExtractPropTypes, PropType } from 'vue'

export const rateProps = () => ({
  'prefixCls': String,
  'count': { type: Number, default: 5 },
  'value': { type: Number, default: 0 },
  'allowHalf': { type: Boolean, default: false },
  'allowClear': { type: Boolean, default: true },
  'tooltips': Array as PropType<string[]>,
  'disabled': { type: Boolean, default: undefined },
  'character': PropTypes.any,
  'autofocus': { type: Boolean, default: undefined },
  'tabindex': { type: [Number, String], default: 0 },
  'direction': { type: String as PropType<Direction>, default: 'ltr' },
  'id': String,
  'onChange': Function as PropType<(value: number) => void>,
  'onHoverChange': Function as PropType<(value: number) => void>,
  'onUpdate:value': Function as PropType<(value: number) => void>,
  'onFocus': Function as PropType<FocusEventHandler>,
  'onBlur': Function as PropType<FocusEventHandler>,
  'onKeydown': Function as PropType<KeyboardEventHandler>,
})

export const starProps = () => ({
  value: Number,
  index: Number,
  prefixCls: String,
  allowHalf: { type: Boolean, default: undefined },
  disabled: { type: Boolean, default: undefined },
  character: PropTypes.any,
  characterRender: Function,
  focused: { type: Boolean, default: undefined },
  count: Number,
  onClick: Function,
  onHover: Function,
})

export type StarProps = Partial<ExtractPropTypes<ReturnType<typeof starProps>>>

export type RateProps = Partial<ExtractPropTypes<ReturnType<typeof rateProps>>>
