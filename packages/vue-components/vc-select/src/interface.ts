import type { Key } from '@antdv/types';
import type { RawValueType } from './BaseSelect';

export interface FlattenOptionData<OptionType> {
  label?: any;
  data: OptionType;
  key: Key;
  value?: RawValueType;
  groupOption?: boolean;
  group?: boolean;
}
