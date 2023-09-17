import {
  anyType,
  booleanType,
  functionType,
  objectType,
  someType,
  stringType,
} from '../_util/type'
import type { Direction } from '../config-provider'
import type { ProgressGradient, ProgressSize, ProgressStatusesType, ProgressType, SuccessProps } from './type'
import type { ExtractPropTypes } from 'vue'
import type { VueNode } from '../_util/type'

export const progressProps = () => ({
  prefixCls: String,
  type: stringType<ProgressType>(),
  percent: Number,
  format: functionType<(percent?: number, successPercent?: number) => VueNode>(),
  status: stringType<ProgressStatusesType>(),
  showInfo: booleanType(),
  strokeWidth: Number,
  strokeLinecap: stringType<'butt' | 'square' | 'round'>(),
  strokeColor: anyType<string | string[] | ProgressGradient>(),
  trailColor: String,
  /** @deprecated Use `size` instead */
  width: Number,
  success: objectType<SuccessProps>(),
  gapDegree: Number,
  gapPosition: stringType<'top' | 'bottom' | 'left' | 'right'>(),
  size: someType<ProgressSize | number | [number, number]>([String, Number, Array]),
  steps: Number,
  /** @deprecated Use `success` instead */
  successPercent: Number,
  title: String,
  progressStatus: stringType<ProgressStatusesType>(),
})

export interface CircleProps extends ProgressProps {
  strokeColor?: string | ProgressGradient
}

export const circleProps = () => ({
  ...progressProps(),
  strokeColor: anyType<string | ProgressGradient>(),
})

export const lineProps = () => ({
  ...progressProps(),
  strokeColor: anyType<string | ProgressGradient>(),
  direction: stringType<Direction>(),
})

export const stepsProps = () => ({
  ...progressProps(),
  steps: Number,
  strokeColor: someType<string | string[]>(),
  trailColor: String,
})

export type StepsProps = Partial<ExtractPropTypes<ReturnType<typeof stepsProps>>>

export type LineProps = Partial<ExtractPropTypes<ReturnType<typeof lineProps>>>

export type ProgressProps = Partial<ExtractPropTypes<ReturnType<typeof progressProps>>>
