export type Trigger = 'click' | 'hover' | 'contextmenu'

export interface DropdownArrowOptions {
  pointAtCenter?: boolean
}
export interface Align {
  points?: [string, string]
  offset?: [number, number]
  targetOffset?: [number, number]
  overflow?: {
    adjustX?: boolean
    adjustY?: boolean
  }
  useCssRight?: boolean
  useCssBottom?: boolean
  useCssTransform?: boolean
}
