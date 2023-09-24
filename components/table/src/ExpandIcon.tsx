import { classNames } from '../../_utils/dom'
import type { DefaultExpandIconProps } from './types'
import type { TableLocale } from '../../locale'

function renderExpandIcon(locale: TableLocale) {
  return function expandIcon<RecordType>({
    prefixCls,
    onExpand,
    record,
    expanded,
    expandable,
  }: DefaultExpandIconProps<RecordType>) {
    const iconPrefix = `${prefixCls}-row-expand-icon`

    return (
      <button
        type="button"
        onClick={(e) => {
          onExpand(record, e!)
          e.stopPropagation()
        }}
        class={classNames(iconPrefix, {
          [`${iconPrefix}-spaced`]: !expandable,
          [`${iconPrefix}-expanded`]: expandable && expanded,
          [`${iconPrefix}-collapsed`]: expandable && !expanded,
        })}
        aria-label={expanded ? locale.collapse : locale.expand}
        aria-expanded={expanded}
      />
    )
  }
}

export default renderExpandIcon
