import { defineComponent } from 'vue'
import { useInjectTabs } from '../TabContext'
import { cloneElement } from '../../../_util/vnode'
import { tabPanelListProps } from '../props'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'TabPanelList',
  inheritAttrs: false,
  props: tabPanelListProps(),
  setup(props) {
    const { tabs, prefixCls } = useInjectTabs()
    return () => {
      const { id, activeKey, animated, tabPosition, rtl, destroyInactiveTabPane } = props
      const tabPaneAnimated = animated.tabPane
      const pre = prefixCls.value
      const activeIndex = tabs.value.findIndex(tab => tab.key === activeKey)
      return (
        <div class={`${pre}-content-holder`}>
          <div
            class={[
              `${pre}-content`,
              `${pre}-content-${tabPosition}`,
              {
                [`${pre}-content-animated`]: tabPaneAnimated,
              },
            ]}
            style={
             (activeIndex && tabPaneAnimated)
               ? { [rtl ? 'marginRight' : 'marginLeft']: `-${activeIndex}00%` }
               : null
            }
          >
            {tabs.value.map((tab) => {
              return cloneElement(tab.node, {
                key: tab.key,
                prefixCls: pre,
                tabKey: tab.key,
                id,
                animated: tabPaneAnimated,
                active: tab.key === activeKey,
                destroyInactiveTabPane,
              })
            })}
          </div>
        </div>
      )
    }
  },
})
