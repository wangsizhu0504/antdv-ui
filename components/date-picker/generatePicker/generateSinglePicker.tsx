import { CalendarOutlined, ClockCircleOutlined, CloseCircleFilled } from '@ant-design/icons-vue'
import { computed, defineComponent, ref } from 'vue'
import { enUS } from '../../locale'
import { getPlaceholder, transPlacement2DropdownAlign } from '../util'
import useStyle from '../style'
import { useLocaleReceiver } from '../../locale-provider'
import RCPicker from '../../_internal/picker'
import { useConfigInject } from '../../hooks'

import { warning } from '../../_utils/log'
import { getMergedStatus, getStatusClassNames } from '../../_utils/status'
import { FormItemInputContext, useInjectFormItemContext } from '../../form/src/FormItemContext'

import { useCompactItemContext } from '../../space'
import { classNames } from '../../_utils/dom'
import { Components, getTimeProps } from './util'
import { commonProps, datePickerProps } from './props'
import type { CustomSlotsType } from '../../_utils/types'

import type { CommonProps, DatePickerProps } from './props'
import type { PanelMode, PickerMode } from '../../_internal/picker/interface'
import type { GenerateConfig } from '../../_internal/picker/generate/index'

// CSSINJS

export default function generateSinglePicker<DateType, ExtraProps = {}>(
  generateConfig: GenerateConfig<DateType>,
  extraProps: ExtraProps,
) {
  function getPicker(picker?: PickerMode, displayName?: string) {
    const comProps = {
      ...commonProps<DateType>(),
      ...datePickerProps<DateType>(),
      ...extraProps,
    }
    return defineComponent({
      compatConfig: { MODE: 3 },
      name: displayName,
      inheritAttrs: false,
      props: comProps,
      slots: Object as CustomSlotsType<{
        suffixIcon?: any
        prevIcon?: any
        nextIcon?: any
        superPrevIcon?: any
        superNextIcon?: any
        dateRender?: any
        renderExtraFooter?: any
        monthCellRender?: any
        monthCellContentRender?: any
        clearIcon?: any
        default?: any
      }>,
      setup(_props, { slots, expose, attrs, emit }) {
        // 兼容 vue 3.2.7
        const props = _props as unknown as CommonProps<DateType> &
        DatePickerProps<DateType> &
        ExtraProps
        const formItemContext = useInjectFormItemContext()
        const formItemInputContext = FormItemInputContext.useInject()
        // =================== Warning =====================
        if (process.env.NODE_ENV !== 'production') {
          warning(
            picker !== 'quarter',
            displayName || 'DatePicker',
            `DatePicker.${displayName} is legacy usage. Please use DatePicker[picker='${picker}'] directly.`,
          )

          warning(
            !props.dropdownClassName,
            displayName || 'DatePicker',
            '`dropdownClassName` is deprecated. Please use `popupClassName` instead.',
          )
          warning(
            !(props.monthCellContentRender || slots.monthCellContentRender),
            displayName || 'DatePicker',
            '`monthCellContentRender` is deprecated. Please use `monthCellRender"` instead.',
          )

          warning(
            !attrs.getCalendarContainer,
            displayName || 'DatePicker',
            '`getCalendarContainer` is deprecated. Please use `getPopupContainer"` instead.',
          )
        }

        const { prefixCls, direction, getPopupContainer, size, rootPrefixCls, disabled }
          = useConfigInject('picker', props)
        const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction)
        const mergedSize = computed(() => compactSize.value || size.value)
        // style
        const [wrapSSR, hashId] = useStyle(prefixCls)

        const pickerRef = ref()
        expose({
          focus: () => {
            pickerRef.value?.focus()
          },
          blur: () => {
            pickerRef.value?.blur()
          },
        })
        const maybeToString = (date: DateType) => {
          return props.valueFormat ? generateConfig.toString(date, props.valueFormat) : date
        }
        const onChange = (date: DateType, dateString: string) => {
          const value = maybeToString(date)
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
        const onPanelChange = (date: DateType, mode: PanelMode | null) => {
          const value = maybeToString(date)
          emit('panelChange', value, mode)
        }
        const onOk = (date: DateType) => {
          const value = maybeToString(date)
          emit('ok', value)
        }

        const [contextLocale] = useLocaleReceiver('DatePicker', enUS.DatePicker)

        const value = computed(() => {
          if (props.value) {
            return props.valueFormat
              ? generateConfig.toDate(props.value as string | DateType, props.valueFormat)
              : props.value
          }
          return (props.value === '' ? undefined : props.value) as DateType
        })
        const defaultValue = computed(() => {
          if (props.defaultValue) {
            return props.valueFormat
              ? generateConfig.toDate(props.defaultValue as string | DateType, props.valueFormat)
              : props.defaultValue
          }
          return (props.defaultValue === '' ? undefined : props.defaultValue) as DateType
        })
        const defaultPickerValue = computed(() => {
          if (props.defaultPickerValue) {
            return props.valueFormat
              ? generateConfig.toDate(
                props.defaultPickerValue as string | DateType,
                props.valueFormat,
              )
              : props.defaultPickerValue
          }
          return (
            props.defaultPickerValue === '' ? undefined : props.defaultPickerValue
          ) as DateType
        })

        return () => {
          const locale = { ...contextLocale.value, ...props.locale }
          const p = { ...props, ...attrs }
          const {
            bordered = true,
            placeholder,
            suffixIcon = slots.suffixIcon?.(),
            showToday = true,
            transitionName,
            allowClear = true,
            dateRender = slots.dateRender,
            renderExtraFooter = slots.renderExtraFooter,
            monthCellRender = slots.monthCellRender
              || (props as any).monthCellContentRender
              || slots.monthCellContentRender,
            clearIcon = slots.clearIcon?.(),
            id = formItemContext.id.value,
            ...restProps
          } = p
          const showTime = (p.showTime as string) === '' ? true : p.showTime
          const { format } = p as any

          let additionalOverrideProps: any = {}
          if (picker)
            additionalOverrideProps.picker = picker

          const mergedPicker = picker || p.picker || 'date'

          additionalOverrideProps = {
            ...additionalOverrideProps,
            ...(showTime
              ? getTimeProps({
                format,
                picker: mergedPicker,
                ...(typeof showTime === 'object' ? showTime : {}),
              })
              : {}),
            ...(mergedPicker === 'time'
              ? getTimeProps({ format, ...restProps, picker: mergedPicker })
              : {}),
          }
          const pre = prefixCls.value
          const suffixNode = (
            <>
              {suffixIcon || (picker === 'time' ? <ClockCircleOutlined /> : <CalendarOutlined />)}
              {formItemInputContext.hasFeedback && formItemInputContext.feedbackIcon}
            </>
          )
          return wrapSSR(
            <RCPicker
              monthCellRender={monthCellRender}
              dateRender={dateRender}
              renderExtraFooter={renderExtraFooter}
              ref={pickerRef}
              placeholder={getPlaceholder(locale, mergedPicker, placeholder)}
              suffixIcon={suffixNode}
              dropdownAlign={transPlacement2DropdownAlign(direction.value, props.placement)}
              clearIcon={clearIcon || <CloseCircleFilled />}
              allowClear={allowClear}
              transitionName={transitionName || `${rootPrefixCls.value}-slide-up`}
              {...restProps}
              {...additionalOverrideProps}
              id={id}
              picker={mergedPicker}
              value={value.value}
              defaultValue={defaultValue.value}
              defaultPickerValue={defaultPickerValue.value}
              showToday={showToday}
              locale={locale!.lang}
              class={classNames(
                {
                  [`${pre}-${mergedSize.value}`]: mergedSize.value,
                  [`${pre}-borderless`]: !bordered,
                },
                getStatusClassNames(
                  pre,
                  getMergedStatus(formItemInputContext.status, props.status),
                  formItemInputContext.hasFeedback,
                ),
                attrs.class,
                hashId.value,
                compactItemClassnames.value,
              )}
              disabled={disabled.value}
              prefixCls={pre}
              getPopupContainer={attrs.getCalendarContainer || getPopupContainer.value}
              generateConfig={generateConfig}
              prevIcon={slots.prevIcon?.() || <span class={`${pre}-prev-icon`} />}
              nextIcon={slots.nextIcon?.() || <span class={`${pre}-next-icon`} />}
              superPrevIcon={slots.superPrevIcon?.() || <span class={`${pre}-super-prev-icon`} />}
              superNextIcon={slots.superNextIcon?.() || <span class={`${pre}-super-next-icon`} />}
              components={Components}
              direction={direction.value}
              dropdownClassName={classNames(
                hashId.value,
                props.popupClassName,
                props.dropdownClassName,
              )}
              onChange={onChange}
              onOpenChange={onOpenChange}
              onFocus={onFocus}
              onBlur={onBlur}
              onPanelChange={onPanelChange}
              onOk={onOk}
            />,
          )
        }
      },
    })
  }

  const DatePicker = getPicker(undefined, 'ADatePicker')
  const WeekPicker = getPicker('week', 'AWeekPicker')
  const MonthPicker = getPicker('month', 'AMonthPicker')
  const YearPicker = getPicker('year', 'AYearPicker')
  const TimePicker = getPicker('time', 'TimePicker') // 给独立组件 TimePicker 使用，此处名称不用更改
  const QuarterPicker = getPicker('quarter', 'AQuarterPicker')

  return {
    DatePicker,
    WeekPicker,
    MonthPicker,
    YearPicker,
    TimePicker,
    QuarterPicker,
  }
}
