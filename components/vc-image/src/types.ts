import type { IDialogChildProps } from '../../vc-dialog/IDialogPropTypes'
import type { PreviewProps } from './Preview'

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
  icons?: PreviewProps['icons']
}

export type ImageStatus = 'normal' | 'error' | 'loading'
