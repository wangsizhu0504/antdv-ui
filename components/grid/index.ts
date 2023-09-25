import { withInstall } from '../_utils/vue'
import ARow from './src/Row'
import ACol from './src/Col'

export const Col = withInstall(ACol)
export const Row = withInstall(ARow)

export * from './src/types'
export * from './src/props'
