import generateConfig from '../vc-picker/generate/dayjs'
import { withInstall } from '../_util/type'
import generateCalendar from './generateCalendar'
import type { CalendarProps } from './generateCalendar'

const Calendar = generateCalendar(generateConfig)

export type { CalendarProps }
export default withInstall(Calendar)
