import { withInstall } from '../_utils/vue'
import AApp from './src/App'

export const App = withInstall(AApp)

export default App

export * from './src/types'
export * from './src/props'
