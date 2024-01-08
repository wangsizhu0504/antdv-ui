import { computed, defineComponent } from 'vue'
import { omit } from 'lodash-es'
import type { CSSProperties } from 'vue'
import { useConfigContextInject } from '../../config-provider'

import useStyle from '../style'
import useConfigInject from '../../config-provider/src/hooks/useConfigInject'
import { isPresetSize } from './gapSize'
import { flexProps } from './props'
import createFlexClassNames from './util'

export default defineComponent({
  name: 'AFlex',
  inheritAttrs: false,
  props: flexProps(),
  setup(props, { slots, attrs }) {
    const { flex: ctxFlex, direction: ctxDirection } = useConfigContextInject()
    const { prefixCls } = useConfigInject('flex', props)
    const [wrapSSR, hashId] = useStyle(prefixCls)
    const mergedCls = computed(() => [
      prefixCls.value,
      hashId.value,
      createFlexClassNames(prefixCls.value, props),
      {
        [`${prefixCls.value}-rtl`]: ctxDirection.value === 'rtl',
        [`${prefixCls.value}-gap-${props.gap}`]: isPresetSize(props.gap),
        [`${prefixCls.value}-vertical`]: props.vertical ?? ctxFlex?.value.vertical,
      },
    ])
    return () => {
      const { flex, gap, component: Component = 'div', ...othersProps } = props

      const mergedStyle: CSSProperties = {}

      if (flex)
        mergedStyle.flex = flex

      if (gap && !isPresetSize(gap))
        mergedStyle.gap = `${gap}px`

      return wrapSSR(
        <Component
          class={[attrs.class, mergedCls.value]}
          style={[attrs.style as CSSProperties, mergedStyle]}
          {...omit(othersProps, ['justify', 'wrap', 'align', 'vertical'])}
        >
          {slots.default?.()}
        </Component>,
      )
    }
  },
})
