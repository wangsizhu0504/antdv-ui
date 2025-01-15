import type { ExtractPropTypes } from 'vue';
import { anyType } from '@antdv/utils';
import { abstractTooltipProps } from '../../tooltip';

export function popoverProps() {
  return {
    ...abstractTooltipProps(),
    content: anyType(),
    title: anyType(),
  };
}

export type PopoverProps = Partial<ExtractPropTypes<ReturnType<typeof popoverProps>>>;
