import { classNames } from '../../_utils/dom'
import { useInjectMenu } from './hooks/useMenuContext'
import type { FunctionalComponent } from 'vue'

const InternalSubMenuList: FunctionalComponent<any> = (_props, { slots, attrs }) => {
  const { prefixCls, mode } = useInjectMenu()
  return (
    <ul
      {...attrs}
      class={classNames(
        prefixCls.value,
        `${prefixCls.value}-sub`,
        `${prefixCls.value}-${mode.value === 'inline' ? 'inline' : 'vertical'}`,
      )}
      data-menu-list
    >
      {slots.default?.()}
    </ul>
  )
}

InternalSubMenuList.displayName = 'SubMenuList'

export default InternalSubMenuList
