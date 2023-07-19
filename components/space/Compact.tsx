import { computed, defineComponent } from 'vue'
import { isEmpty } from 'lodash-es'
import { createContext, useConfigInject } from '../hooks'
import classNames from '../_util/classNames'

import { booleanType } from '../_util/type'
import { flattenChildren } from '../_util/props-util'
import useStyle from './style'
import type { DirectionType, SizeType } from '../config-provider'
import type { ExtractPropTypes, PropType, Ref } from 'vue'

export const spaceCompactItemProps = () => ({
  compactSize: String as PropType<SizeType>,
  compactDirection: {
    type: String,
    validator: (s: string) => ['horizontal', 'vertical'].includes(s),
    default: 'horizontal',
  },
  isFirstItem: booleanType(),
  isLastItem: booleanType(),
})

export type SpaceCompactItemContextType = Partial<
  ExtractPropTypes<ReturnType<typeof spaceCompactItemProps>>
>

export const SpaceCompactItemContext = createContext<SpaceCompactItemContextType | null>(null)

export const useCompactItemContext = (prefixCls: Ref<string>, direction: Ref<DirectionType>) => {
  const compactItemContext = SpaceCompactItemContext.useInject()

  const compactItemClassnames = computed(() => {
    if (!compactItemContext || isEmpty(compactItemContext)) return ''

    const { compactDirection, isFirstItem, isLastItem } = compactItemContext
    const separator = compactDirection === 'vertical' ? '-vertical-' : '-'

    return classNames({
      [`${prefixCls.value}-compact${separator}item`]: true,
      [`${prefixCls.value}-compact${separator}first-item`]: isFirstItem,
      [`${prefixCls.value}-compact${separator}last-item`]: isLastItem,
      [`${prefixCls.value}-compact${separator}item-rtl`]: direction.value === 'rtl',
    })
  })

  return {
    compactSize: computed(() => compactItemContext?.compactSize),
    compactDirection: computed(() => compactItemContext?.compactDirection),
    compactItemClassnames,
  }
}

export const NoCompactStyle = defineComponent({
  name: 'NoCompactStyle',
  setup(_, { slots }) {
    SpaceCompactItemContext.useProvide(null)
    return () => {
      return slots.default?.()
    }
  },
})

export const spaceCompactProps = () => ({
  prefixCls: String,
  size: {
    type: String as PropType<SizeType>,
  },
  direction: {
    type: String,
    validator: (s: string) => ['horizontal', 'vertical'].includes(s),
    default: 'horizontal',
  },
  align: {
    type: String,
    validator: (s: string) => ['start', 'end', 'center', 'baseline'].includes(s),
  },
  block: { type: Boolean, default: undefined },
})

export type SpaceCompactProps = Partial<ExtractPropTypes<ReturnType<typeof spaceCompactProps>>>

const CompactItem = defineComponent({
  name: 'CompactItem',
  props: spaceCompactItemProps(),
  setup(props, { slots }) {
    SpaceCompactItemContext.useProvide(props)

    return () => slots.default?.()
  },
})

const Compact = defineComponent({
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

export default Compact
