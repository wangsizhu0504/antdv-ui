import type { GenerateConfig } from '@antdv/vue-components/vc-picker/src/generate'
import type { PanelMode, RangeValue } from '@antdv/vue-components/vc-picker/src/interface'
import type { RangePickerSharedProps } from '@antdv/vue-components/vc-picker/src/RangePicker'
import type { SlotsType } from 'vue'
import type { TimePickerProps, TimeRangePickerProps } from './interface'
import { devWarning, omit } from '@antdv/utils'

import { defineComponent, ref } from 'vue'
import { commonProps, datePickerProps, rangePickerProps } from '../../date-picker'
import generatePicker from '../../date-picker/src/generatePicker'
import { useInjectFormItemContext } from '../../form/src/FormItemContext'
import { commonTimePickerProps } from './props'

function createTimePicker<
  DateType,
  DTimePickerProps extends TimePickerProps<DateType> = TimePickerProps<DateType>,
  DTimeRangePickerProps extends TimeRangePickerProps<DateType> = TimeRangePickerProps<DateType>,
>(generateConfig: GenerateConfig<DateType>) {
  const DatePicker = generatePicker<DateType>(generateConfig, {
    ...commonTimePickerProps(),
    order: { type: Boolean, default: true },
  })

  const { TimePicker: InternalTimePicker, RangePicker: InternalRangePicker } = DatePicker as any
  const TimePicker = defineComponent<DTimePickerProps>({
    name: 'ATimePicker',
    inheritAttrs: false,
    props: {
      ...commonProps<any>(),
      ...datePickerProps<any>(),
      ...commonTimePickerProps(),
      addon: { type: Function },
    } as any,
    slots: Object as SlotsType<{
      addon?: any
      renderExtraFooter?: any
      suffixIcon?: any
      clearIcon?: any
      default: any
    }>,
    setup(p, { slots, expose, emit, attrs }) {
      const props = p as unknown as DTimePickerProps
      const formItemContext = useInjectFormItemContext()
      devWarning(
        !(slots.addon || props.addon),
        'TimePicker',
        '`addon` is deprecated. Please use `v-slot:renderExtraFooter` instead.',
      )
      const pickerRef = ref()
      expose({
        focus: () => {
          pickerRef.value?.focus()
        },
        blur: () => {
          pickerRef.value?.blur()
        },
      })
      const onChange = (value: DateType | string, dateString: string) => {
        emit('update:value', value)
        emit('change', value, dateString)
        formItemContext.onFieldChange()
      }
      const onOpenChange = (open: boolean) => {
        emit('update:open', open)
        emit('openChange', open)
      }
      const onFocus = (e: FocusEvent) => {
        emit('focus', e)
      }
      const onBlur = (e: FocusEvent) => {
        emit('blur', e)
        formItemContext.onFieldBlur()
      }
      const onOk = (value: DateType) => {
        emit('ok', value)
      }
      return () => {
        const { id = formItemContext.id.value } = props
        // restProps.addon
        return (
          <InternalTimePicker
            {...attrs}
            {...omit(props, ['onUpdate:value', 'onUpdate:open'])}
            id={id}
            dropdownClassName={props.popupClassName}
            mode={undefined}
            ref={pickerRef}
            renderExtraFooter={
              props.addon || slots.addon || props.renderExtraFooter || slots.renderExtraFooter
            }
            onChange={onChange}
            onOpenChange={onOpenChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onOk={onOk}
            v-slots={slots}
          />
        )
      }
    },
  })

  const TimeRangePicker = defineComponent<DTimeRangePickerProps>({
    name: 'ATimeRangePicker',
    inheritAttrs: false,
    props: {
      ...commonProps<any>(),
      ...rangePickerProps<any>(),
      ...commonTimePickerProps(),
      order: { type: Boolean, default: true },
    } as any,
    slots: Object as SlotsType<{
      renderExtraFooter?: any
      suffixIcon?: any
      clearIcon?: any
      default: any
    }>,
    setup(p, { slots, expose, emit, attrs }) {
      const props = p as unknown as DTimeRangePickerProps
      const pickerRef = ref()
      const formItemContext = useInjectFormItemContext()
      expose({
        focus: () => {
          pickerRef.value?.focus()
        },
        blur: () => {
          pickerRef.value?.blur()
        },
      })
      const onChange = (
        values: RangeValue<string> | RangeValue<DateType>,
        dateStrings: [string, string],
      ) => {
        emit('update:value', values)
        emit('change', values, dateStrings)
        formItemContext.onFieldChange()
      }
      const onOpenChange = (open: boolean) => {
        emit('update:open', open)
        emit('openChange', open)
      }
      const onFocus = (e: FocusEvent) => {
        emit('focus', e)
      }
      const onBlur = (e: FocusEvent) => {
        emit('blur', e)
        formItemContext.onFieldBlur()
      }
      const onPanelChange = (
        values: RangeValue<string> | RangeValue<DateType>,
        modes: [PanelMode, PanelMode],
      ) => {
        emit('panelChange', values, modes)
      }
      const onOk = (values: RangeValue<string | DateType>) => {
        emit('ok', values)
      }
      const onCalendarChange: RangePickerSharedProps<DateType>['onCalendarChange'] = (
        values: RangeValue<string> | RangeValue<DateType>,
        dateStrings: [string, string],
        info,
      ) => {
        emit('calendarChange', values, dateStrings, info)
      }
      return () => {
        const { id = formItemContext.id.value } = props
        return (
          <InternalRangePicker
            {...attrs}
            {...omit(props, ['onUpdate:open', 'onUpdate:value'] as any)}
            id={id}
            dropdownClassName={props.popupClassName}
            picker="time"
            mode={undefined}
            ref={pickerRef}
            onChange={onChange}
            onOpenChange={onOpenChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onPanelChange={onPanelChange}
            onOk={onOk}
            onCalendarChange={onCalendarChange}
            v-slots={slots}
          />
        )
      }
    },
  })

  return {
    TimePicker,
    TimeRangePicker,
  }
}

export default createTimePicker
