import { withInstall } from '@antdv/utils'
import { dayjsGenerateConfig } from '@antdv/vue-components'

import generateCalendar from './src/generateCalendar'

const ACalendar = generateCalendar(dayjsGenerateConfig)

export const Calendar = withInstall(ACalendar)

export * from './src/types'

export default Calendar
