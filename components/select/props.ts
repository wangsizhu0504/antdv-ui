import { omit } from 'lodash-es'
import PropTypes from '../_util/vue-types'
import { booleanType, functionType, someType, stringType } from '../_util/type'
import { selectProps as vcSelectProps } from '../vc-select'
import type { SelectValue } from '../_util/type'
import type { ExtractPropTypes } from 'vue'
import type { SizeType } from '../config-provider'
import type { SelectCommonPlacement } from '../_util/components/transition'
import type { InputStatus } from '../_util/statusUtils'

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
