import { withInstall } from '@antdv/utils'
import dayjsGenerateConfig from '@antdv/vue-components/vc-picker/src/generate/dayjs'

import generateCalendar from './src/generateCalendar'

const ACalendar = generateCalendar(dayjsGenerateConfig)

export const Calendar = withInstall(ACalendar)

export * from './src/interface'

export default Calendar
