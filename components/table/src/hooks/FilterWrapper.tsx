import KeyCode from '../../../_utils/keyCode'
import type { KeyboardEventHandler } from '../../../_utils/types'

const onKeyDown: KeyboardEventHandler = (event) => {
  const { keyCode } = event
  if (keyCode === KeyCode.ENTER)
    event.stopPropagation()
}
const FilterDropdownMenuWrapper = (_props, { slots }) => (
  <div onClick={e => e.stopPropagation()} onKeydown={onKeyDown}>
    {slots.default?.()}
  </div>
)

export default FilterDropdownMenuWrapper
