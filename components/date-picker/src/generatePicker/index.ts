import generateSinglePicker from './generateSinglePicker'
import generateRangePicker from './generateRangePicker'
import type { GenerateConfig } from '../../../_internal/picker/generate'

function generatePicker<DateType, ExtraProps extends {} = {}>(
  generateConfig: GenerateConfig<DateType>,
  extraProps?: ExtraProps,
) {
  // =========================== Picker ===========================
  const { DatePicker, WeekPicker, MonthPicker, YearPicker, TimePicker, QuarterPicker }
    = generateSinglePicker<DateType, ExtraProps>(generateConfig, extraProps)

  // ======================== Range Picker ========================
  const RangePicker = generateRangePicker<DateType, ExtraProps>(generateConfig, extraProps)

  return {
    DatePicker,
    WeekPicker,
    MonthPicker,
    YearPicker,
    TimePicker,
    QuarterPicker,
    RangePicker,
  }
}

export default generatePicker
