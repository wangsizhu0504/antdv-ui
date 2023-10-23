import type { PickerLocale } from '../../../locale'
import type { Components } from '../interface'
import type { VueNode } from '../../../_utils/types'

export interface RangesProps {
  prefixCls: string
  components?: Components
  needConfirmButton: boolean
  onNow?: null | (() => void) | false
  onOk?: null | (() => void) | false
  okDisabled?: boolean
  showNow?: boolean
  locale: PickerLocale
}

export default function getRanges({
  prefixCls,
  components = {},
  needConfirmButton,
  onNow,
  onOk,
  okDisabled,
  showNow,
  locale,
}: RangesProps) {
  let presetNode: VueNode
  let okNode: VueNode

  if (needConfirmButton) {
    const Button = (components.button || 'button') as any

    if (onNow && showNow !== false) {
      presetNode = (
        <li class={`${prefixCls}-now`}>
          <a class={`${prefixCls}-now-btn`} onClick={onNow}>
            {locale.now}
          </a>
        </li>
      )
    }

    okNode = needConfirmButton && (
      <li class={`${prefixCls}-ok`}>
        <Button
          disabled={okDisabled}
          onClick={(e) => {
            e.stopPropagation()
            onOk && onOk()
          }}
        >
          {locale.ok}
        </Button>
      </li>
    )
  }

  if (!presetNode && !okNode)
    return null

  return (
    <ul class={`${prefixCls}-ranges`}>
      {presetNode}
      {okNode}
    </ul>
  )
}
