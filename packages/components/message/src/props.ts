import type { VueNode } from '@antdv/types'
import type { NoticeProps } from '@antdv/vue-components/vc-notification/src/Notice'
import type { CSSProperties } from 'vue'
import type { NoticeType } from './interface'

export interface MessageArgsProps {
  content: string | (() => VueNode) | VueNode
  duration?: number
  type?: NoticeType
  prefixCls?: string
  rootPrefixCls?: string
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement
  onClose?: () => void
  icon?: (() => VueNode) | VueNode
  key?: string | number
  style?: CSSProperties
  class?: string
  appContext?: any
  onClick?: (e: MouseEvent) => void
}

export interface MessagePureContentProps {
  prefixCls: string
  type?: NoticeType
  icon?: VueNode
}

export interface MessagePurePanelProps
  extends Omit<NoticeProps, 'prefixCls' | 'eventKey'>,
  Omit<MessagePureContentProps, 'prefixCls'> {
  prefixCls?: string
}
