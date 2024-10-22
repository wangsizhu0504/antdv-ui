import type { PanelMode, RangeValue } from '@antdv/vue-components/vc-picker/src/interface'
import type { CommonProps, DatePickerProps, RangePickerTimeProps } from '../../date-picker'
import type { CommonTimePickerProps } from './props'

export type TimeRangePickerProps<DateType> = Omit<
  RangePickerTimeProps<DateType>,
  'picker' | 'defaultPickerValue' | 'defaultValue' | 'value' | 'onChange' | 'onPanelChange' | 'onOk'
> & {
  'popupClassName'?: string
  'valueFormat'?: string
  'defaultPickerValue'?: RangeValue<DateType> | RangeValue<string>
  'defaultValue'?: RangeValue<DateType> | RangeValue<string>
  'value'?: RangeValue<DateType> | RangeValue<string>
  'onChange'?: (
    value: RangeValue<DateType> | RangeValue<string> | null,
    dateString: [string, string],
  ) => void
  'onUpdate:value'?: (value: RangeValue<DateType> | RangeValue<string> | null) => void
  'onPanelChange'?: (
    values: RangeValue<DateType> | RangeValue<string>,
    modes: [PanelMode, PanelMode],
  ) => void
  'onOk'?: (dates: RangeValue<DateType> | RangeValue<string>) => void
}

export type TimePickerProps<DateType> = CommonProps<DateType> & DatePickerProps<DateType> & CommonTimePickerProps & {
  addon?: () => void
}
