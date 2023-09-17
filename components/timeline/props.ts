import PropTypes from '../_util/vue-types'

import { booleanType, tuple } from '../_util/type'
import type { ExtractPropTypes } from 'vue'

export const timelineProps = () => ({
  prefixCls: String,
  /** 指定最后一个幽灵节点是否存在或内容 */
  pending: PropTypes.any,
  pendingDot: PropTypes.any,
  reverse: booleanType(),
  mode: PropTypes.oneOf(tuple('left', 'alternate', 'right', '')),
})
export const timelineItemProps = () => ({
  prefixCls: String,
  color: String,
  dot: PropTypes.any,
  pending: booleanType(),
  position: PropTypes.oneOf(tuple('left', 'right', '')).def(''),
  label: PropTypes.any,
})

export type TimelineItemProps = Partial<ExtractPropTypes<ReturnType<typeof timelineItemProps>>>

export type TimelineProps = Partial<ExtractPropTypes<ReturnType<typeof timelineProps>>>
