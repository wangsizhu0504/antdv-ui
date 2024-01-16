import type { Key } from '@antdv/types'
import type { CheckInfo, TreeNodeProps } from '@antdv/vue-components/vc-tree/src/props'
import type { DataNode, EventDataNode } from '@antdv/vue-components/vc-tree/src/interface'

// import type { DataNode, EventDataNode, TreeNodeProps } from '@antdv/vue-components'

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
export type AntTreeCheckInfo = CheckInfo
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

export type { EventDataNode, DataNode } from '@antdv/vue-components/vc-tree/src/interface'
