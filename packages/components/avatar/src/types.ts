import type { ScreenSizeMap } from '@antdv/types'

export type AvatarSize = 'large' | 'small' | 'default' | number | ScreenSizeMap

export interface AvatarContextType {
  size?: AvatarSize
  shape?: 'circle' | 'square'
}
