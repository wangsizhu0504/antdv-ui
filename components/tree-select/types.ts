import type { BaseSelectRef } from '../vc-select'

export type RawValue = string | number

export interface LabeledValue {
  key?: string
  value: RawValue
  label?: any
}

export type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[]
export type RefTreeSelectProps = BaseSelectRef
