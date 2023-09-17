import { someType } from '../_util/type'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ColSize, Gutter, ResponsiveAligns, ResponsiveJustify } from './type'
import type { RowAligns, RowJustify } from '../constant'

export const colProps = () => ({
  span: [String, Number],
  order: [String, Number],
  offset: [String, Number],
  push: [String, Number],
  pull: [String, Number],
  xs: {
    type: [String, Number, Object] as PropType<string | number | ColSize>,
    default: undefined as string | number | ColSize,
  },
  sm: {
    type: [String, Number, Object] as PropType<string | number | ColSize>,
    default: undefined as string | number | ColSize,
  },
  md: {
    type: [String, Number, Object] as PropType<string | number | ColSize>,
    default: undefined as string | number | ColSize,
  },
  lg: {
    type: [String, Number, Object] as PropType<string | number | ColSize>,
    default: undefined as string | number | ColSize,
  },
  xl: {
    type: [String, Number, Object] as PropType<string | number | ColSize>,
    default: undefined as string | number | ColSize,
  },
  xxl: {
    type: [String, Number, Object] as PropType<string | number | ColSize>,
    default: undefined as string | number | ColSize,
  },
  prefixCls: String,
  flex: [String, Number],
})
export const rowProps = () => ({
  align: someType<(typeof RowAligns)[number] | ResponsiveAligns>([String, Object]),
  justify: someType<(typeof RowJustify)[number] | ResponsiveJustify>([String, Object]),
  prefixCls: String,
  gutter: someType<Gutter | [Gutter, Gutter]>([Number, Array, Object], 0),
  wrap: { type: Boolean, default: undefined },
})

export type RowProps = Partial<ExtractPropTypes<ReturnType<typeof rowProps>>>

export type ColProps = Partial<ExtractPropTypes<ReturnType<typeof colProps>>>
