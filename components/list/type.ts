import type { Ref } from 'vue'

export interface ListContext {
  grid?: Ref<any>
  itemLayout?: Ref<string>
}

export type ColumnType = 'gutter' | 'column' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'

export type ColumnCount = number
export interface ListGridType {
  gutter?: number
  column?: ColumnCount
  xs?: ColumnCount
  sm?: ColumnCount
  md?: ColumnCount
  lg?: ColumnCount
  xl?: ColumnCount
  xxl?: ColumnCount
  xxxl?: ColumnCount
}

export type ListSize = 'small' | 'default' | 'large'
export type ListItemLayout = 'horizontal' | 'vertical'
export interface ListLocale {
  emptyText: any
}
