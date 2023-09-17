import { booleanType, stringType } from '../_util/type'
import type { ExtractPropTypes } from 'vue'

import type { InputStatus } from '../_util/statusUtils'

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
