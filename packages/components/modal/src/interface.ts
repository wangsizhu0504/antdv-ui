import type { ModalLocale } from '@antdv/locale';
import type { getContainerFunc, VueNode } from '@antdv/types';
import type { CSSProperties, MaybeRef } from 'vue';
import type { ButtonProps as ButtonPropsType, LegacyButtonType } from '../../button';
import type { Direction } from '../../config-provider';

export type MousePosition = { x: number, y: number } | null;

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

export type ConfigUpdate = ModalFuncProps | ((prevConfig: ModalFuncProps) => ModalFuncProps);

export type ModalFunc = (props: ModalFuncProps) => {
  destroy: () => void
  update: (configUpdate: ConfigUpdate) => void
};

export interface ConfirmDialogProps extends ModalFuncProps {
  afterClose?: () => void
  close?: (...args: any[]) => void
  autoFocusButton?: null | 'ok' | 'cancel'
  rootPrefixCls: string
  iconPrefixCls?: string

  /** @private Internal Usage. Do not override this */
  locale?: ModalLocale
}

export interface HookModalProps {
  afterClose: () => void
  config: ModalFuncProps
  destroyAction: (...args: any[]) => void
  open: boolean
}

export interface HookModalRef {
  destroy: () => void
  update: (config: ModalFuncProps) => void
}

export type ModalFuncWithRef = (props: MaybeRef<ModalFuncProps>) => {
  destroy: () => void
  update: (configUpdate: ModalFuncProps) => void
};

export type ModalStaticFunctions<T = ModalFunc> = Record<NonNullable<ModalFuncProps['type']>, T>;
