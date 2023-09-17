import type { SHOW_CHILD, SHOW_PARENT } from './Cascader'

export interface ShowSearchType<OptionType extends BaseOptionType = DefaultOptionType> {
  filter?: (inputValue: string, options: OptionType[], fieldNames: FieldNames) => boolean
  render?: (arg?: {
    inputValue: string
    path: OptionType[]
    prefixCls: string
    fieldNames: FieldNames
  }) => any
  sort?: (a: OptionType[], b: OptionType[], inputValue: string, fieldNames: FieldNames) => number
  matchInputWidth?: boolean
  limit?: number | false
}

export interface FieldNames {
  label?: string
  value?: string
  children?: string
}

export interface InternalFieldNames extends Required<FieldNames> {
  key: string
}

export type SingleValueType = (string | number)[]

export type ValueType = SingleValueType | SingleValueType[]
export type ShowCheckedStrategy = typeof SHOW_PARENT | typeof SHOW_CHILD

export interface BaseOptionType {
  disabled?: boolean
  [name: string]: any
}
export interface DefaultOptionType extends BaseOptionType {
  label?: any
  value?: string | number | null
  children?: DefaultOptionType[]
}

export type OnSingleChange<OptionType> = (value: SingleValueType, selectOptions: OptionType[]) => void
export type OnMultipleChange<OptionType> = (
  value: SingleValueType[],
  selectOptions: OptionType[][],
) => void
