import type { InputStatus } from '@antdv/types'
import type { ExtractPropTypes } from 'vue'
import { booleanType, stringType } from '@antdv/utils'

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
