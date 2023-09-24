import type { Key } from '../../_utils/types'
import type { DisplayValueType } from './BaseSelect'

export type OnActiveValue = (
  active: RawValueType,
  index: number,
  info?: { source?: 'keyboard' | 'mouse' },
) => void

export type OnInternalSelect = (value: RawValueType, info: { selected: boolean }) => void

export type RawValueType = string | number
export interface LabelInValueType {
  label: any
  originLabel?: any
  value: RawValueType
  /** @deprecated `key` is useless since it should always same as `value` */
  key?: Key
}

export type DraftValueType =
  | RawValueType
  | LabelInValueType
  | DisplayValueType
  | (RawValueType | LabelInValueType | DisplayValueType)[]

export type FilterFunc<OptionType> = (inputValue: string, option?: OptionType) => boolean

export interface FieldNames {
  value?: string
  label?: string
  options?: string
}

export interface BaseOptionType {
  disabled?: boolean
  [name: string]: any
}

export interface DefaultOptionType extends BaseOptionType {
  label?: any
  value?: string | number | null
  children?: Omit<DefaultOptionType, 'children'>[]
}

export type SelectHandler<ValueType = any, OptionType extends BaseOptionType = DefaultOptionType> =
  | ((value: RawValueType | LabelInValueType, option: OptionType) => void)
  | ((value: ValueType, option: OptionType) => void)
