import type {
  BaseOptionType,
  DefaultOptionType,
  FieldNames,
  ShowSearchType,
} from '@antdv/vue-components/vc-cascader/src/Cascader'

export type { BaseOptionType as BaseCascaderOption, DefaultOptionType as DefaultCascaderOption, ShowSearchType }

export type FieldNamesType = FieldNames

export type FilledFieldNamesType = Required<FieldNamesType>

export interface CascaderOptionType extends DefaultOptionType {
  isLeaf?: boolean;
  loading?: boolean;
  children?: CascaderOptionType[];
  [key: string]: any;
}

export interface CascaderRef {
  focus: () => void;
  blur: () => void;
}
