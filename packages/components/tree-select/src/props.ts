import {
  PropTypes,
  booleanType,
  functionType,
  objectType,
  omit,
  someType,
  stringType,
} from '@antdv/utils'
import type { ExtractPropTypes } from 'vue'
import type { InputStatus, Key } from '@antdv/types'
import type {
  SelectCommonPlacement,
  VcTreeSelectBaseOption,
  VcTreeSelectDefaultOption,
  VcTreeSelectFieldName,
} from '@antdv/vue-components'
import { vcTreeSelectProps } from '@antdv/vue-components'

import type { SizeType } from '../../config-provider'
import type { TreeProps } from '../../tree'

export function treeSelectProps<
  ValueType = any,
  OptionType extends VcTreeSelectBaseOption | VcTreeSelectDefaultOption = VcTreeSelectDefaultOption,
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
    'replaceFields': objectType<VcTreeSelectFieldName>(),
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
