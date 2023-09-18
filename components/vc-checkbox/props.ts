import PropTypes from '../_util/vue-types'

export const vcCheckboxProps = () => ({
  prefixCls: String,
  name: String,
  id: String,
  type: String,
  defaultChecked: { type: [Boolean, Number], default: undefined },
  checked: { type: [Boolean, Number], default: undefined },
  disabled: Boolean,
  tabindex: { type: [Number, String] },
  readonly: Boolean,
  autofocus: Boolean,
  value: PropTypes.any,
  required: Boolean,
})
