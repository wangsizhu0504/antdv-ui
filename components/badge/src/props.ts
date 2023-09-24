import { PropTypes } from '../../_utils/vue'
import type { PresetColorKey } from '../../theme'
import type { LiteralUnion, PresetColorType, PresetStatusColorType } from '../../_utils/types'
import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'

export const badgeProps = () => ({
  /** Number to show in badge */
  count: PropTypes.any.def(null),
  showZero: { type: Boolean, default: undefined },
  /** Max count to show */
  overflowCount: { type: Number, default: 99 },
  /** whether to show red dot without number */
  dot: { type: Boolean, default: undefined },
  prefixCls: String,
  scrollNumberPrefixCls: String,
  status: { type: String as PropType<PresetStatusColorType> },
  size: { type: String as PropType<'default' | 'small'>, default: 'default' },
  color: String as PropType<LiteralUnion<PresetColorKey>>,
  text: PropTypes.any,
  offset: Array as unknown as PropType<[number | string, number | string]>,
  numberStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
  title: String,
})

export const ribbonProps = () => ({
  prefix: String,
  color: { type: String as PropType<LiteralUnion<PresetColorType>> },
  text: PropTypes.any,
  placement: { type: String as PropType<'start' | 'end'>, default: 'end' },
})

export const scrollNumberProps = () => ({
  prefixCls: String,
  count: PropTypes.any,
  component: String,
  title: PropTypes.any,
  show: Boolean,
})
export const singleNumberProps = () => ({
  prefixCls: String,
  value: String,
  count: Number,
})

export type BadgeProps = Partial<ExtractPropTypes<ReturnType<typeof badgeProps>>>

export type RibbonProps = Partial<ExtractPropTypes<ReturnType<typeof ribbonProps>>>

export type ScrollNumberProps = Partial<ExtractPropTypes<ReturnType<typeof scrollNumberProps>>>

export type SingleNumberProps = Partial<ExtractPropTypes<ReturnType<typeof singleNumberProps>>>
