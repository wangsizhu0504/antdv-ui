import type { OptionProps } from '../vc-select/Option'
import type { BaseSelectRef } from '../vc-select'
import type { BaseOptionType, DefaultOptionType } from '../vc-select/Select'

type RawValue = string | number
export type OptionType = typeof Option

export type { OptionProps, BaseSelectRef as RefSelectProps, BaseOptionType, DefaultOptionType }

export interface LabeledValue {
  key?: string
  value: RawValue
  label?: any
}
export type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[] | undefined
