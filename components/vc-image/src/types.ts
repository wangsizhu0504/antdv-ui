import type { ComputedRef, Ref } from 'vue'
import type { VcPreviewProps } from './props'
import type { IDialogChildProps } from '../../vc-dialog'

export type GetContainer = string | HTMLElement | (() => HTMLElement)

export type ImagePreviewType = Omit<
  IDialogChildProps,
  'mask' | 'visible' | 'closable' | 'prefixCls' | 'onClose' | 'afterClose' | 'wrapClassName'
> & {
  src?: string
  visible?: boolean
  onVisibleChange?: (value: boolean, prevValue: boolean) => void
  getContainer?: GetContainer | false
  maskClassName?: string
  icons?: VcPreviewProps['icons']
}

export interface VcPreviewGroupPreview extends Omit<ImagePreviewType, 'icons' | 'mask' | 'maskClassName'> {
  /**
   * If Preview the show img index
   * @default 0
   */
  current?: number
}

export type ImageStatus = 'normal' | 'error' | 'loading'

export interface GroupConsumerProps {
  previewPrefixCls?: string
  icons?: VcPreviewProps['icons']
  preview?: boolean | VcPreviewGroupPreview
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
