import type { Dayjs } from 'dayjs';
import type { App } from 'vue';
import type {
  RangePickerProps as BaseRangePickerProps,
  PickerDateProps,
  PickerProps,
} from './generatePicker';
import type { ExtraDatePickerProps, ExtraRangePickerProps } from './generatePicker/props';
import dayjsGenerateConfig from '@antdv/vue-components/vc-picker/src/generate/dayjs';
import generatePicker from './generatePicker';

const { DatePicker, WeekPicker, MonthPicker, YearPicker, TimePicker, QuarterPicker, RangePicker }
  = generatePicker<Dayjs>(dayjsGenerateConfig);

/* istanbul ignore next */
export { MonthPicker, QuarterPicker, RangePicker, WeekPicker };

export type DatePickerProps = PickerProps<Dayjs> & ExtraDatePickerProps<Dayjs>;
export type MonthPickerProps = Omit<PickerDateProps<Dayjs>, 'picker'> & ExtraDatePickerProps<Dayjs>;
export type WeekPickerProps = Omit<PickerDateProps<Dayjs>, 'picker'> & ExtraDatePickerProps<Dayjs>;
export type RangePickerProps = BaseRangePickerProps<Dayjs> & ExtraRangePickerProps<Dayjs>;

export default Object.assign(DatePicker, {
  WeekPicker,
  MonthPicker,
  YearPicker,
  RangePicker,
  TimePicker,
  QuarterPicker,
  install: (app: App) => {
    app.component(DatePicker.name, DatePicker);
    app.component(RangePicker.name, RangePicker);
    app.component(MonthPicker.name, MonthPicker);
    app.component(WeekPicker.name, WeekPicker);
    app.component(QuarterPicker.name, QuarterPicker);
    return app;
  },
});
