import PropTypes from '../../_util/vue-types'
import { vcDialogProps } from '../../vc-dialog'
import type { IDialogChildProps } from '../../vc-dialog'

import type { ImagePreviewType } from './types'
import type { MouseEventHandler } from '../../_util/EventInterface'
import type { CSSProperties, ExtractPropTypes, PropType, VNode } from 'vue'

export const vcImageProps = () => ({
  src: String,
  wrapperClassName: String,
  wrapperStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
  rootClassName: String,
  prefixCls: String,
  previewPrefixCls: String,
  previewMask: {
    type: [Boolean, Function] as PropType<false | (() => any)>,
    default: undefined,
  },
  placeholder: PropTypes.any,
  fallback: String,
  preview: {
    type: [Boolean, Object] as PropType<boolean | ImagePreviewType>,
    default: true as boolean | ImagePreviewType,
  },
  onClick: {
    type: Function as PropType<MouseEventHandler>,
  },
  onError: {
    type: Function as PropType<HTMLImageElement['onerror']>,
  },
})

export const vcPreviewProps = () => ({
  ...vcDialogProps(),
  src: String,
  alt: String,
  rootClassName: String,
  icons: {
    type: Object as PropType<VcPreviewProps['icons']>,
    default: () => ({} as VcPreviewProps['icons']),
  },
})

export interface VcPreviewProps extends Omit<IDialogChildProps, 'onClose' | 'mask'> {
  onClose?: (e: Element) => void
  src?: string
  alt?: string
  rootClassName?: string
  icons?: {
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
}

export type VcImageProps = Partial<ExtractPropTypes<ReturnType<typeof vcImageProps>>>
