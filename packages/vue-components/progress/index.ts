// based on rc-progress 3.1.4
import VcLine from './src/Line'
import VcCircle from './src/Circle'

import type { ProgressProps } from './src/types'

export type { ProgressProps }
export { VcLine, VcCircle }
export const VcProgress = {
  Line: VcLine,
  Circle: VcCircle,
}
