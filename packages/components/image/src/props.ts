import type { ExtractPropTypes } from 'vue';

import type { PreviewGroupPreview } from './interface';

import { anyType } from '@antdv/utils';

export function previewGroupProps() {
  return {
    previewPrefixCls: String,
    preview: anyType<boolean | PreviewGroupPreview>(),
  };
}

export type ImageGroupProps = Partial<ExtractPropTypes<ReturnType<typeof previewGroupProps>>>;
