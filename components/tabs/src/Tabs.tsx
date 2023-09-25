// Accessibility https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Tab_Role
import { defineComponent } from 'vue'
import { omit } from '../../_utils/omit'
import {
  flattenChildren,
  initDefaultProps,
} from '../../_utils/vue'

import { camelize } from '../../_utils/util'
import { isValidElement } from '../../_utils/is'

import { tabsProps } from './props'
import InternalTabs from './InternalTabs'
import type { Tab } from './types'
import type { SlotsType } from 'vue'

function parseTabList(children: any[]): Tab[] {
  return children
    .map((node) => {
      if (isValidElement(node)) {
        const props = { ...(node.props || {}) }
        for (const [k, v] of Object.entries(props)) {
          delete props[k]
          props[camelize(k)] = v
        }
        const slots = node.children || {}
        const key = node.key !== undefined ? node.key : undefined
        const {
          tab = slots.tab,
          disabled,
          forceRender,
          closable,
          animated,
          active,
          destroyInactiveTabPane,
        } = props
        return {
          key,
          ...props,
          node,
          closeIcon: slots.closeIcon,
          tab,
          disabled: disabled === '' || disabled,
          forceRender: forceRender === '' || forceRender,
          closable: closable === '' || closable,
          animated: animated === '' || animated,
          active: active === '' || active,
          destroyInactiveTabPane: destroyInactiveTabPane === '' || destroyInactiveTabPane,
        }
      }

      return null
    })
    .filter(tab => tab)
}

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ATabs',
  inheritAttrs: false,
  props: initDefaultProps(tabsProps(), {
    tabPosition: 'top',
    animated: {
      inkBar: true,
      tabPane: false,
    },
  }),
  slots: Object as SlotsType<{
    tabBarExtraContent?: any
    leftExtra?: any
    rightExtra?: any
    moreIcon?: any
    addIcon?: any
    removeIcon?: any
    renderTabBar?: any
    default?: any
  }>,
  // emits: ['tabClick', 'tabScroll', 'change', 'update:activeKey'],
  setup(props, { attrs, slots, emit }) {
    const handleChange = (key: string) => {
      emit('update:activeKey', key)
      emit('change', key)
    }
    return () => {
      const tabs = parseTabList(flattenChildren(slots.default?.()))
      return (
        <InternalTabs
          {...omit(props, ['onUpdate:activeKey', 'onChange'])}
          {...attrs}
          onChange={handleChange}
          tabs={tabs}
          v-slots={slots}
        />
      )
    }
  },
})
