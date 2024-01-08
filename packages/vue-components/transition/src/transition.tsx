import type { MotionEventHandler, SelectCommonPlacement } from './type'

export function getTransitionDirection(placement: SelectCommonPlacement | undefined) {
  if (placement !== undefined && (placement === 'topLeft' || placement === 'topRight'))
    return `slide-down`

  return `slide-up`
}

// ================== Collapse Motion ==================

export const getRealHeight: MotionEventHandler = node => ({
  height: `${node.scrollHeight}px`,
  opacity: 1,
})
export const getCurrentHeight: MotionEventHandler = (node: any) => ({ height: `${node.offsetHeight}px` })
// const skipOpacityTransition: MotionEndEventHandler = (_, event) =>
//   (event as TransitionEvent).propertyName === 'height';

export function getTransitionName(rootPrefixCls: string, motion: string, transitionName?: string) {
  if (transitionName !== undefined)
    return transitionName

  return `${rootPrefixCls}-${motion}`
}
