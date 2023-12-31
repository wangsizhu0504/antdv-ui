import type { EventHandler } from '../../_utils/types'
import type { TypographyProps } from './props'
import type { AutoSizeType } from '../../input'

export type BaseType = 'secondary' | 'success' | 'warning' | 'danger'

export interface CopyConfig {
  text?: string
  onCopy?: (event?: MouseEvent) => void
  tooltip?: boolean
}

export interface EditConfig {
  editing?: boolean
  tooltip?: boolean
  onStart?: () => void
  onChange?: (value: string) => void
  onCancel?: () => void
  onEnd?: () => void
  maxlength?: number
  autoSize?: boolean | AutoSizeType
  triggerType?: ('icon' | 'text')[]
}

export interface EllipsisConfig {
  rows?: number
  expandable?: boolean
  suffix?: string
  symbol?: string
  onExpand?: EventHandler
  onEllipsis?: (ellipsis: boolean) => void
  tooltip?: any
}

export interface BlockProps extends TypographyProps {
  title?: string
  editable?: boolean | EditConfig
  copyable?: boolean | CopyConfig
  type?: BaseType
  disabled?: boolean
  ellipsis?: boolean | EllipsisConfig
  // decorations
  code?: boolean
  mark?: boolean
  underline?: boolean
  delete?: boolean
  strong?: boolean
  keyboard?: boolean
  content?: string
}

export interface Locale {
  edit?: string
  copy?: string
  copied?: string
  expand?: string
}

export interface InternalBlockProps extends BlockProps {
  component: string
}
