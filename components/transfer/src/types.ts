import type { VueNode } from '../../_utils/types'

export type PaginationType =
  | boolean
  | {
    pageSize?: number
    simple?: boolean
    showSizeChanger?: boolean
    showLessItems?: boolean
  }

export type TransferDirection = 'left' | 'right'

export interface RenderResultObject {
  label: VueNode
  value: string
}

export type RenderResult = VueNode | RenderResultObject | string | null

export interface TransferItem {
  key?: string
  title?: string
  description?: string
  disabled?: boolean
  [name: string]: any
}

export type KeyWise<T> = T & { key: string }

export type KeyWiseTransferItem = KeyWise<TransferItem>

export type TransferRender<RecordType> = (item: RecordType) => RenderResult

export interface ListStyle {
  direction: TransferDirection
}

export type SelectAllLabel =
  | VueNode
  | ((info: { selectedCount: number, totalCount: number }) => VueNode)
