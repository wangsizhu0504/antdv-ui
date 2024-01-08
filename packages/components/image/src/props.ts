import { anyType } from '@antdv/utils'

import type { ExtractPropTypes } from 'vue'

import type { PreviewGroupPreview } from './types'

export function previewGroupProps() {
  return {
    previewPrefixCls: String,
    preview: anyType<boolean | PreviewGroupPreview>(),
  }
}

export type ImageGroupProps = Partial<ExtractPropTypes<ReturnType<typeof previewGroupProps>>>
