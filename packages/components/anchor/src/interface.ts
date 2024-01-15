import type { CSSProperties } from '@antdv/theme'
import type { Key, VueNode } from '@antdv/types'

export type AnchorDirection = 'vertical' | 'horizontal'
export type AnchorContainer = HTMLElement | Window

export interface AnchorState {
  scrollContainer: HTMLElement | Window | null
  links: string[]
  scrollEvent: any
  animating: boolean
}
export interface Section {
  link: string
  top: number
}

export interface AnchorLinkItemProps {
  key: Key
  class?: string
  style?: CSSProperties
  href?: string
  target?: string
  children?: AnchorLinkItemProps[]
  title?: VueNode | ((item: AnchorLinkItemProps) => VueNode)
}
