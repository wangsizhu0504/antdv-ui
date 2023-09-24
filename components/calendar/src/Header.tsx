import { defineComponent, ref } from 'vue'
import Select from '../../select'
import { RadioButton, RadioGroup } from '../../radio'
import { FormItemInputContext } from '../../form/src/FormItemContext'
import type { CalendarHeaderProps, ModeSwitchProps, SharedProps } from './types'

const YearSelectOffset = 10
const YearSelectTotal = 20

function YearSelect<DateType>(props: SharedProps<DateType>) {
  const { fullscreen, validRange, generateConfig, locale, prefixCls, value, onChange, divRef }
    = props

  const year = generateConfig.getYear(value || generateConfig.getNow())

  let start = year - YearSelectOffset
  let end = start + YearSelectTotal

  if (validRange) {
    start = generateConfig.getYear(validRange[0])
    end = generateConfig.getYear(validRange[1]) + 1
  }

  const suffix = locale && locale.year === '年' ? '年' : ''
  const options: { label: string, value: number }[] = []
  for (let index = start; index < end; index++)
    options.push({ label: `${index}${suffix}`, value: index })

  return (
    <Select
      size={fullscreen ? undefined : 'small'}
      options={options}
      value={year}
      class={`${prefixCls}-year-select`}
      onChange={(numYear: number) => {
        let newDate = generateConfig.setYear(value, numYear)

        if (validRange) {
          const [startDate, endDate] = validRange
          const newYear = generateConfig.getYear(newDate)
          const newMonth = generateConfig.getMonth(newDate)
          if (
            newYear === generateConfig.getYear(endDate)
            && newMonth > generateConfig.getMonth(endDate)
          )
            newDate = generateConfig.setMonth(newDate, generateConfig.getMonth(endDate))

          if (
            newYear === generateConfig.getYear(startDate)
            && newMonth < generateConfig.getMonth(startDate)
          )
            newDate = generateConfig.setMonth(newDate, generateConfig.getMonth(startDate))
        }

        onChange(newDate)
      }}
      getPopupContainer={() => divRef!.value!}
    />
  )
}
YearSelect.inheritAttrs = false

function MonthSelect<DateType>(props: SharedProps<DateType>) {
  const { prefixCls, fullscreen, validRange, value, generateConfig, locale, onChange, divRef }
    = props
  const month = generateConfig.getMonth(value || generateConfig.getNow())

  let start = 0
  let end = 11

  if (validRange) {
    const [rangeStart, rangeEnd] = validRange
    const currentYear = generateConfig.getYear(value)
    if (generateConfig.getYear(rangeEnd) === currentYear)
      end = generateConfig.getMonth(rangeEnd)

    if (generateConfig.getYear(rangeStart) === currentYear)
      start = generateConfig.getMonth(rangeStart)
  }

  const months = locale.shortMonths || generateConfig.locale.getShortMonths!(locale.locale)
  const options: { label: string, value: number }[] = []
  for (let index = start; index <= end; index += 1) {
    options.push({
      label: months[index],
      value: index,
    })
  }

  return (
    <Select
      size={fullscreen ? undefined : 'small'}
      class={`${prefixCls}-month-select`}
      value={month}
      options={options}
      onChange={(newMonth: number) => {
        onChange(generateConfig.setMonth(value, newMonth))
      }}
      getPopupContainer={() => divRef!.value!}
    />
  )
}

MonthSelect.inheritAttrs = false

function ModeSwitch<DateType>(props: ModeSwitchProps<DateType>) {
  const { prefixCls, locale, mode, fullscreen, onModeChange } = props
  return (
    <RadioGroup
      onChange={({ target: { value } }) => {
        onModeChange(value)
      }}
      value={mode}
      size={fullscreen ? undefined : 'small'}
      class={`${prefixCls}-mode-switch`}
    >
      <RadioButton value="month">{locale.month}</RadioButton>
      <RadioButton value="year">{locale.year}</RadioButton>
    </RadioGroup>
  )
}

ModeSwitch.inheritAttrs = false

export default defineComponent<CalendarHeaderProps<any>>({
  name: 'CalendarHeader',
  inheritAttrs: false,
  props: [
    'mode',
    'prefixCls',
    'value',
    'validRange',
    'generateConfig',
    'locale',
    'mode',
    'fullscreen',
  ] as any,
  setup(_props, { attrs }) {
    const divRef = ref<HTMLDivElement>(null)
    const formItemInputContext = FormItemInputContext.useInject()
    FormItemInputContext.useProvide(formItemInputContext, { isFormItemInput: false })

    return () => {
      const props = { ..._props, ...attrs }
      const { prefixCls, fullscreen, mode, onChange, onModeChange } = props
      const sharedProps = {
        ...props,
        fullscreen,
        divRef,
      } as any

      return (
        <div class={`${prefixCls}-header`} ref={divRef}>
          <YearSelect
            {...sharedProps}
            onChange={(v) => {
              onChange(v, 'year')
            }}
          />
          {mode === 'month' && (
            <MonthSelect
              {...sharedProps}
              onChange={(v) => {
                onChange(v, 'month')
              }}
            />
          )}
          <ModeSwitch {...sharedProps} onModeChange={onModeChange} />
        </div>
      )
    }
  },
})
