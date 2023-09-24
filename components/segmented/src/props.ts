import { anyType, arrayType, booleanType, functionType, someType, stringType } from '../../_utils/vue'
import type { ExtractPropTypes, Ref } from 'vue'
import type { SegmentedOptionType, SegmentedValue, segmentedSize } from './types'

export const motionThumbProps = () => ({
  value: anyType<SegmentedValue>(),
  getValueIndex: anyType<(value: SegmentedValue) => number>(),
  prefixCls: anyType<string>(),
  motionName: anyType<string>(),
  onMotionStart: anyType<VoidFunction>(),
  onMotionEnd: anyType<VoidFunction>(),
  direction: anyType<'ltr' | 'rtl'>(),
  containerRef: anyType<Ref<HTMLDivElement>>(),
})

export const segmentedProps = () => ({
  'prefixCls': String,
  'options': arrayType<(SegmentedOptionType | string | number)[]>(),
  'block': booleanType(),
  'disabled': booleanType(),
  'size': stringType<segmentedSize>(),
  'value': { ...someType<SegmentedValue>([String, Number]), required: true },
  'motionName': String,
  'onChange': functionType<(val: SegmentedValue) => void>(),
  'onUpdate:value': functionType<(val: SegmentedValue) => void>(),
})

export type SegmentedProps = Partial<ExtractPropTypes<ReturnType<typeof segmentedProps>>>
