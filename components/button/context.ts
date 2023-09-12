import { createContext } from '../hooks'
import type { SizeType } from '../config-provider'

export const GroupSizeContext = createContext<{
  size: SizeType
}>()
