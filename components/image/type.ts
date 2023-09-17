import type { imageProps } from '../vc-image'
import type { ExtractPropTypes, ImgHTMLAttributes } from 'vue'

export type ImageProps = Partial<
  ExtractPropTypes<ReturnType<typeof imageProps>> &
  Omit<ImgHTMLAttributes, 'placeholder' | 'onClick'>
>
