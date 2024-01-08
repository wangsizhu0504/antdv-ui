import { PropTypes } from '@antdv/utils'

export const checkboxProps = {
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
}
