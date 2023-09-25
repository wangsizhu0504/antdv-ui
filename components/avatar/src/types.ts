import type { ScreenSizeMap } from '../../_utils/types'

export type AvatarSize = 'large' | 'small' | 'default' | number | ScreenSizeMap

export interface AvatarContextType {
  size?: AvatarSize
  shape?: 'circle' | 'square'
}
