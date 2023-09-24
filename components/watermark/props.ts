import { arrayType, objectType, someType } from '../_utils/vue'
import type { WatermarkFontType } from './type'
import type { ExtractPropTypes } from 'vue'

export const watermarkProps = () => ({
  zIndex: Number,
  rotate: Number,
  width: Number,
  height: Number,
  image: String,
  content: someType<string | string[]>([String, Array]),
  font: objectType<WatermarkFontType>(),
  rootClassName: String,
  gap: arrayType<[number, number]>(),
  offset: arrayType<[number, number]>(),
})
export type WatermarkProps = Partial<ExtractPropTypes<ReturnType<typeof watermarkProps>>>
