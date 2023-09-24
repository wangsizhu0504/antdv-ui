import { withInstall } from '../_utils/vue'
import qrCode from './src/QRCode'

export const QRCode = withInstall(qrCode)

export default QRCode

export * from './src/types'
export * from './src/props'
