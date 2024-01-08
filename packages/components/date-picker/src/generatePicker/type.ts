import type { DatePickerLocale } from '@antdv/locale'
import type {
  RCPickerBaseProps,
  RCPickerDateProps,
  RCPickerTimeProps,
  RCRangePickerBaseProps,
  RCRangePickerDateProps,
  RCRangePickerTimeProps,
} from '@antdv/vue-components'
import type { SizeType } from '../../../config-provider'

type InjectDefaultProps<Props> = Omit<
  Props,
  | 'locale'
  | 'generateConfig'
  | 'prevIcon'
  | 'nextIcon'
  | 'superPrevIcon'
  | 'superNextIcon'
  | 'hideHeader'
  | 'components'
> & {
  locale?: DatePickerLocale
  size?: SizeType
  bordered?: boolean
}

// Picker Props
export type PickerBaseProps<DateType> = InjectDefaultProps<RCPickerBaseProps<DateType>>
export type PickerDateProps<DateType> = InjectDefaultProps<RCPickerDateProps<DateType>>
export type PickerTimeProps<DateType> = InjectDefaultProps<RCPickerTimeProps<DateType>>

export type GeneraDatePickerProps<DateType> =
  | PickerBaseProps<DateType>
  | PickerDateProps<DateType>
  | PickerTimeProps<DateType>

// Range Picker Props
export type RangePickerBaseProps<DateType> = InjectDefaultProps<RCRangePickerBaseProps<DateType>>
export type RangePickerDateProps<DateType> = InjectDefaultProps<RCRangePickerDateProps<DateType>>
export type RangePickerTimeProps<DateType> = InjectDefaultProps<RCRangePickerTimeProps<DateType>>

export type RangePickerProps<DateType> =
  | RangePickerBaseProps<DateType>
  | RangePickerDateProps<DateType>
  | RangePickerTimeProps<DateType>
