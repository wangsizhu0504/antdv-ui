import { anyType } from '@antdv/utils'
import type { ExtractPropTypes } from 'vue'
import { abstractTooltipProps } from '../../tooltip'

export function popoverProps() {
  return {
    ...abstractTooltipProps(),
    content: anyType(),
    title: anyType(),
  }
}

export type PopoverProps = Partial<ExtractPropTypes<ReturnType<typeof popoverProps>>>
