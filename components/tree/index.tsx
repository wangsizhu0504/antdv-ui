import { TreeNode as VcTreeNode } from '../vc-tree'
import Tree from './Tree'
import DirectoryTree from './DirectoryTree'
import type { App } from 'vue'

export type { EventDataNode, DataNode } from '../vc-tree/interface'

export type {
  TreeProps,
  AntTreeNodeMouseEvent,
  AntTreeNodeExpandedEvent,
  AntTreeNodeCheckedEvent,
  AntTreeNodeSelectedEvent,
  AntTreeNodeDragEnterEvent,
  AntTreeNodeDropEvent,
  AntdTreeNodeAttribute,
  TreeDataItem,
} from './Tree'

export type {
  ExpandAction as DirectoryTreeExpandAction,
  DirectoryTreeProps,
} from './DirectoryTree'

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
