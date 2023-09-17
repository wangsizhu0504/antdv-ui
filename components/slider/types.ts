import type { CSSProperties, VNodeTypes } from 'vue'
import type { VueNode } from '../_util/type'

export type SliderValue = number | [number, number]

export interface SliderMarks {
  [key: number]:
  | VueNode
  | {
    style: CSSProperties
    label: any
  }
}

export interface HandleGeneratorInfo {
  value?: number
  dragging?: boolean
  index: number
}
export interface SliderRange {
  draggableTrack?: boolean
}
export type HandleGeneratorFn = (config: {
  tooltipPrefixCls?: string
  prefixCls?: string
  info: HandleGeneratorInfo
}) => VNodeTypes
export interface Visibles {
  [index: number]: boolean
}

export type Value = [number, number] | number
