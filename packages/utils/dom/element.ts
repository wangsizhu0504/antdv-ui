import { cloneVNode, isVNode } from 'vue'

import type { VNode, VNodeProps } from 'vue'
import type { RefObject } from '@antdv/types'
import { filterEmpty } from '../vue/props'
import { warning } from '../log'

type NodeProps = Record<string, any> &
Omit<VNodeProps, 'ref'> & { ref?: VNodeProps['ref'] | RefObject }

/**
 *  克隆元素
 * @param vnode
 * @param nodeProps
 * @param override
 * @param mergeRef
 */
export function cloneElement<T, U>(
  vnode: VNode<T, U> | Array<VNode<T, U>>,
  nodeProps: NodeProps = {},
  override = true,
  mergeRef = false,
): VNode<T, U> | null {
  let ele = vnode
  if (Array.isArray(vnode))
    ele = filterEmpty(vnode as any)[0]

  if (!ele)
    return null

  const node = cloneVNode(ele as VNode<T, U>, nodeProps as any, mergeRef)

  // cloneVNode内部是合并属性，这里改成覆盖属性
  node.props = (override ? { ...node.props, ...nodeProps } : node.props) as any
  warning(typeof node.props?.class !== 'object', 'class must be string')
  return node
}

export function cloneVNodes(vnodes: any, nodeProps = {}, override = true) {
  return vnodes.map((v: any) => cloneElement(v, nodeProps, override))
}

export function deepCloneElement<T, U>(
  vnode: VNode<T, U> | Array<VNode<T, U>>,
  nodeProps: NodeProps = {},
  override = true,
  mergeRef = false,
): any {
  if (Array.isArray(vnode)) {
    return vnode.map(item => deepCloneElement(item, nodeProps, override, mergeRef))
  } else {
    // 需要判断是否为vnode方可进行clone操作
    if (!isVNode(vnode))
      return vnode

    const cloned = cloneElement(vnode, nodeProps, override, mergeRef) as any
    if (Array.isArray(cloned.children))
      cloned.children = deepCloneElement(cloned.children as Array<VNode<T, U>>)

    return cloned
  }
}
