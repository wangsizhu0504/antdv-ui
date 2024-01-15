import type { progressStatuses } from '@antdv/constants'

export type ProgressStatusesType = (typeof progressStatuses)[number]
const progressType = ['line', 'circle', 'dashboard'] as const
export type ProgressType = (typeof progressType)[number]
const progressSize = ['default', 'small'] as const
export type ProgressSize = (typeof progressSize)[number] | number | [number, number]

export interface StringGradients {
  [percentage: string]: string
}

export interface FromToGradients {
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

export type StrokeColorType = string | string[] | object

export type GapPositionType = 'top' | 'right' | 'bottom' | 'left'

export type StrokeLinecapType = 'round' | 'butt' | 'square'
