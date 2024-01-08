import type { CSSProperties } from 'vue'
import type { Key, VueNode } from '@antdv/types'
import type { NoticeProps } from './vc-notification/Notice'
import type useNotification from './useNotification'

export type NotificationPlacement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'

export type IconType = 'success' | 'info' | 'error' | 'warning' | 'warn'

type StaticFn = (args: NotificationArgsProps) => void

export interface NotificationInstance {
  success: StaticFn
  error: StaticFn
  info: StaticFn
  warning: StaticFn
  open: StaticFn
  destroy(key?: Key): void
}

export interface NotificationConfig {
  top?: number | string
  bottom?: number | string
  duration?: number
  prefixCls?: string
  placement?: NotificationPlacement
  getContainer?: () => HTMLElement
  closeIcon?: VueNode | (() => VueNode)
  rtl?: boolean
  maxCount?: number
}

export interface NotificationArgsProps {
  message: VueNode | (() => VueNode)
  description?: VueNode | (() => VueNode)
  btn?: VueNode | (() => VueNode)
  key?: string
  onClose?: () => void
  duration?: number | null
  icon?: VueNode | (() => VueNode)
  placement?: NotificationPlacement
  maxCount?: number
  style?: CSSProperties
  prefixCls?: string
  class?: string
  readonly type?: IconType
  onClick?: () => void
  top?: string | number
  bottom?: string | number
  getContainer?: () => HTMLElement
  closeIcon?: VueNode | (() => VueNode)
  appContext?: any
}

export interface NotificationApi extends NotificationInstance {
  warn(args: NotificationArgsProps): void
  close(key: string): void
  config(options: NotificationConfig): void
  destroy(): void
  useNotification: typeof useNotification
}

export interface NotificationPureContentProps {
  prefixCls: string
  icon?: VueNode
  message?: VueNode
  description?: VueNode
  btn?: VueNode
  type?: IconType
}
export interface NotificationPurePanelProps
  extends Omit<NoticeProps, 'prefixCls' | 'eventKey'>,
  Omit<NotificationPureContentProps, 'prefixCls'> {
  prefixCls?: string
}
