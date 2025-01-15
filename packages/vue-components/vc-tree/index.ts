// base rc-tree 5.6.3
import type { NodeMouseEventHandler } from './src/contextTypes'
import type { TreeNodeProps } from './src/props'

export type { GetCheckDisabled } from './src/interface'

export { default as VcTree } from './src/Tree'

export type {
  NodeMouseEventHandler,
  TreeNodeProps as VcTreeNodeProps,
}

export { default as VcTreeNode } from './src/TreeNode'
export { default as useMaxLevel } from './src/useMaxLevel'
export { arrAdd, arrDel } from './src/util'
export { conductCheck } from './src/utils/conductUtil'
export { convertDataToEntities } from './src/utils/treeUtil'
