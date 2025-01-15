import type { KeyboardEventHandler } from '@antdv/types';
import { KeyCode } from '@antdv/utils';

const onKeyDown: KeyboardEventHandler = (event) => {
  const { keyCode } = event;
  if (keyCode === KeyCode.ENTER)
    event.stopPropagation();
};
function FilterDropdownMenuWrapper(_props, { slots }) {
  return (
    <div onClick={e => e.stopPropagation()} onKeydown={onKeyDown}>
      {slots.default?.()}
    </div>
  );
}

export default FilterDropdownMenuWrapper;
