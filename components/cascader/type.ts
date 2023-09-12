import type { BaseOptionType, DefaultOptionType, FieldNames, ShowSearchType } from '../vc-cascader'

export type { BaseOptionType, DefaultOptionType, ShowSearchType }

export type FieldNamesType = FieldNames

export type FilledFieldNamesType = Required<FieldNamesType>

export interface CascaderOptionType extends DefaultOptionType {
  isLeaf?: boolean
  loading?: boolean
  children?: CascaderOptionType[]
  [key: string]: any
}

export interface CascaderRef {
  focus: () => void
  blur: () => void
}
