import {
  SHOW_ALL,
  SHOW_CHILD,
  SHOW_PARENT,
  TreeNode,
} from '../_internal/tree-select'
import ATreeSelect from './src/TreeSelect'
import type { App } from 'vue'

export const TreeSelectNode = TreeNode

export const TreeSelect = Object.assign(ATreeSelect, {
  TreeNode,
  SHOW_ALL: SHOW_ALL as typeof SHOW_ALL,
  SHOW_PARENT: SHOW_PARENT as typeof SHOW_PARENT,
  SHOW_CHILD: SHOW_CHILD as typeof SHOW_CHILD,
  install: (app: App) => {
    app.component(ATreeSelect.name, ATreeSelect)
    app.component(TreeSelectNode.displayName, TreeSelectNode)
    return app
  },
})
export default TreeSelect

export * from './src/props'
export * from './src/types'
