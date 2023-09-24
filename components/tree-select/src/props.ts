import { omit } from 'lodash-es'
import {
  treeSelectProps as vcTreeSelectProps,
} from '../../_internal/tree-select'
import { PropTypes, booleanType, functionType, objectType, someType, stringType } from '../../_utils/vue'

import type { SelectCommonPlacement } from '../../_internal/transition'
import type { SizeType } from '../../config-provider'
import type { TreeProps } from '../../tree'
import type { BaseOptionType, DefaultOptionType } from '../../_internal/tree-select/TreeSelect'
import type { FieldNames } from '../../_internal/tree-select/interface'
import type { ExtractPropTypes } from 'vue'
import type { InputStatus, Key } from '../../_utils/types'

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
  }
}
export type TreeSelectProps = Partial<ExtractPropTypes<ReturnType<typeof treeSelectProps>>>
