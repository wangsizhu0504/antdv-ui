import { PropTypes, eventType } from '../../_utils/vue'
import type { MouseEventHandler } from '../../_utils/types'
import type { ButtonHTMLType, ButtonShape, ButtonType } from './type'
import type { ExtractPropTypes, PropType } from 'vue'
import type { SizeType } from '../../config-provider'

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

export const buttonGroupProps = () => ({
  prefixCls: String,
  size: {
    type: String as PropType<SizeType>,
  },
})

export type ButtonProps = Partial<ExtractPropTypes<ReturnType<typeof buttonProps>>>

export type ButtonGroupProps = Partial<ExtractPropTypes<ReturnType<typeof buttonGroupProps>>>
