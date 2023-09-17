import PropTypes from '../_util/vue-types'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ResultStatusType } from './types'

export const resultProps = () => ({
  prefixCls: String,
  icon: PropTypes.any,
  status: { type: [Number, String] as PropType<ResultStatusType>, default: 'info' },
  title: PropTypes.any,
  subTitle: PropTypes.any,
  extra: PropTypes.any,
})

export type ResultProps = Partial<ExtractPropTypes<ReturnType<typeof resultProps>>>
