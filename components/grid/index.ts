import { withInstall } from '../_utils/vue'
import row from './Row'
import col from './Col'

export const Col = withInstall(col)
export const Row = withInstall(row)

export * from './types'
export * from './props'
