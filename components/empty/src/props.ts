import { anyType, objectType } from '../../_utils/vue'
import type { CSSProperties, ExtractPropTypes } from 'vue'
import type { VueNode } from '../../_utils/types'

export const emptyProps = () => ({
  prefixCls: String,
  imageStyle: objectType<CSSProperties>(),
  image: anyType<VueNode>(),
  description: anyType<VueNode>(),
})

export type EmptyProps = Partial<ExtractPropTypes<ReturnType<typeof emptyProps>>>
