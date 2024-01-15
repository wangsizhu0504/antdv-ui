import type { DataNode, NodeElement } from './interface'
import type { TreeNodeProps } from './props'
import TreeNode from './TreeNode'

const internalProcessProps = (props: DataNode): Partial<TreeNodeProps> => props
export function convertDataToTree(
  treeData: DataNode[],
  processor?: { processProps: (prop: DataNode) => any },
): NodeElement[] {
  if (!treeData) return []

  const { processProps = internalProcessProps } = processor || {}
  const list = Array.isArray(treeData) ? treeData : [treeData]
  return list.map(({ children, ...props }): NodeElement => {
    const childrenNodes = convertDataToTree(children, processor)
    return (
      <TreeNode key={props.key} {...processProps(props)}>
        {childrenNodes}
      </TreeNode>
    )
  })
}
