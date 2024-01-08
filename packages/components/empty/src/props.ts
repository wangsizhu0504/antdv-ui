import { anyType, objectType } from '@antdv/utils'
import type { CSSProperties, ExtractPropTypes } from 'vue'
import type { VueNode } from '@antdv/types'

export function emptyProps() {
  return {
    prefixCls: String,
    imageStyle: objectType<CSSProperties>(),
    image: anyType<VueNode>(),
    description: anyType<VueNode>(),
  }
}

export type EmptyProps = Partial<ExtractPropTypes<ReturnType<typeof emptyProps>>>
