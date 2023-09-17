import {
  treeSelectProps as vcTreeSelectProps,
} from '../vc-tree-select'
import omit from '../_util/omit'
import PropTypes from '../_util/vue-types'

import { booleanType, functionType, objectType, someType, stringType } from '../_util/type'

// CSSINJS
import type { InputStatus } from '../_util/statusUtils'
import type { SelectCommonPlacement } from '../_util/components/transition'
import type { SizeType } from '../config-provider'
import type { TreeProps } from '../tree'
import type { BaseOptionType, DefaultOptionType } from '../vc-tree-select/TreeSelect'
import type { FieldNames, Key } from '../vc-tree-select/interface'
import type { ExtractPropTypes } from 'vue'

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
