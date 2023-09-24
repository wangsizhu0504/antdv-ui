import { TreeNode as VcTreeNode } from '../_internal/tree'
import ATree from './src/Tree'
import ADirectoryTree from './src/DirectoryTree'
import type { App } from 'vue'

/* istanbul ignore next */

export const TreeNode = VcTreeNode
export const DirectoryTree = ADirectoryTree

export const Tree = Object.assign(ATree, {
  DirectoryTree,
  TreeNode,
  install: (app: App) => {
    app.component(ATree.name, ATree)
    app.component(TreeNode.name, TreeNode)
    app.component(DirectoryTree.name, DirectoryTree)
    return app
  },
})

export default Tree

export * from './src/types'
export * from './src/props'
