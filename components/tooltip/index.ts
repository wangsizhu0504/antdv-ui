import { withInstall } from '../_util/type'
import toolTip from './Tooltip'

export const Tooltip = withInstall(toolTip)
export default Tooltip

export * from './types'

export type { AdjustOverflow, PlacementsConfig } from '../_util/placements'
