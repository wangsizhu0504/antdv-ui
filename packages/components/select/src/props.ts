import {
  PropTypes,
  booleanType,
  functionType,
  omit,
  someType,
  stringType,
} from '@antdv/utils'

import type { ExtractPropTypes } from 'vue'
import type { InputStatus, SelectValue, SizeType } from '@antdv/types'
import type { SelectCommonPlacement } from '@antdv/vue-components'
import { vcSelectProps } from '@antdv/vue-components'

export function selectProps() {
  return {
    ...omit(vcSelectProps<SelectValue>(), [
      'inputIcon',
      'mode',
      'getInputElement',
      'getRawInputElement',
      'backfill',
    ]),
    'value': someType<SelectValue>([Array, Object, String, Number]),
    'defaultValue': someType<SelectValue>([Array, Object, String, Number]),
    'notFoundContent': PropTypes.any,
    'suffixIcon': PropTypes.any,
    'itemIcon': PropTypes.any,
    'size': stringType<SizeType>(),
    'mode': stringType<'multiple' | 'tags' | 'SECRET_COMBOBOX_MODE_DO_NOT_USE'>(),
    'bordered': booleanType(true),
    'transitionName': String,
    'choiceTransitionName': stringType(''),
    'popupClassName': String,
    /** @deprecated Please use `popupClassName` instead */
    'dropdownClassName': String,
    'placement': stringType<SelectCommonPlacement>(),
    'status': stringType<InputStatus>(),
    'onUpdate:value': functionType<(val: SelectValue) => void>(),
  }
}

export type SelectProps = Partial<ExtractPropTypes<ReturnType<typeof selectProps>>>
