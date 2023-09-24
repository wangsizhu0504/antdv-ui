import { PropTypes, tuple } from '../../_utils/vue'
import type { ExtractPropTypes, PropType } from 'vue'
import type { NodeMouseEventHandler } from '../../_internal/tree/contextTypes'

const AlertTypes = tuple('success', 'info', 'warning', 'error')

export type AlertType = (typeof AlertTypes)[number]

export const alertProps = () => ({
  /**
   * Type of Alert styles, options: `success`, `info`, `warning`, `error`
   */
  type: PropTypes.oneOf(AlertTypes),
  /** Whether Alert can be closed */
  closable: { type: Boolean, default: undefined },
  /** Close text to show */
  closeText: PropTypes.any,
  /** Content of Alert */
  message: PropTypes.any,
  /** Additional content of Alert */
  description: PropTypes.any,
  /** Trigger when animation ending of Alert */
  afterClose: Function as PropType<() => void>,
  /** Whether to show icon */
  showIcon: { type: Boolean, default: undefined },
  prefixCls: String,
  banner: { type: Boolean, default: undefined },
  icon: PropTypes.any,
  closeIcon: PropTypes.any,
  onClose: Function as PropType<NodeMouseEventHandler>,
})

export type AlertProps = Partial<ExtractPropTypes<ReturnType<typeof alertProps>>>
