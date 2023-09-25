import { omit } from '../../_utils/omit'
import { eventType } from '../../_utils/vue'
import { vcInputProps } from '../../_internal/input'
import type { CompositionEventHandler } from '../../_utils/types'
import type { AutoSizeType } from './types'
import type { ExtractPropTypes, PropType } from 'vue'

export const inputProps = () => {
  return omit(vcInputProps(), [
    'wrapperClassName',
    'groupClassName',
    'inputClassName',
    'affixWrapperClassName',
  ])
}

export const textAreaProps = () => ({
  ...omit(inputProps(), ['prefix', 'addonBefore', 'addonAfter', 'suffix']),
  rows: Number,
  autosize: { type: [Boolean, Object] as PropType<boolean | AutoSizeType>, default: undefined },
  autoSize: { type: [Boolean, Object] as PropType<boolean | AutoSizeType>, default: undefined },
  onResize: { type: Function as PropType<(size: { width: number, height: number }) => void> },
  onCompositionstart: eventType<CompositionEventHandler>(),
  onCompositionend: eventType<CompositionEventHandler>(),
  valueModifiers: Object,
})

export type InputProps = Partial<ExtractPropTypes<ReturnType<typeof inputProps>>>

export type TextAreaProps = Partial<ExtractPropTypes<ReturnType<typeof textAreaProps>>>
