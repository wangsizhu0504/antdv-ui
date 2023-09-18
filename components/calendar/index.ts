import generateConfig from '../vc-picker/generate/dayjs'
import { withInstall } from '../_util/type'

import generateCalendar from './generateCalendar'

const calendar = generateCalendar(generateConfig)

export const Calendar = withInstall(calendar)

export * from './types'

export default Calendar
