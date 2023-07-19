import {
  anyType,
  booleanType,
  functionType,
  objectType,
  someType,
  stringType,
} from '../_util/type'
import type { ExtractPropTypes } from 'vue'
import type { VueNode } from '../_util/type'

export const progressStatuses = ['normal', 'exception', 'active', 'success'] as const
export type ProgressStatusesType = (typeof progressStatuses)[number]
const progressType = ['line', 'circle', 'dashboard'] as const
export type ProgressType = (typeof progressType)[number]
const progressSize = ['default', 'small'] as const
export type ProgressSize = (typeof progressSize)[number] | number | [number, number]

export interface StringGradients {
  [percentage: string]: string
}

interface FromToGradients {
  from: string
  to: string
}
export type ProgressGradient = { direction?: string } & (StringGradients | FromToGradients)

export interface SuccessProps {
  percent?: number
  /** @deprecated Use `percent` instead */
  progress?: number
  strokeColor?: string
}

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

export type ProgressProps = Partial<ExtractPropTypes<ReturnType<typeof progressProps>>>
