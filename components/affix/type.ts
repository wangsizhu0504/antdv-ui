import type { CSSProperties } from 'vue'

export enum AffixStatus {
  None,
  Prepare,
}

export interface AffixState {
  affixStyle?: CSSProperties
  placeholderStyle?: CSSProperties
  status: AffixStatus
  lastAffix: boolean
  prevTarget: Window | HTMLElement | null
}

export interface AffixEmits {
  change: (lastAffix: boolean) => void
  testUpdatePosition: () => void
}

export interface AffixExpose {
  updatePosition: (...args: any[]) => void
  lazyUpdatePosition: (...args: any[]) => void
}
