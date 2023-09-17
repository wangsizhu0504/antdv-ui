import type { TreeNodeProps } from '../vc-tree/props'
import type { DataNode, EventDataNode, Key } from '../vc-tree/interface'

export type ExpandAction = false | 'click' | 'doubleclick' | 'dblclick'

export interface AntdTreeNodeAttribute {
  eventKey: string
  prefixCls: string
  class: string
  expanded: boolean
  selected: boolean
  checked: boolean
  halfChecked: boolean
  children: any
  title: any
  pos: string
  dragOver: boolean
  dragOverGapTop: boolean
  dragOverGapBottom: boolean
  isLeaf: boolean
  selectable: boolean
  disabled: boolean
  disableCheckbox: boolean
}

export type AntTreeNodeProps = TreeNodeProps

// [Legacy] Compatible for v2
export type TreeDataItem = DataNode

export interface AntTreeNodeBaseEvent {
  node: EventDataNode
  nativeEvent: MouseEvent
}

export interface AntTreeNodeCheckedEvent extends AntTreeNodeBaseEvent {
  event: 'check'
  checked?: boolean
  checkedNodes?: DataNode[]
}

export interface AntTreeNodeSelectedEvent extends AntTreeNodeBaseEvent {
  event: 'select'
  selected?: boolean
  selectedNodes?: DataNode[]
}

export interface AntTreeNodeExpandedEvent extends AntTreeNodeBaseEvent {
  expanded?: boolean
}

export interface AntTreeNodeMouseEvent {
  node: EventDataNode
  event: DragEvent
}

export interface AntTreeNodeDragEnterEvent extends AntTreeNodeMouseEvent {
  expandedKeys: Key[]
}

export interface AntTreeNodeDropEvent {
  node: EventDataNode
  dragNode: EventDataNode
  dragNodesKeys: Key[]
  dropPosition: number
  dropToGap?: boolean
  event: MouseEvent
}
