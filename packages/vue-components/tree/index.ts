// base rc-tree 5.6.3
import type { TreeNodeProps, TreeProps } from './src/props'
import type { BasicDataNode } from './src/interface'

export { treeProps as VcTreeProps } from './src/props'

export { default as VcTreeNode } from './src/TreeNode'

export { default as VcTree } from './src/Tree'
export * from './src/contextTypes'

export type { TreeProps, TreeNodeProps, BasicDataNode }
export type { GetCheckDisabled } from './src/interface'
export { arrAdd, arrDel, conductExpandParent } from './src/util'
export { conductCheck } from './src/utils/conductUtil'
export { convertDataToEntities, convertTreeToData, fillFieldNames } from './src/utils/treeUtil'
export { default as useMaxLevel } from './src/useMaxLevel'
export type { DataNode, FieldNames as TreeFieldNames, EventDataNode, ScrollTo } from './src/interface'
