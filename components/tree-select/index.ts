import {
  SHOW_ALL,
  SHOW_CHILD,
  SHOW_PARENT,
  TreeNode,
} from '../vc-tree-select'
import treeSelect from './TreeSelect'
import type { App } from 'vue'

export const TreeSelectNode = TreeNode

export const TreeSelect = Object.assign(treeSelect, {
  TreeNode,
  SHOW_ALL: SHOW_ALL as typeof SHOW_ALL,
  SHOW_PARENT: SHOW_PARENT as typeof SHOW_PARENT,
  SHOW_CHILD: SHOW_CHILD as typeof SHOW_CHILD,
  install: (app: App) => {
    app.component(treeSelect.name, treeSelect)
    app.component(TreeSelectNode.displayName, TreeSelectNode)
    return app
  },
})
export default TreeSelect

export * from './props'
export * from './types'
