import { booleanType, stringType } from '../../_utils/vue'
import type { InputStatus } from '../../_utils/types'
import type { ExtractPropTypes } from 'vue'

export const commonTimePickerProps = () => ({
  format: String,
  showNow: booleanType(),
  showHour: booleanType(),
  showMinute: booleanType(),
  showSecond: booleanType(),
  use12Hours: booleanType(),
  hourStep: Number,
  minuteStep: Number,
  secondStep: Number,
  hideDisabledOptions: booleanType(),
  popupClassName: String,
  status: stringType<InputStatus>(),
})

export type CommonTimePickerProps = Partial<ExtractPropTypes<ReturnType<typeof commonTimePickerProps>>>
