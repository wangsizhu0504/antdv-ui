import type { Ref } from 'vue'
import type { VueNode } from '@antdv/types'
import type { PickerLocale } from '@antdv/locale'
import type { GenerateConfig } from './generate'

export type PanelMode = 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year' | 'decade'

export type PickerMode = Exclude<PanelMode, 'datetime' | 'decade'>

export interface PanelRefProps {
  onKeydown?: (e: KeyboardEvent) => boolean
  onBlur?: (e: FocusEvent) => void
  onClose?: () => void
}

export type NullableDateType<DateType> = DateType | null | undefined

export type OnSelect<DateType> = (value: DateType, type: 'key' | 'mouse' | 'submit') => void

export interface PanelSharedProps<DateType> {
  prefixCls: string
  generateConfig: GenerateConfig<DateType>
  value?: NullableDateType<DateType>
  viewDate: DateType
  /** [Legacy] Set default display picker view date */
  defaultPickerValue?: DateType
  locale: PickerLocale
  disabledDate?: (date: DateType) => boolean

  prevIcon?: VueNode
  nextIcon?: VueNode
  superPrevIcon?: VueNode
  superNextIcon?: VueNode

  // /**
  //  * Typescript can not handle generic type so we can not use `forwardRef` here.
  //  * Thus, move ref into operationRef.
  //  * This is little hack which should refactor after typescript support.
  //  */
  operationRef: Ref<PanelRefProps>

  onSelect: OnSelect<DateType>
  onViewDateChange: (value: DateType) => void
  onPanelChange: (mode: PanelMode | null, viewValue: DateType) => void
}

export interface DisabledTimes {
  disabledHours?: () => number[]
  disabledMinutes?: (hour: number) => number[]
  disabledSeconds?: (hour: number, minute: number) => number[]
}

export type DisabledTime<DateType> = (date: DateType | null) => DisabledTimes

export type OnPanelChange<DateType> = (value: DateType, mode: PanelMode) => void

export type EventValue<DateType> = DateType | null
export type RangeValue<DateType> = [EventValue<DateType>, EventValue<DateType>] | null

export interface Components {
  button?: any
}

export type RangeList = Array<{
  label: VueNode
  onClick: () => void
  onMouseenter: () => void
  onMouseleave: () => void
}>

export type CustomFormat<DateType> = (value: DateType) => string

export interface PresetDate<T> {
  label: VueNode
  value: T
}
