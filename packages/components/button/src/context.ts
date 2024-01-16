import { createContext } from '@antdv/hooks'
import type { SizeType } from '@antdv/types'

export const GroupSizeContext = createContext<{
  size?: SizeType
}>()
