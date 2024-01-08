import { defineComponent } from 'vue'
import { DownOutlined } from '@ant-design/icons-vue'
import { getPropsSlot } from '@antdv/utils'

import type { CSSProperties } from 'vue'
import type { CustomSlotsType, VueNode } from '@antdv/types'
import useConfigInject from '../../config-provider/src/hooks/useConfigInject'
import Dropdown from '../../dropdown'
import { breadcrumbItemProps } from './props'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ABreadcrumbItem',
  inheritAttrs: false,
  __ANT_BREADCRUMB_ITEM: true,
  props: breadcrumbItemProps(),
  // emits: ['click'],
  slots: Object as CustomSlotsType<{
    separator: any
    overlay: any
    default: any
  }>,
  setup(props, { slots, attrs, emit }) {
    const { prefixCls } = useConfigInject('breadcrumb', props)
    /**
     * if overlay is have
     * Wrap a Dropdown
     */
    const renderBreadcrumbNode = (breadcrumbItem: VueNode, prefix: string) => {
      const overlay = getPropsSlot(slots, props, 'overlay')
      if (overlay) {
        return (
          <Dropdown {...props.dropdownProps} overlay={overlay} placement="bottom">
            <span class={`${prefix}-overlay-link`}>
              {breadcrumbItem}
              <DownOutlined />
            </span>
          </Dropdown>
        )
      }
      return breadcrumbItem
    }
    const handleClick = (e: MouseEvent) => {
      emit('click', e)
    }
    return () => {
      const separator = getPropsSlot(slots, props, 'separator') ?? '/'
      const children = getPropsSlot(slots, props)
      const { class: cls, style, ...restAttrs } = attrs
      let link: VueNode
      if (props.href !== undefined) {
        link = (
          <a class={`${prefixCls.value}-link`} onClick={handleClick} {...restAttrs}>
            {children}
          </a>
        )
      } else {
        link = (
          <span class={`${prefixCls.value}-link`} onClick={handleClick} {...restAttrs}>
            {children}
          </span>
        )
      }
      // wrap to dropDown
      link = renderBreadcrumbNode(link, prefixCls.value)
      if (children !== undefined && children !== null) {
        return (
          <li class={cls} style={style as CSSProperties}>
            {link}
            {separator && <span class={`${prefixCls.value}-separator`}>{separator}</span>}
          </li>
        )
      }
      return null
    }
  },
})
