import { booleanType, stringType } from '@antdv/utils'
import type { ExtractPropTypes } from 'vue'
import type { InputStatus } from '@antdv/types'

export function commonTimePickerProps() {
  return {
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
  }
}

export type CommonTimePickerProps = Partial<ExtractPropTypes<ReturnType<typeof commonTimePickerProps>>>
