import omit from '../_util/omit'
import { eventType } from '../_util/type'
import { inputProps as vcInputProps } from '../vc-input/inputProps'
import type { AutoSizeType } from './type'
import type { ExtractPropTypes, PropType } from 'vue'
import type { CompositionEventHandler } from '../_util/EventInterface'

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
