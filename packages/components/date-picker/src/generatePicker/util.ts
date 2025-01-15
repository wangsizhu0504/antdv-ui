import type { PickerMode } from '@antdv/vue-components/vc-picker/src/interface'
import type { SharedTimeProps } from '@antdv/vue-components/vc-picker/src/panels/TimePanel'
import PickerButton from '../PickerButton'
import PickerTag from '../PickerTag'

export const Components = { button: PickerButton, rangeItem: PickerTag }

function toArray<T>(list: T | T[]): T[] {
  if (!list)
    return []

  return Array.isArray(list) ? list : [list]
}

export function getTimeProps<DateType, DisabledTime>(
  props: { format?: string, picker?: PickerMode } & Omit<
    SharedTimeProps<DateType>,
    'disabledTime'
  > & {
    disabledTime?: DisabledTime
  },
) {
  const { format, picker, showHour, showMinute, showSecond, use12Hours } = props

  const firstFormat = toArray(format)[0]
  const showTimeObj = { ...props }

  if (firstFormat && typeof firstFormat === 'string') {
    if (!firstFormat.includes('s') && showSecond === undefined)
      showTimeObj.showSecond = false

    if (!firstFormat.includes('m') && showMinute === undefined)
      showTimeObj.showMinute = false

    if (!firstFormat.includes('H') && !firstFormat.includes('h') && showHour === undefined)
      showTimeObj.showHour = false

    if ((firstFormat.includes('a') || firstFormat.includes('A')) && use12Hours === undefined)
      showTimeObj.use12Hours = true
  }

  if (picker === 'time')
    return showTimeObj

  if (typeof firstFormat === 'function') {
    // format of showTime should use default when format is custom format function
    delete showTimeObj.format
  }

  return {
    showTime: showTimeObj,
  }
}
