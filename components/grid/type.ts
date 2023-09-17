import type { RowAligns, RowJustify } from '../constant'
import type { Breakpoint } from '../_util/responsiveObserve'

export type ColSpanType = number | string

export type FlexType = number | 'none' | 'auto' | string
export type Responsive = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
export type ResponsiveLike<T> = {
  [key in Responsive]?: T;
}

export type Gap = number | undefined
export type Gutter = number | undefined | Partial<Record<Breakpoint, number>>

export type ResponsiveAligns = ResponsiveLike<(typeof RowAligns)[number]>
export type ResponsiveJustify = ResponsiveLike<(typeof RowJustify)[number]>

export interface ColSize {
  span?: ColSpanType
  order?: ColSpanType
  offset?: ColSpanType
  push?: ColSpanType
  pull?: ColSpanType
}
