import { anyType, objectType } from '../_util/type'
import type { CSSProperties, ExtractPropTypes } from 'vue'
import type { VueNode } from '../_util/type'

export const emptyProps = () => ({
  prefixCls: String,
  imageStyle: objectType<CSSProperties>(),
  image: anyType<VueNode>(),
  description: anyType<VueNode>(),
})

export type EmptyProps = Partial<ExtractPropTypes<ReturnType<typeof emptyProps>>>
