import PropTypes from '../_util/vue-types'
import { DEFAULT_COLUMN_MAP } from '../constant'
import type { Breakpoint } from '../_util/responsiveObserve'
import type { CSSProperties, ExtractPropTypes, HTMLAttributes, PropType } from 'vue'

export const DescriptionsItemProps = {
  prefixCls: String,
  label: PropTypes.any,
  span: Number,
}

export const descriptionsItemProp = () => ({
  prefixCls: String,
  label: PropTypes.any,
  labelStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
  contentStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
  span: { type: Number, default: 1 },
})

export const descriptionsProps = () => ({
  prefixCls: String,
  bordered: { type: Boolean, default: undefined },
  size: { type: String as PropType<'default' | 'middle' | 'small'>, default: 'default' },
  title: PropTypes.any,
  extra: PropTypes.any,
  column: {
    type: [Number, Object] as PropType<number | Partial<Record<Breakpoint, number>>>,
    default: (): number | Partial<Record<Breakpoint, number>> => DEFAULT_COLUMN_MAP,
  },
  layout: String as PropType<'horizontal' | 'vertical'>,
  colon: { type: Boolean, default: undefined },
  labelStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
  contentStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
})

export type DescriptionsProps = HTMLAttributes & Partial<ExtractPropTypes<ReturnType<typeof descriptionsProps>>>

export type DescriptionsItemProp = Partial<ExtractPropTypes<ReturnType<typeof descriptionsItemProp>>>
