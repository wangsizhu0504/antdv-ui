import { TreeNode as VcTreeNode } from '../vc-tree'
import Tree from './Tree'
import DirectoryTree from './DirectoryTree'
import type { App } from 'vue'

/* istanbul ignore next */

const TreeNode = VcTreeNode

export { DirectoryTree, TreeNode }

export default Object.assign(Tree, {
  DirectoryTree,
  TreeNode,
  install: (app: App) => {
    app.component(Tree.name, Tree)
    app.component(TreeNode.name, TreeNode)
    app.component(DirectoryTree.name, DirectoryTree)
    return app
  },
})

export type { EventDataNode, DataNode } from '../vc-tree/interface'

export * from './types'
export * from './props'
