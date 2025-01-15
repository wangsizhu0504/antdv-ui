import type { SizeType } from '@antdv/types';
import { createContext } from '@antdv/hooks';

export const GroupSizeContext = createContext<{
  size?: SizeType
}>();
