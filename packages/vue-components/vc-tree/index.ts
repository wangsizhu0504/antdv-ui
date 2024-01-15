// base rc-tree 5.6.3
import type { NodeMouseEventHandler } from './src/contextTypes'
import type { TreeNodeProps } from './src/props'

export { default as VcTreeNode } from './src/TreeNode'

export { default as VcTree } from './src/Tree'

export type {
  TreeNodeProps as VcTreeNodeProps,
  NodeMouseEventHandler,
}

export { arrAdd, arrDel } from './src/util'
export { conductCheck } from './src/utils/conductUtil'
export { convertDataToEntities } from './src/utils/treeUtil'
export { default as useMaxLevel } from './src/useMaxLevel'
export type { GetCheckDisabled } from './src/interface'
