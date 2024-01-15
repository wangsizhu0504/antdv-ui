import type { ExtractPropTypes, PropType } from 'vue'
import { PropTypes, omit } from '@antdv/utils'
import type { SelectCommonPlacement } from '@antdv/vue-components'
import type { ValueType } from '@antdv/vue-components/vc-cascader/src/Cascader'
import { internalCascaderProps as vcCascaderProps } from '@antdv/vue-components/vc-cascader/src/Cascader'
import type { InputStatus, SizeType } from '@antdv/types'
import type { CascaderOptionType } from './interface'

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
