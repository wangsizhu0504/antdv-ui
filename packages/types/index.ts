import type { BaseTransitionProps } from 'vue'

export * from './global'
export * from './event'
export * from './colors'
export * from './status'
export interface RefObject extends Function {
  current?: any;
}
export interface CSSMotionProps extends Partial<BaseTransitionProps<Element>> {
  name?: string
  css?: boolean
}

export type SizeType = 'small' | 'middle' | 'large' | undefined
