import PropTypes from '../_util/vue-types'
import { booleanType, stringType } from '../_util/type'

// CSSINJS
import { vcInputNumberProps } from '../vc-input-number'
import type { InputStatus } from '../_util/statusUtils'
import type { SizeType } from '../config-provider'
import type { ExtractPropTypes } from 'vue'

const baseProps = vcInputNumberProps()

export const inputNumberProps = () => ({
  ...baseProps,
  'size': stringType<SizeType>(),
  'bordered': booleanType(true),
  'placeholder': String,
  'name': String,
  'id': String,
  'type': String,
  'addonBefore': PropTypes.any,
  'addonAfter': PropTypes.any,
  'prefix': PropTypes.any,
  'onUpdate:value': baseProps.onChange,
  'valueModifiers': Object,
  'status': stringType<InputStatus>(),
})

export type InputNumberProps = Partial<ExtractPropTypes<ReturnType<typeof inputNumberProps>>>
