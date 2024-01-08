import { cloneVNode, defineComponent } from 'vue'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { classNames, filterEmpty, initDefaultProps } from '@antdv/utils'
import type { SlotsType } from 'vue'
import useConfigInject from '../../config-provider/src/hooks/useConfigInject'

import useStyle from '../style'
import TimelineItem from './TimelineItem'
import { timelineProps } from './props'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ATimeline',
  inheritAttrs: false,
  props: initDefaultProps(timelineProps(), {
    reverse: false,
    mode: '',
  }),
  slots: Object as SlotsType<{
    pending?: any
    pendingDot?: any
    default?: any
  }>,
  setup(props, { slots, attrs }) {
    const { prefixCls, direction } = useConfigInject('timeline', props)

    // style
    const [wrapSSR, hashId] = useStyle(prefixCls)

    const getPositionCls = (ele, idx: number) => {
      const eleProps = ele.props || {}
      if (props.mode === 'alternate') {
        if (eleProps.position === 'right') return `${prefixCls.value}-item-right`
        if (eleProps.position === 'left') return `${prefixCls.value}-item-left`
        return idx % 2 === 0 ? `${prefixCls.value}-item-left` : `${prefixCls.value}-item-right`
      }
      if (props.mode === 'left') return `${prefixCls.value}-item-left`
      if (props.mode === 'right') return `${prefixCls.value}-item-right`
      if (eleProps.position === 'right') return `${prefixCls.value}-item-right`
      return ''
    }

    return () => {
      const {
        pending = slots.pending?.(),
        pendingDot = slots.pendingDot?.(),
        reverse,
        mode,
      } = props
      const pendingNode = typeof pending === 'boolean' ? null : pending
      const children = filterEmpty(slots.default?.())

      const pendingItem = pending
        ? (
          <TimelineItem pending={!!pending} dot={pendingDot || <LoadingOutlined />}>
            {pendingNode}
          </TimelineItem>
          )
        : null

      if (pendingItem)
        children.push(pendingItem)

      const timeLineItems = reverse ? children.reverse() : children

      const itemsCount = timeLineItems.length
      const lastCls = `${prefixCls.value}-item-last`
      const items = timeLineItems.map((ele, idx) => {
        const pendingClass = idx === itemsCount - 2 ? lastCls : ''
        const readyClass = idx === itemsCount - 1 ? lastCls : ''
        return cloneVNode(ele, {
          class: classNames([
            (!reverse && !!pending) ? pendingClass : readyClass,
            getPositionCls(ele, idx),
          ]),
        })
      })
      const hasLabelItem = timeLineItems.some(
        item => !!(item.props?.label || item.children?.label),
      )
      const classString = classNames(
        prefixCls.value,
        {
          [`${prefixCls.value}-pending`]: !!pending,
          [`${prefixCls.value}-reverse`]: !!reverse,
          [`${prefixCls.value}-${mode}`]: !!mode && !hasLabelItem,
          [`${prefixCls.value}-label`]: hasLabelItem,
          [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
        },
        attrs.class,
        hashId.value,
      )
      return wrapSSR(
        <ul {...attrs} class={classString}>
          {items}
        </ul>,
      )
    }
  },
})
