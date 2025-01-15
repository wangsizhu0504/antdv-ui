import type { VueNode } from '@antdv/types'
import type { ExtractPropTypes, PropType } from 'vue'
import type { Direction } from '../../config-provider'
import type {
  GapPositionType,
  ProgressGradient,
  ProgressSize,
  ProgressStatusesType,
  ProgressType,
  StrokeColorType,
  StrokeLinecapType,
  SuccessProps,
} from './interface'
import {
  anyType,
  booleanType,
  functionType,
  objectType,
  someType,
  stringType,
} from '@antdv/utils'

export function progressProps() {
  return {
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
  }
}

export interface CircleProps extends ProgressProps {
  strokeColor?: string | ProgressGradient
}

export function progressCircleProps() {
  return {
    ...progressProps(),
    strokeColor: anyType<string | ProgressGradient>(),
  }
}

export function progressLineProps() {
  return {
    ...progressProps(),
    strokeColor: anyType<string | ProgressGradient>(),
    direction: stringType<Direction>(),
  }
}

export function progressStepsProps() {
  return {
    ...progressProps(),
    steps: Number,
    strokeColor: someType<string | string[]>(),
    trailColor: String,
  }
}

export function internalCircleProps() {
  return {
    gapDegree: Number,
    gapPosition: {
      type: String as PropType<GapPositionType>,
    },
    percent: {
      type: [Array, Number] as PropType<number | number[]>,
    },
    prefixCls: String,
    strokeColor: {
      type: [Object, String, Array] as PropType<StrokeColorType>,
    },
    strokeLinecap: {
      type: String as PropType<StrokeLinecapType>,
    },
    strokeWidth: Number,
    trailColor: String,
    trailWidth: Number,
    transition: String,
  }
}

export type InternalCircleProps = Partial<ExtractPropTypes<ReturnType<typeof internalCircleProps>>>

export type ProgressStepsProps = Partial<ExtractPropTypes<ReturnType<typeof progressStepsProps>>>

export type ProgressLineProps = Partial<ExtractPropTypes<ReturnType<typeof progressLineProps>>>

export type ProgressCircleProps = Partial<ExtractPropTypes<ReturnType<typeof progressCircleProps>>>

export type ProgressProps = Partial<ExtractPropTypes<ReturnType<typeof progressProps>>>
