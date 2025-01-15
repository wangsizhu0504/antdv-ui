import type { MouseEventHandler, SizeType } from '@antdv/types'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ButtonHTMLType, ButtonShape, ButtonType } from './interface'
import { eventType, PropTypes } from '@antdv/utils'

export function buttonProps() {
  return {
    prefixCls: String,
    type: String as PropType<ButtonType>,
    htmlType: { type: String as PropType<ButtonHTMLType>, default: 'button' },
    shape: { type: String as PropType<ButtonShape> },
    size: {
      type: String as PropType<SizeType | undefined>,
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
  }
}

export function buttonGroupProps() {
  return {
    prefixCls: String,
    size: {
      type: String as PropType<SizeType>,
    },
  }
}

export type ButtonProps = Partial<ExtractPropTypes<ReturnType<typeof buttonProps>>>

export type ButtonGroupProps = Partial<ExtractPropTypes<ReturnType<typeof buttonGroupProps>>>
