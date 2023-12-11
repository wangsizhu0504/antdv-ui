import { PropTypes, anyType } from '../../_utils/vue'
import { vcDialogProps } from '../../_internal/dialog'

import type { ImageIcons, ImagePreviewType, PreviewGroupPreview } from './types'
import type { CSSProperties, ExtractPropTypes, ImgHTMLAttributes, PropType } from 'vue'

import type { MouseEventHandler } from '../../_utils/types'
import type { IDialogChildProps } from '../../_internal/dialog'

export const imageProps = () => ({
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

export const previewProps = () => ({
  ...vcDialogProps(),
  src: String,
  alt: String,
  rootClassName: String,
  icons: {
    type: Object as PropType<ImageIcons>,
    default: () => ({} as ImageIcons),
  },
  minScale: Number,
  maxScale: Number,
})

export interface PreviewProps extends Omit<IDialogChildProps, 'onClose' | 'mask'> {
  onClose?: (e: Element) => void
  src?: string
  alt?: string
  rootClassName?: string
  icons?: ImageIcons
}

export const previewGroupProps = () => ({
  previewPrefixCls: String,
  preview: anyType<boolean | PreviewGroupPreview>(),
})

export const imageGroupProps = () => ({
  previewPrefixCls: String,
  preview: {
    type: [Boolean, Object] as PropType<boolean | ImagePreviewType>,
    default: true as boolean | ImagePreviewType,
  },
  icons: {
    type: Object as PropType<PreviewProps['icons']>,
    default: () => ({}),
  },
})

export type ImageProps = Partial<
  ExtractPropTypes<ReturnType<typeof imageProps>> &
  Omit<ImgHTMLAttributes, 'placeholder' | 'onClick'>
>

export type ImageGroupProps = Partial<ExtractPropTypes<ReturnType<typeof previewGroupProps>>>
