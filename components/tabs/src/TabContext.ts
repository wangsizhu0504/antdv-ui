import { defineComponent, inject, provide, ref, toRefs } from 'vue'
import type { InjectionKey, PropType, Ref } from 'vue'
import type { Tab } from './types'

export interface TabContextProps {
  tabs: Ref<Tab[]>
  prefixCls: Ref<string>
}

const TabsContextKey: InjectionKey<TabContextProps> = Symbol('tabsContextKey')

export const useProvideTabs = (props: TabContextProps) => {
  provide(TabsContextKey, props)
}

export const useInjectTabs = () => {
  return inject(TabsContextKey, { tabs: ref([]), prefixCls: ref() })
}

const TabsContextProvider = defineComponent({
  compatConfig: { MODE: 3 },
  name: 'TabsContextProvider',
  inheritAttrs: false,
  props: {
    tabs: { type: Object as PropType<TabContextProps['tabs']>, default: undefined },
    prefixCls: { type: String, default: undefined },
  },
  setup(props, { slots }) {
    useProvideTabs(toRefs(props))
    return () => slots.default?.()
  },
})

export default TabsContextProvider
