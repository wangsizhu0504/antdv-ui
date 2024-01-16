import type { Ref } from 'vue'

export interface ListContext {
  grid?: Ref<any>
  itemLayout?: Ref<string>
}

export type ListColumnType = 'gutter' | 'column' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'

export type ListColumnCount = number
export interface ListGridType {
  gutter?: number
  column?: ListColumnCount
  xs?: ListColumnCount
  sm?: ListColumnCount
  md?: ListColumnCount
  lg?: ListColumnCount
  xl?: ListColumnCount
  xxl?: ListColumnCount
  xxxl?: ListColumnCount
}

export type ListSize = 'small' | 'default' | 'large'
export type ListItemLayout = 'horizontal' | 'vertical'
export interface ListLocale {
  emptyText: any
}
