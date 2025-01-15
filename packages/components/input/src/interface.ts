import type { VueNode } from '@antdv/types';

export interface NodeType {
  sizingStyle: string
  paddingSize: number
  borderSize: number
  boxSizing: string
}
export interface ShowCountProps {
  formatter: (args: { count: number, maxlength?: number, value?: string }) => VueNode
}
export interface AutoSizeType {
  minRows?: number
  maxRows?: number
}

export interface InputFocusOptions extends FocusOptions {
  cursor?: 'start' | 'end' | 'all'
}
