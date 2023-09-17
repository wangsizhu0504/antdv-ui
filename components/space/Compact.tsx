import { computed, defineComponent } from 'vue'
import { isEmpty } from 'lodash-es'
import { useConfigInject } from '../hooks'
import classNames from '../_util/classNames'

import { flattenChildren } from '../_util/props-util'
import useStyle from './style'
import CompactItem from './Item'
import { spaceCompactProps } from './props'
import { SpaceCompactItemContext } from './context'

export default defineComponent({
  name: 'ASpaceCompact',
  inheritAttrs: false,
  props: spaceCompactProps(),
  setup(props, { attrs, slots }) {
    const { prefixCls, direction: directionConfig } = useConfigInject('space-compact', props)
    const compactItemContext = SpaceCompactItemContext.useInject()

    const [wrapSSR, hashId] = useStyle(prefixCls)

    const clx = computed(() => {
      return classNames(prefixCls.value, hashId.value, {
        [`${prefixCls.value}-rtl`]: directionConfig.value === 'rtl',
        [`${prefixCls.value}-block`]: props.block,
        [`${prefixCls.value}-vertical`]: props.direction === 'vertical',
      })
    })

    return () => {
      const childNodes = flattenChildren(slots.default?.() || [])
      // =========================== Render ===========================
      if (childNodes.length === 0)
        return null

      return wrapSSR(
        <div {...attrs} class={[clx.value, attrs.class]}>
          {childNodes.map((child, i) => {
            const key = (child && child.key) || `${prefixCls.value}-item-${i}`
            const noCompactItemContext = !compactItemContext || isEmpty(compactItemContext)

            return (
              <CompactItem
                key={key}
                compactSize={props.size ?? 'middle'}
                compactDirection={props.direction}
                isFirstItem={i === 0 && (noCompactItemContext || compactItemContext?.isFirstItem)}
                isLastItem={
                  i === childNodes.length - 1
                  && (noCompactItemContext || compactItemContext?.isLastItem)
                }
              >
                {child}
              </CompactItem>
            )
          })}
        </div>,
      )
    }
  },
})
