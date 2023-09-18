import type { VueNode } from '../_util/type'

export interface ShowCountProps {
  formatter: (args: { count: number, maxlength?: number, value?: string }) => VueNode
}

export interface InputRef {
  focus: (options?: InputFocusOptions) => void
  blur: () => void
  setSelectionRange: (
    start: number,
    end: number,
    direction?: 'forward' | 'backward' | 'none',
  ) => void
  select: () => void
  input: HTMLInputElement | null
}
export interface InputFocusOptions extends FocusOptions {
  cursor?: 'start' | 'end' | 'all'
}

/** https://github.com/Microsoft/TypeScript/issues/29729 */

export type LiteralUnion<T extends U, U> = T | (U & {})
