import PropTypes from '../_util/vue-types'

import { eventType } from '../_util/type'
import type { ExtractPropTypes, PropType } from 'vue'
import type { SizeType } from '../config-provider'
import type { MouseEventHandler } from '../_util/EventInterface'

export type ButtonType = 'link' | 'default' | 'primary' | 'ghost' | 'dashed' | 'text'
export type ButtonShape = 'default' | 'circle' | 'round'

export type ButtonHTMLType = 'submit' | 'button' | 'reset'

export type LegacyButtonType = ButtonType | 'danger' | 'warning' | 'success'

export function convertLegacyProps(type?: LegacyButtonType): ButtonProps {
  switch (type) {
    case 'danger':
      return { danger: true }
    case 'warning':
      return { warning: true }
    case 'success':
      return { success: true }
    default :
      return { type }
  }
}

export const buttonProps = () => ({
  prefixCls: String,
  type: String as PropType<ButtonType>,
  htmlType: { type: String as PropType<ButtonHTMLType>, default: 'button' },
  shape: { type: String as PropType<ButtonShape> },
  size: {
    type: String as PropType<SizeType>,
  },
  loading: {
    type: [Boolean, Object] as PropType<boolean | { delay?: number }>,
    default: (): boolean | { delay?: number } => false,
  },
  disabled: { type: Boolean, default: undefined },
  ghost: { type: Boolean, default: undefined },
  block: { type: Boolean, default: undefined },
  danger: { type: Boolean, default: undefined },
  success: { type: Boolean, default: undefined },
  warning: { type: Boolean, default: undefined },
  icon: PropTypes.any,
  href: String,
  target: String,
  title: String,
  onClick: eventType<MouseEventHandler>(),
  onMousedown: eventType<MouseEventHandler>(),
})

export type ButtonProps = Partial<ExtractPropTypes<ReturnType<typeof buttonProps>>>

export default buttonProps
