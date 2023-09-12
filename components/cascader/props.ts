import { omit } from 'lodash-es'
import { cascaderProps as vcCascaderProps } from '../vc-cascader'
import PropTypes from '../_util/vue-types'
import type { ExtractPropTypes, PropType } from 'vue'
import type { SizeType } from '../config-provider'
import type { CascaderOptionType } from './type'
import type { SelectCommonPlacement } from '../_util/components/transition'
import type { InputStatus } from '../_util/statusUtils'
import type { ValueType } from '../vc-cascader/Cascader'

export function cascaderProps<DataNodeType extends CascaderOptionType = CascaderOptionType>() {
  return {
    ...omit(vcCascaderProps(), ['customSlots', 'checkable', 'options']),
    'multiple': { type: Boolean, default: undefined },
    'size': String as PropType<SizeType>,
    'bordered': { type: Boolean, default: undefined },
    'placement': { type: String as PropType<SelectCommonPlacement> },
    'suffixIcon': PropTypes.any,
    'status': String as PropType<InputStatus>,
    'options': Array as PropType<DataNodeType[]>,
    'popupClassName': String,
    /** @deprecated Please use `popupClassName` instead */
    'dropdownClassName': String,
    'onUpdate:value': Function as PropType<(value: ValueType) => void>,
  }
}

export type CascaderProps = Partial<ExtractPropTypes<ReturnType<typeof cascaderProps>>>
