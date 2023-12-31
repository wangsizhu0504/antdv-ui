import type { CSSProperties, VNodeTypes } from 'vue'
import type { Key } from '../../_utils/types'

export type RenderFunc<T> = (
  item: T,
  index: number,
  props: { style?: CSSProperties },
) => VNodeTypes

export interface SharedConfig<T> {
  getKey: (item: T) => Key
}

export type GetKey<T = object> = (item: T) => Key
