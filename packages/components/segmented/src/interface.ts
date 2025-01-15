import type { VueNode } from '@antdv/types';

export type SegmentedValue = string | number;
export type segmentedSize = 'large' | 'small';
export interface SegmentedBaseOption {
  value: string | number
  disabled?: boolean
  payload?: any
  /**
   * html `title` property for label
   */
  title?: string
  className?: string
}

export interface SegmentedOptionType extends SegmentedBaseOption {
  label?: VueNode | ((option: SegmentedBaseOption) => VueNode)
}
export type ThumbRect = {
  left: number
  right: number
  width: number
} | null;

export interface MotionThumbInterface {
  value: SegmentedValue
  getValueIndex: (value: SegmentedValue) => number
  prefixCls: string
  motionName: string
  onMotionStart: VoidFunction
  onMotionEnd: VoidFunction
  direction?: 'ltr' | 'rtl'
}
