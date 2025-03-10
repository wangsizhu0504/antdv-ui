/* eslint-disable ts/no-empty-object-type */
import type { GenerateConfig } from '@antdv/vue-components/vc-picker/src/generate';
import generateRangePicker from './generateRangePicker';
import generateSinglePicker from './generateSinglePicker';

export * from './interface';
function generatePicker<DateType, ExtraProps extends {} = {}>(
  generateConfig: GenerateConfig<DateType>,
  extraProps?: ExtraProps,
) {
  // =========================== Picker ===========================
  const { DatePicker, WeekPicker, MonthPicker, YearPicker, TimePicker, QuarterPicker }
    = generateSinglePicker<DateType, ExtraProps>(generateConfig, extraProps);

  // ======================== Range Picker ========================
  const RangePicker = generateRangePicker<DateType, ExtraProps>(generateConfig, extraProps);

  return {
    DatePicker,
    WeekPicker,
    MonthPicker,
    YearPicker,
    TimePicker,
    QuarterPicker,
    RangePicker,
  };
}

export default generatePicker;
