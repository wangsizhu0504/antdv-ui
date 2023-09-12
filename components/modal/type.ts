import type { CSSProperties } from 'vue'
import type { VueNode } from '../_util/type'
import type { Direction } from '../config-provider'
import type { ButtonProps as ButtonPropsType, LegacyButtonType } from '../button'

export type MousePosition = { x: number, y: number } | null

export type getContainerFunc = () => HTMLElement

export interface ModalFuncProps {
  prefixCls?: string
  class?: string
  open?: boolean
  title?: string | (() => VueNode) | VueNode
  footer?: string | (() => VueNode) | VueNode
  closable?: boolean
  content?: string | (() => VueNode) | VueNode
  // TODO: find out exact types
  onOk?: (...args: any[]) => any
  onCancel?: (...args: any[]) => any
  afterClose?: () => void
  okButtonProps?: ButtonPropsType
  cancelButtonProps?: ButtonPropsType
  centered?: boolean
  width?: string | number
  okText?: string | (() => VueNode) | VueNode
  okType?: LegacyButtonType
  cancelText?: string | (() => VueNode) | VueNode
  icon?: (() => VueNode) | VueNode
  wrapClassName?: string
  /* Deprecated */
  iconType?: string
  mask?: boolean
  maskClosable?: boolean
  zIndex?: number
  okCancel?: boolean
  style?: CSSProperties | string
  maskStyle?: CSSProperties
  type?: 'info' | 'success' | 'error' | 'warn' | 'warning' | 'confirm'
  keyboard?: boolean
  getContainer?: string | HTMLElement | getContainerFunc | false | null
  autoFocusButton?: null | 'ok' | 'cancel'
  transitionName?: string
  maskTransitionName?: string
  direction?: Direction
  bodyStyle?: CSSProperties
  closeIcon?: string | (() => VueNode) | VueNode
  modalRender?: (arg: { originVNode: VueNode }) => VueNode
  focusTriggerAfterClose?: boolean

  /** @deprecated please use `appContext` instead */
  parentContext?: any
  appContext?: any

  /** @deprecated please use `open` instead */
  visible?: boolean
}

export type ModalFunc = (props: ModalFuncProps) => {
  destroy: () => void
  update: (newConfig: ModalFuncProps) => void
}
