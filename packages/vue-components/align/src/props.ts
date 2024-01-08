import type { PropType } from 'vue'
import type { AlignType, OnAlign, TargetType } from './types'

export function alignProps() {
  return {
    align: Object as PropType<AlignType>,
    target: [Object, Function] as PropType<TargetType>,
    onAlign: Function as PropType<OnAlign>,
    monitorBufferTime: Number,
    monitorWindowResize: Boolean,
    disabled: Boolean,
  }
}

export interface AlignProps {
  align: AlignType
  target: TargetType
  onAlign?: OnAlign
  monitorBufferTime?: number
  monitorWindowResize?: boolean
  disabled?: boolean
}
