import type { App } from 'vue';
import VcTreeNode from '@antdv/vue-components/vc-tree/src/TreeNode';
import ADirectoryTree from './src/DirectoryTree';
import ATree from './src/Tree';

/* istanbul ignore next */

export const TreeNode = VcTreeNode;
export const DirectoryTree = ADirectoryTree;

export const Tree = Object.assign(ATree, {
  DirectoryTree,
  TreeNode,
  install: (app: App) => {
    app.component(ATree.name, ATree);
    app.component(TreeNode.name, TreeNode);
    app.component(DirectoryTree.name, DirectoryTree);
    return app;
  },
});

export default Tree;

export * from './src/interface';
export * from './src/props';
