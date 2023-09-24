import generateConfig from '../_internal/picker/generate/dayjs'
import { withInstall } from '../_utils/vue'

import generateCalendar from './src/generateCalendar'

const ACalendar = generateCalendar(generateConfig)

export const Calendar = withInstall(ACalendar)

export * from './src/types'

export default Calendar
