import { defineComponent } from 'vue'
import { flattenChildren } from '@antdv/utils'
import useConfigInject from '../../config-provider/src/hooks/useConfigInject'
import { breadcrumbSeparatorProps } from './props'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ABreadcrumbSeparator',
  __ANT_BREADCRUMB_SEPARATOR: true,
  inheritAttrs: false,
  props: breadcrumbSeparatorProps(),
  setup(props, { slots, attrs }) {
    const { prefixCls } = useConfigInject('breadcrumb', props)

    return () => {
      const { class: className, ...restAttrs } = attrs
      const children = flattenChildren(slots.default?.())
      return (
        <span class={[`${prefixCls.value}-separator`, className]} {...restAttrs}>
          {children.length > 0 ? children : '/'}
        </span>
      )
    }
  },
})
