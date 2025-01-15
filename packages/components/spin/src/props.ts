import type { ExtractPropTypes, PropType } from 'vue'
import type { SpinSize } from './interface'
import { PropTypes } from '@antdv/utils'

export function spinProps() {
  return {
    prefixCls: String,
    spinning: { type: Boolean, default: undefined },
    size: String as PropType<SpinSize>,
    wrapperClassName: String,
    tip: PropTypes.any,
    delay: Number,
    indicator: PropTypes.any,
  }
}

export type SpinProps = Partial<ExtractPropTypes<ReturnType<typeof spinProps>>>
