import type { GenerateConfig } from '../vc-picker/generate'
import type { Ref } from 'vue'
import type { VueNode } from '../_util/type'
import type { PickerLocale, enUS } from '../locale'
import type {
  PickerPanelBaseProps as RCPickerPanelBaseProps,
  PickerPanelDateProps as RCPickerPanelDateProps,
  PickerPanelTimeProps as RCPickerPanelTimeProps,
} from '../vc-picker/PickerPanel'

export interface CalendarSelectInfo {
  source: 'year' | 'month' | 'date' | 'customize'
}

export interface CalendarProps<DateType> {
  prefixCls?: string
  locale?: typeof enUS.DatePicker
  validRange?: [DateType, DateType]
  disabledDate?: (date: DateType) => boolean
  dateFullCellRender?: CustomRenderType<DateType>
  dateCellRender?: CustomRenderType<DateType>
  monthFullCellRender?: CustomRenderType<DateType>
  monthCellRender?: CustomRenderType<DateType>
  headerRender?: HeaderRender<DateType>
  value?: DateType | string
  defaultValue?: DateType | string
  mode?: CalendarMode
  fullscreen?: boolean
  onChange?: (date: DateType | string) => void
  'onUpdate:value'?: (date: DateType | string) => void
  onPanelChange?: (date: DateType | string, mode: CalendarMode) => void
  onSelect?: (date: DateType, selectInfo: CalendarSelectInfo) => void
  valueFormat?: string
}

export type InjectDefaultProps<Props> = Omit<
  Props,
  | 'locale'
  | 'generateConfig'
  | 'prevIcon'
  | 'nextIcon'
  | 'superPrevIcon'
  | 'superNextIcon'
> & {
  locale?: typeof enUS.DatePicker
  size?: 'large' | 'default' | 'small'
}
// Picker Props
export type PickerPanelBaseProps<DateType> = InjectDefaultProps<RCPickerPanelBaseProps<DateType>>
export type PickerPanelDateProps<DateType> = InjectDefaultProps<RCPickerPanelDateProps<DateType>>
export type PickerPanelTimeProps<DateType> = InjectDefaultProps<RCPickerPanelTimeProps<DateType>>

export type CalendarPickerProps<DateType> =
  | PickerPanelBaseProps<DateType>
  | PickerPanelDateProps<DateType>
  | PickerPanelTimeProps<DateType>

export type CalendarMode = 'year' | 'month'
export type HeaderRender<DateType> = (config: {
  value: DateType
  type: CalendarMode
  onChange: (date: DateType) => void
  onTypeChange: (type: CalendarMode) => void
}) => VueNode

export type CustomRenderType<DateType> = (config: { current: DateType }) => VueNode

export interface SharedProps<DateType> {
  prefixCls: string
  value: DateType
  validRange?: [DateType, DateType]
  generateConfig: GenerateConfig<DateType>
  locale: PickerLocale
  fullscreen: boolean
  divRef: Ref<HTMLDivElement>
  onChange: (year: DateType) => void
}

export interface ModeSwitchProps<DateType> extends Omit<SharedProps<DateType>, 'onChange'> {
  mode: CalendarMode
  onModeChange: (type: CalendarMode) => void
}

export interface CalendarHeaderProps<DateType> {
  prefixCls: string
  value: DateType
  validRange?: [DateType, DateType]
  generateConfig: GenerateConfig<DateType>
  locale: PickerLocale
  mode: CalendarMode
  fullscreen: boolean
  onChange: (date: DateType, source: CalendarSelectInfo['source']) => void
  onModeChange: (mode: CalendarMode) => void
}
