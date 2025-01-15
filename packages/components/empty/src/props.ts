import type { VueNode } from '@antdv/types';
import type { CSSProperties, ExtractPropTypes } from 'vue';
import { anyType, objectType } from '@antdv/utils';

export function emptyProps() {
  return {
    prefixCls: String,
    imageStyle: objectType<CSSProperties>(),
    image: anyType<VueNode>(),
    description: anyType<VueNode>(),
  };
}

export type EmptyProps = Partial<ExtractPropTypes<ReturnType<typeof emptyProps>>>;
