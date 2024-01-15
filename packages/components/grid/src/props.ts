import { someType } from '@antdv/utils'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ColSize, Gutter, ResponsiveAligns, ResponsiveJustify } from './interface'

export const RowAligns = ['top', 'middle', 'bottom', 'stretch'] as const
export const RowJustify = [
  'start',
  'end',
  'center',
  'space-around',
  'space-between',
  'space-evenly',
] as const

export function colProps() {
  return {
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
  }
}
export function rowProps() {
  return {
    align: someType<(typeof RowAligns)[number] | ResponsiveAligns>([String, Object]),
    justify: someType<(typeof RowJustify)[number] | ResponsiveJustify>([String, Object]),
    prefixCls: String,
    gutter: someType<Gutter | [Gutter, Gutter]>([Number, Array, Object], 0),
    wrap: { type: Boolean, default: undefined },
  }
}

export type RowProps = Partial<ExtractPropTypes<ReturnType<typeof rowProps>>>

export type ColProps = Partial<ExtractPropTypes<ReturnType<typeof colProps>>>
