import type { BaseTransitionProps, CSSProperties } from 'vue'

export declare type MotionEvent = (TransitionEvent | AnimationEvent) & {
  deadline?: boolean;
}

export declare type MotionEventHandler = (element: Element, done?: () => void) => CSSProperties

export declare type MotionEndEventHandler = (element: Element, done?: () => void) => boolean | void

export interface CSSMotionProps extends Partial<BaseTransitionProps<Element>> {
  name?: string;
  css?: boolean;
}

export const SelectPlacements = ['bottomLeft', 'bottomRight', 'topLeft', 'topRight'] as const
export type SelectCommonPlacement = (typeof SelectPlacements)[number]
