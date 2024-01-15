import type { ExtractPropTypes, PropType } from 'vue'
import { PropTypes, tuple } from '@antdv/utils'
import type { NodeMouseEventHandler } from '@antdv/vue-components'

const AlertTypes = tuple('success', 'info', 'warning', 'error')

export type AlertType = (typeof AlertTypes)[number]

export function alertProps() {
  return {
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
  }
}

export type AlertProps = Partial<ExtractPropTypes<ReturnType<typeof alertProps>>>
