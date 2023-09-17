import PropTypes from '../_util/vue-types'
import type { ExtractPropTypes, PropType } from 'vue'
import type { SpinSize } from './types'

export const spinProps = () => ({
  prefixCls: String,
  spinning: { type: Boolean, default: undefined },
  size: String as PropType<SpinSize>,
  wrapperClassName: String,
  tip: PropTypes.any,
  delay: Number,
  indicator: PropTypes.any,
})

export type SpinProps = Partial<ExtractPropTypes<ReturnType<typeof spinProps>>>
