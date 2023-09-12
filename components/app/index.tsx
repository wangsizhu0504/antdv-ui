import { withInstall } from '../_util/type'
import app from './app'

export * from './type'
export * from './props'

const AApp = withInstall(app)
export default AApp
