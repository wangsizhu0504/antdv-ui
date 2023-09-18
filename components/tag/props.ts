import PropTypes from '../_util/vue-types'
import { eventType } from '../_util/type'

import type { LiteralUnion } from '../_util/type'
import type { PresetColorType, PresetStatusColorType } from '../_util/colors'
import type { ExtractPropTypes, HTMLAttributes, PropType } from 'vue'

export const tagProps = () => ({
  'prefixCls': String,
  'color': {
    type: String as PropType<LiteralUnion<PresetColorType | PresetStatusColorType>>,
  },
  'closable': { type: Boolean, default: false },
  'closeIcon': PropTypes.any,
  /** @deprecated `visible` will be removed in next major version. */
  'visible': { type: Boolean, default: undefined },
  'onClose': {
    type: Function as PropType<(e: MouseEvent) => void>,
  },
  'onClick': eventType<(e: MouseEvent) => void>(),
  'onUpdate:visible': Function as PropType<(vis: boolean) => void>,
  'icon': PropTypes.any,
  'bordered': { type: Boolean, default: true },
})

export const checkableTagProps = () => ({
  'prefixCls': String,
  'checked': { type: Boolean, default: undefined },
  'onChange': {
    type: Function as PropType<(checked: boolean) => void>,
  },
  'onClick': {
    type: Function as PropType<(e: MouseEvent) => void>,
  },
  'onUpdate:checked': Function as PropType<(checked: boolean) => void>,
})
export type CheckableTagProps = Partial<ExtractPropTypes<ReturnType<typeof checkableTagProps>>>

export type TagProps = HTMLAttributes & Partial<ExtractPropTypes<ReturnType<typeof tagProps>>>