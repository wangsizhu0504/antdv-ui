import { PropTypes } from '@antdv/utils'
import type { CSSProperties, ExtractPropTypes, ImgHTMLAttributes, PropType } from 'vue'
import type { MouseEventHandler } from '@antdv/types'
import type { ImagePreviewType, PreviewProps } from './type'

export function imageProps() {
  return {
    src: String,
    wrapperClassName: String,
    wrapperStyle: { type: Object as PropType<CSSProperties>, default: undefined as CSSProperties },
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
  }
}

export function imageGroupProps() {
  return {
    previewPrefixCls: String,
    preview: {
      type: [Boolean, Object] as PropType<boolean | ImagePreviewType>,
      default: true as boolean | ImagePreviewType,
    },
    icons: {
      type: Object as PropType<PreviewProps['icons']>,
      default: () => ({}),
    },
  }
}

export type ImageProps = Partial<
  ExtractPropTypes<ReturnType<typeof imageProps>> &
    Omit<ImgHTMLAttributes, 'placeholder' | 'onClick'>
>
