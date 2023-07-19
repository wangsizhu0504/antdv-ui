import Header from '../Header'
import { useInjectPanel } from '../../PanelContext'
import { formatValue } from '../../utils/dateUtil'
import useMergeProps from '../../hooks/useMergeProps'
import type { GenerateConfig } from '../../generate'
import type { PickerLocale } from '../../../locale'

export interface TimeHeaderProps<DateType> {
  prefixCls: string
  value?: DateType | null
  locale: PickerLocale
  generateConfig: GenerateConfig<DateType>
  format: string
}

function TimeHeader<DateType>(_props: TimeHeaderProps<DateType>) {
  const props = useMergeProps(_props)
  const { hideHeader } = useInjectPanel()
  if (hideHeader.value)
    return null

  const { prefixCls, generateConfig, locale, value, format } = props
  const headerPrefixCls = `${prefixCls}-header`

  return (
    <Header prefixCls={headerPrefixCls}>
      {value
        ? formatValue(value, {
          locale,
          format,
          generateConfig,
        })
        : '\u00A0'}
    </Header>
  )
}

TimeHeader.displayName = 'TimeHeader'
TimeHeader.inheritAttrs = false

export default TimeHeader
