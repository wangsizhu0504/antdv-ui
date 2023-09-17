import type { progressSize, progressStatuses, progressType } from '../constant'

export type ProgressStatusesType = (typeof progressStatuses)[number]
export type ProgressType = (typeof progressType)[number]
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
