import { PropTypes, booleanType, functionType, objectType, stringType } from '@antdv/utils'
import type { ExtractPropTypes } from 'vue'
import type { MouseEventHandler } from '@antdv/types'
import type { FloatButtonBadgeProps, FloatButtonGroupTrigger, FloatButtonShape, FloatButtonType } from './types'

export function floatButtonProps() {
  return {
    prefixCls: String,
    description: PropTypes.any,
    type: stringType<FloatButtonType>('default'),
    shape: stringType<FloatButtonShape>('circle'),
    tooltip: PropTypes.any,
    href: String,
    target: functionType<() => Window | HTMLElement | null>(),
    badge: objectType<FloatButtonBadgeProps>(),
    onClick: functionType<MouseEventHandler>(),
  }
}
export function floatButtonContentProps() {
  return {
    prefixCls: stringType<FloatButtonProps['prefixCls']>(),
  }
}

export function floatButtonGroupProps() {
  return {
    ...floatButtonProps(),
    // 包含的 Float Button
    // 触发方式 (有触发方式为菜单模式）
    'trigger': stringType<FloatButtonGroupTrigger>(),
    // 受控展开
    'open': booleanType(),
    // 展开收起的回调
    'onOpenChange': functionType<(open: boolean) => void>(),
    'onUpdate:open': functionType<(open: boolean) => void>(),
  }
}

export function backTopProps() {
  return {
    ...floatButtonProps(),
    prefixCls: String,
    duration: Number,
    target: functionType<() => HTMLElement | Window | Document>(),
    visibilityHeight: Number,
    onClick: functionType<MouseEventHandler>(),
  }
}

export type BackTopProps = Partial<ExtractPropTypes<ReturnType<typeof backTopProps>>>

export type FloatButtonGroupProps = Partial<ExtractPropTypes<ReturnType<typeof floatButtonGroupProps>>>

export type FloatButtonContentProps = Partial<ExtractPropTypes<ReturnType<typeof floatButtonContentProps>>>

export type FloatButtonProps = Partial<ExtractPropTypes<ReturnType<typeof floatButtonProps>>>
