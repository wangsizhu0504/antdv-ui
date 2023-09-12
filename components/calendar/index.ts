import generateConfig from '../vc-picker/generate/dayjs'
import { withInstall } from '../_util/type'

import generateCalendar from './generateCalendar'

const Calendar = generateCalendar(generateConfig)

const ACalendar = withInstall(Calendar)

export * from './type'

export default ACalendar
