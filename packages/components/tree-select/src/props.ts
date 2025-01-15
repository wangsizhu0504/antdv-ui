import type { InputStatus, Key, SizeType } from '@antdv/types';
import type { SelectCommonPlacement } from '@antdv/vue-components';
import type { BaseOptionType, DefaultOptionType, FieldNames } from '@antdv/vue-components/vc-tree-select/src/TreeSelect';
import type { ExtractPropTypes } from 'vue';
import type { TreeProps } from '../../tree';
import {
  booleanType,
  functionType,
  objectType,
  omit,
  PropTypes,
  someType,
  stringType,
} from '@antdv/utils';

import { treeSelectProps as vcTreeSelectProps } from '@antdv/vue-components/vc-tree-select/src/TreeSelect';

export function treeSelectProps<
  ValueType = any,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
>() {
  return {
    ...omit(vcTreeSelectProps<ValueType, OptionType>(), [
      'showTreeIcon',
      'treeMotion',
      'inputIcon',
      'getInputElement',
      'treeLine',
      'customSlots',
    ]),
    'suffixIcon': PropTypes.any,
    'size': stringType<SizeType>(),
    'bordered': booleanType(),
    'treeLine': someType<TreeProps['showLine']>([Boolean, Object]),
    'replaceFields': objectType<FieldNames>(),
    'placement': stringType<SelectCommonPlacement>(),
    'status': stringType<InputStatus>(),
    'popupClassName': String,
    /** @deprecated Please use `popupClassName` instead */
    'dropdownClassName': String,
    'onUpdate:value': functionType<(value: any) => void>(),
    'onUpdate:treeExpandedKeys': functionType<(keys: Key[]) => void>(),
    'onUpdate:searchValue': functionType<(value: string) => void>(),
  };
}
export type TreeSelectProps = Partial<ExtractPropTypes<ReturnType<typeof treeSelectProps>>>;
