import dayjsGenerateConfig from '../_internal/picker/generate/dayjs'
import generatePicker from './generatePicker'
import type { Dayjs } from 'dayjs'
import type { App } from 'vue'

const { DatePicker, WeekPicker, MonthPicker, YearPicker, TimePicker, QuarterPicker, RangePicker }
  = generatePicker<Dayjs>(dayjsGenerateConfig)

/* istanbul ignore next */
export { RangePicker, WeekPicker, MonthPicker, QuarterPicker }

export default Object.assign(DatePicker, {
  WeekPicker,
  MonthPicker,
  YearPicker,
  RangePicker,
  TimePicker,
  QuarterPicker,
  install: (app: App) => {
    app.component(DatePicker.name, DatePicker)
    app.component(RangePicker.name, RangePicker)
    app.component(MonthPicker.name, MonthPicker)
    app.component(WeekPicker.name, WeekPicker)
    app.component(QuarterPicker.name, QuarterPicker)
    return app
  },
})
