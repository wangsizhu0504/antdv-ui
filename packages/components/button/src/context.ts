import { createContext } from '@antdv/hooks'
import type { SizeType } from '../../config-provider'

export const GroupSizeContext = createContext<{
  size: SizeType
}>()
