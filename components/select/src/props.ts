import { omit } from '../../_utils/omit'

import { PropTypes, booleanType, functionType, someType, stringType } from '../../_utils/vue'
import { selectProps as vcSelectProps } from '../../_internal/select'
import type { SelectCommonPlacement } from '../../_internal/transition'
import type { InputStatus, SelectValue } from '../../_utils/types'
import type { ExtractPropTypes } from 'vue'
import type { SizeType } from '../../config-provider'

export const selectProps = () => ({
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
})

export type SelectProps = Partial<ExtractPropTypes<ReturnType<typeof selectProps>>>
