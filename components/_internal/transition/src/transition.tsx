import { tuple } from '../../../_utils/vue'

import type {
  TransitionGroupProps,
  TransitionProps,
} from 'vue'

const SelectPlacements = tuple('bottomLeft', 'bottomRight', 'topLeft', 'topRight')
export type SelectCommonPlacement = (typeof SelectPlacements)[number]

const getTransitionDirection = (placement: SelectCommonPlacement | undefined) => {
  if (placement !== undefined && (placement === 'topLeft' || placement === 'topRight'))
    return 'slide-down'

  return 'slide-up'
}

export const getTransitionProps = (transitionName: string, opt: TransitionProps = {}) => {
  const transitionProps: TransitionProps = transitionName
    ? {
        name: transitionName,
        appear: true,
        // type: 'animation',
        // appearFromClass: `${transitionName}-appear ${transitionName}-appear-prepare`,
        // appearActiveClass: `antd-vue-base-transtion`,
        // appearToClass: `${transitionName}-appear ${transitionName}-appear-active`,
        enterFromClass: `${transitionName}-enter ${transitionName}-enter-prepare ${transitionName}-enter-start`,
        enterActiveClass: `${transitionName}-enter ${transitionName}-enter-prepare`,
        enterToClass: `${transitionName}-enter ${transitionName}-enter-active`,
        leaveFromClass: ` ${transitionName}-leave`,
        leaveActiveClass: `${transitionName}-leave ${transitionName}-leave-active`,
        leaveToClass: `${transitionName}-leave ${transitionName}-leave-active`,
        ...opt,
      }
    : { css: false, ...opt }
  return transitionProps
}

export const getTransitionGroupProps = (transitionName: string, opt: TransitionProps = {}) => {
  const transitionProps: TransitionGroupProps = transitionName
    ? {
        name: transitionName,
        appear: true,
        // appearFromClass: `${transitionName}-appear ${transitionName}-appear-prepare`,
        appearActiveClass: `${transitionName}`,
        appearToClass: `${transitionName}-appear ${transitionName}-appear-active`,
        enterFromClass: `${transitionName}-appear ${transitionName}-enter ${transitionName}-appear-prepare ${transitionName}-enter-prepare`,
        enterActiveClass: `${transitionName}`,
        enterToClass: `${transitionName}-enter ${transitionName}-appear ${transitionName}-appear-active ${transitionName}-enter-active`,
        leaveActiveClass: `${transitionName} ${transitionName}-leave`,
        leaveToClass: `${transitionName}-leave-active`,
        ...opt,
      }
    : { css: false, ...opt }
  return transitionProps
}

const getTransitionName = (rootPrefixCls: string, motion: string, transitionName?: string) => {
  if (transitionName !== undefined)
    return transitionName

  return `${rootPrefixCls}-${motion}`
}

export { getTransitionName, getTransitionDirection }
