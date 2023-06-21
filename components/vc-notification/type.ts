import type { CSSProperties } from 'vue'
import type { Key, VueNode } from '../_util/type'
import type { NoticeProps } from './Notice'

export interface NoticeContent extends Omit<NoticeProps, 'prefixCls' | 'noticeKey' | 'onClose'> {
  prefixCls?: string
  key?: Key
  updateMark?: string
  content?: string | ((arg: { prefixCls: string }) => VueNode) | VueNode
  onClose?: () => void
  style?: CSSProperties
  class?: String
  placement?: Placement
}

export type NoticeFunc = (noticeProps: NoticeContent) => void
export type HolderReadyCallback = (
  div: HTMLDivElement,
  noticeProps: NoticeProps & { key: Key },
) => void

export interface NotificationProps {
  prefixCls?: string
  transitionName?: string
  animation?: string | object
  maxCount?: number
  closeIcon?: any
  hashId?: string
}

export type NotificationState = {
  notice: NoticeContent & {
    userPassKey?: Key
  }
  holderCallback?: HolderReadyCallback
}[]

export type Placement = 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight'
export interface OpenConfig extends NoticeProps {
  key: Key
  placement?: Placement
  content?: string | (() => VueNode) | VueNode
  duration?: number | null
}

export type Placements = Partial<Record<Placement, OpenConfig[]>>

export interface NotificationInstance {
  notice: NoticeFunc
  removeNotice: (key: Key) => void
  destroy: () => void
  add?: (noticeProps: NoticeContent) => void
  component: Notification
}
