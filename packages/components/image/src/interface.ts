import type { IDialogChildProps } from '@antdv/vue-components/vc-dialog/src/IDialogPropTypes'
import type { ComputedRef, Ref, VNode } from 'vue'

export type GetContainer = string | HTMLElement | (() => HTMLElement)

export type ImageStatus = 'normal' | 'error' | 'loading'

export type ImagePreviewType = Omit<
  IDialogChildProps,
  'mask' | 'visible' | 'closable' | 'prefixCls' | 'onClose' | 'afterClose' | 'wrapClassName'
> & {
  src?: string
  visible?: boolean
  onVisibleChange?: (value: boolean, prevValue: boolean) => void
  getContainer?: GetContainer | false
  maskClassName?: string
  icons?: ImageIcons
}

export interface ImageIcons {
  rotateLeft?: VNode
  rotateRight?: VNode
  zoomIn?: VNode
  zoomOut?: VNode
  close?: VNode
  left?: VNode
  right?: VNode
  flipX?: VNode
  flipY?: VNode
}
export interface PreviewGroupPreview extends Omit<ImagePreviewType, 'icons' | 'mask' | 'maskClassName'> {
  /**
   * If Preview the show img index
   * @default 0
   */
  current?: number
}

export interface GroupConsumerProps {
  previewPrefixCls?: string
  icons?: ImageIcons
  preview?: boolean | PreviewGroupPreview
}

export interface VcPreviewUrl {
  url: string
  canPreview: boolean
}

export interface GroupConsumerValue extends GroupConsumerProps {
  isPreviewGroup?: Ref<boolean | undefined>
  previewUrls: ComputedRef<Map<number, string>>
  setPreviewUrls: (id: number, url: string, canPreview?: boolean) => void
  current: Ref<number>
  setCurrent: (current: number) => void
  setShowPreview: (isShowPreview: boolean) => void
  setMousePosition: (mousePosition: null | { x: number, y: number }) => void
  registerImage: (id: number, url: string, canPreview?: boolean) => () => void
  rootClassName?: string
}
