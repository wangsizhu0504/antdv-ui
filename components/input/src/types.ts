import type { VueNode } from '../../_utils/types'

export interface NodeType {
  sizingStyle: string
  paddingSize: number
  borderSize: number
  boxSizing: string
}
export interface ShowCountProps {
  formatter: (args: { count: number, maxlength?: number }) => VueNode
}
export interface AutoSizeType {
  minRows?: number
  maxRows?: number
}
