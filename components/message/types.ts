import type { MessageArgsProps } from './props'
import type useMessage from './useMessage'
import type { Key, VueNode } from '../_util/type'
import type { NotificationAPI } from '../vc-notification'

export type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading'

export interface ThenableArgument {
  (val: any): void
}
export type ConfigDuration = number

export type ConfigOnClose = () => void

export interface ConfigOptions {
  top?: number | string
  duration?: number
  prefixCls?: string
  getContainer?: () => HTMLElement
  transitionName?: string
  maxCount?: number
  rtl?: boolean
}

export type JointContent = VueNode | MessageArgsProps

export interface MessageType extends PromiseLike<boolean> {
  (): void
}

export type TypeOpen = (
  content: JointContent,
  duration?: ConfigDuration, // Also can use onClose directly
  onClose?: ConfigOnClose,
) => MessageType

export interface MessageInstance {
  info: TypeOpen
  success: TypeOpen
  error: TypeOpen
  warning: TypeOpen
  loading: TypeOpen
  open(args: MessageArgsProps): MessageType
  destroy(key?: Key): void
  useMessage: typeof useMessage
}

export interface MessageApi extends MessageInstance {
  warn: TypeOpen
  config(options: ConfigOptions): void
}
export interface HolderRef extends NotificationAPI {
  prefixCls: string
  hashId: string
}
