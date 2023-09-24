import { abstractTooltipProps } from '../../tooltip'
import { anyType } from '../../_utils/vue'
import type { ExtractPropTypes } from 'vue'

export const popoverProps = () => ({
  ...abstractTooltipProps(),
  content: anyType(),
  title: anyType(),
})

export type PopoverProps = Partial<ExtractPropTypes<ReturnType<typeof popoverProps>>>
