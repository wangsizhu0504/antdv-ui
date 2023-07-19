import Header from '../Header'
import { useInjectPanel } from '../../PanelContext'
import { formatValue } from '../../utils/dateUtil'
import useMergeProps from '../../hooks/useMergeProps'
import type { GenerateConfig } from '../../generate'
import type { PickerLocale } from '../../../locale'

export interface QuarterHeaderProps<DateType> {
  prefixCls: string
  viewDate: DateType
  locale: PickerLocale
  generateConfig: GenerateConfig<DateType>

  onPrevYear: () => void
  onNextYear: () => void
  onYearClick: () => void
}

function QuarterHeader<DateType>(_props: QuarterHeaderProps<DateType>) {
  const props = useMergeProps(_props)
  const { prefixCls, generateConfig, locale, viewDate, onNextYear, onPrevYear, onYearClick }
    = props
  const { hideHeader } = useInjectPanel()
  if (hideHeader.value)
    return null

  const headerPrefixCls = `${prefixCls}-header`
  return (
    <Header
      {...props}
      prefixCls={headerPrefixCls}
      onSuperPrev={onPrevYear}
      onSuperNext={onNextYear}
    >
      <button type="button" onClick={onYearClick} class={`${prefixCls}-year-btn`}>
        {formatValue(viewDate, {
          locale,
          format: locale.yearFormat,
          generateConfig,
        })}
      </button>
    </Header>
  )
}

QuarterHeader.displayName = 'QuarterHeader'
QuarterHeader.inheritAttrs = false

export default QuarterHeader
