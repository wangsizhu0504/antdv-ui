import type { BaseTransitionProps, CSSProperties, TransitionGroupProps, TransitionProps } from 'vue'
import { TransitionGroup } from 'vue'
import { tuple } from '@antdv/utils'

const SelectPlacements = tuple('bottomLeft', 'bottomRight', 'topLeft', 'topRight')
export type SelectCommonPlacement = (typeof SelectPlacements)[number]

function getTransitionDirection(placement: SelectCommonPlacement | undefined) {
  if (placement !== undefined && (placement === 'topLeft' || placement === 'topRight'))
    return `slide-down`

  return `slide-up`
}

export function getTransitionProps(transitionName: string, opt: TransitionProps = {}) {
  const transitionProps: TransitionProps = transitionName
    ? {
        name: transitionName,
        appear: true,
        // type: 'animation',
        // appearFromClass: `${transitionName}-appear ${transitionName}-appear-prepare`,
        // appearActiveClass: `antdv-base-transtion`,
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

export function getTransitionGroupProps(transitionName: string, opt: TransitionProps = {}) {
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

export declare type MotionEvent = (TransitionEvent | AnimationEvent) & {
  deadline?: boolean;
}

export declare type MotionEventHandler = (element: Element, done?: () => void) => CSSProperties

export declare type MotionEndEventHandler = (element: Element, done?: () => void) => boolean | void

export interface CSSMotionProps extends Partial<BaseTransitionProps<Element>> {
  name?: string;
  css?: boolean;
}

function getTransitionName(rootPrefixCls: string, motion: string, transitionName?: string) {
  if (transitionName !== undefined)
    return transitionName

  return `${rootPrefixCls}-${motion}`
}

export { TransitionGroup, getTransitionName, getTransitionDirection }
