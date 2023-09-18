import { anyType } from '../_util/type'
import type { ExtractPropTypes } from 'vue'
import type { VcPreviewGroupPreview } from '../vc-image'

export const previewGroupProps = () => ({
  previewPrefixCls: String,
  preview: anyType<boolean | VcPreviewGroupPreview>(),
})
export type ImageGroupProps = Partial<ExtractPropTypes<ReturnType<typeof previewGroupProps>>>
