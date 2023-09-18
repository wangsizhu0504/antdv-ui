import type { vcImageProps } from '../vc-image'
import type { ExtractPropTypes, ImgHTMLAttributes } from 'vue'

export type ImageProps = Partial<
  ExtractPropTypes<ReturnType<typeof vcImageProps>> &
  Omit<ImgHTMLAttributes, 'placeholder' | 'onClick'>
>
