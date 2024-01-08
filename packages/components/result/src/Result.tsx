import { computed, defineComponent } from 'vue'
import { classNames } from '@antdv/utils'
import type { SlotsType, VNodeTypes } from 'vue'
import useConfigInject from '../../config-provider/src/hooks/useConfigInject'
import useStyle from '../style'

import { ExceptionMap, IconMap } from './constant'
import { resultProps } from './props'

// ExceptionImageMap keys
const ExceptionStatus = Object.keys(ExceptionMap)

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AResult',
  inheritAttrs: false,
  props: resultProps(),
  PRESENTED_IMAGE_403: ExceptionMap[403],
  PRESENTED_IMAGE_404: ExceptionMap[404],
  PRESENTED_IMAGE_500: ExceptionMap[500],
  slots: Object as SlotsType<{
    title?: any
    subTitle?: any
    icon?: any
    extra?: any
    default?: any
  }>,
  setup(props, { slots, attrs }) {
    const { prefixCls, direction } = useConfigInject('result', props)

    const [wrapSSR, hashId] = useStyle(prefixCls)

    const className = computed(() =>
      classNames(prefixCls.value, hashId.value, `${prefixCls.value}-${props.status}`, {
        [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
      }),
    )

    const renderIcon = (prefixCls: string, { status, icon }) => {
      if (ExceptionStatus.includes(`${status}`)) {
        const SVGComponent = ExceptionMap[status]
        return (
          <div class={`${prefixCls}-icon ${prefixCls}-image`}>
            <SVGComponent />
          </div>
        )
      }
      const IconComponent = IconMap[status]
      const iconNode = icon || <IconComponent />
      return <div class={`${prefixCls}-icon`}>{iconNode}</div>
    }

    const renderExtra = (prefixCls: string, extra: VNodeTypes) => extra && <div class={`${prefixCls}-extra`}>{extra}</div>

    return () => {
      const title = props.title ?? slots.title?.()
      const subTitle = props.subTitle ?? slots.subTitle?.()
      const icon = props.icon ?? slots.icon?.()
      const extra = props.extra ?? slots.extra?.()
      const pre = prefixCls.value
      return wrapSSR(
        <div {...attrs} class={[className.value, attrs.class]}>
          {renderIcon(pre, { status: props.status, icon })}
          <div class={`${pre}-title`}>{title}</div>
          {subTitle && <div class={`${pre}-subtitle`}>{subTitle}</div>}
          {renderExtra(pre, extra)}
          {slots.default && <div class={`${pre}-content`}>{slots.default()}</div>}
        </div>,
      )
    }
  },
})
