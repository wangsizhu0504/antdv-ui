import type { CSSProperties, HTMLAttributes, VNodeTypes } from 'vue'

export interface CellProps extends HTMLAttributes {
  itemPrefixCls: string
  span: number
  component: string
  labelStyle?: CSSProperties
  contentStyle?: CSSProperties
  bordered?: boolean
  label?: number | VNodeTypes
  content?: number | VNodeTypes
  colon?: boolean
}

export interface CellConfig {
  component: string | [string, string]
  type: string
  showLabel?: boolean
  showContent?: boolean
}

export interface RowProps {
  prefixCls: string
  vertical: boolean
  row: any[]
  bordered: boolean
  colon: boolean
  index: number
}
