import { anyType } from '../_util/type'
import type { ExtractPropTypes } from 'vue'
import type { PreviewGroupPreview } from '../vc-image/src/PreviewGroup'

export const previewGroupProps = () => ({
  previewPrefixCls: String,
  preview: anyType<boolean | PreviewGroupPreview>(),
})
export type ImageGroupProps = Partial<ExtractPropTypes<ReturnType<typeof previewGroupProps>>>
