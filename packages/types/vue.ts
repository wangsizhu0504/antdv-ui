import type { ComponentPublicInstance, PropType, VNode } from 'vue'
import type { Data, Key } from './global'

type DefaultFactory<T> = (props: Data) => T | null | undefined

export interface PropOptions<T = any, D = T> {
  type?: PropType<T> | true | null;
  required?: boolean;
  default?: D | DefaultFactory<D> | null | undefined | object;
  validator?: (value: unknown) => boolean;
}

declare type VNodeChildAtom = VNode | string | number | boolean | null | undefined | void

export type VueNode = VNodeChildAtom | VNodeChildAtom[] | VNode

export type VueInstance = ComponentPublicInstance

export interface RefObject extends Function {
  current?: any;
}

export type RefType = HTMLElement | ComponentPublicInstance
export type RefsValue = Map<Key, RefType>
