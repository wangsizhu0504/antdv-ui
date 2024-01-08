import { defineComponent, isVNode, renderSlot } from 'vue'
import { isPlainObject } from 'lodash-es'
import { filterEmptyWithUndefined, flattenChildren, isEmptyElement, warning } from '@antdv/utils'
import type { VNode, VNodeTypes } from 'vue'
import type { CustomSlotsType } from '@antdv/types'
import Tabs from '../../tabs'
import useConfigInject from '../../config-provider/src/hooks/useConfigInject'
import Skeleton from '../../skeleton'
import useStyle from '../style'
import type { SizeType } from '../../config-provider'
import { cardProps } from './props'
import type { CardTabListType } from './types'

const { TabPane } = Tabs

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ACard',
  inheritAttrs: false,
  props: cardProps(),
  slots: Object as CustomSlotsType<{
    title: any
    extra: any
    tabBarExtraContent: any
    actions: any
    cover: any
    customTab: CardTabListType
    default: any
  }>,
  setup(props, { slots, attrs }) {
    const { prefixCls, direction, size } = useConfigInject('card', props)
    const [wrapSSR, hashId] = useStyle(prefixCls)
    const getAction = (actions: VNodeTypes[]) => {
      const actionList = actions.map((action, index) => (isVNode(action) && !isEmptyElement(action)) || !isVNode(action)
        ? (
          <li style={{ width: `${100 / actions.length}%` }} key={`action-${index}`}>
            <span>{action}</span>
          </li>
          )
        : null,
      )
      return actionList
    }
    const triggerTabChange = (key: string) => {
      props.onTabChange?.(key)
    }
    const isContainGrid = (obj: VNode[] = []) => {
      let containGrid: boolean
      obj.forEach((element) => {
        if (element && isPlainObject(element.type) && (element.type as any).__ANT_CARD_GRID)
          containGrid = true
      })
      return containGrid
    }

    return () => {
      const {
        headStyle = {},
        bodyStyle = {},
        loading,
        bordered = true,
        type,
        tabList,
        hoverable,
        activeTabKey,
        defaultActiveTabKey,
        tabBarExtraContent = filterEmptyWithUndefined(slots.tabBarExtraContent?.()),
        title = filterEmptyWithUndefined(slots.title?.()),
        extra = filterEmptyWithUndefined(slots.extra?.()),
        actions = filterEmptyWithUndefined(slots.actions?.()),
        cover = filterEmptyWithUndefined(slots.cover?.()),
      } = props
      const children = flattenChildren(slots.default?.())
      const pre = prefixCls.value
      const classString = {
        [`${pre}`]: true,
        [hashId.value]: true,
        [`${pre}-loading`]: loading,
        [`${pre}-bordered`]: bordered,
        [`${pre}-hoverable`]: !!hoverable,
        [`${pre}-contain-grid`]: isContainGrid(children),
        [`${pre}-contain-tabs`]: tabList && tabList.length,
        [`${pre}-${size.value}`]: size.value,
        [`${pre}-type-${type}`]: !!type,
        [`${pre}-rtl`]: direction.value === 'rtl',
      }
      const loadingBlock = (
        <Skeleton loading active paragraph={{ rows: 4 }} title={false}>
          {children}
        </Skeleton>
      )

      const hasActiveTabKey = activeTabKey !== undefined
      const tabsProps = {
        size: 'large' as SizeType,
        [hasActiveTabKey ? 'activeKey' : 'defaultActiveKey']: hasActiveTabKey
          ? activeTabKey
          : defaultActiveTabKey,
        onChange: triggerTabChange,
        class: `${pre}-head-tabs`,
      }

      let head
      const tabs
        = tabList && tabList.length
          ? (
            <Tabs
              {...tabsProps}
              v-slots={{ rightExtra: tabBarExtraContent ? () => tabBarExtraContent : null }}
            >
              {tabList.map((item) => {
                const { tab: temp, slots: itemSlots } = item as CardTabListType
                const name = itemSlots?.tab
                warning(
                  !itemSlots,
                  'Card',
                  'tabList slots is deprecated, Please use `customTab` instead.',
                )
                let tab = temp !== undefined ? temp : slots[name] ? slots[name](item) : null
                tab = renderSlot(slots, 'customTab', item as any, () => [tab])
                return <TabPane tab={tab} key={item.key} disabled={item.disabled} />
              })}
            </Tabs>
            )
          : null
      if (title || extra || tabs) {
        head = (
          <div class={`${pre}-head`} style={headStyle}>
            <div class={`${pre}-head-wrapper`}>
              {title && <div class={`${pre}-head-title`}>{title}</div>}
              {extra && <div class={`${pre}-extra`}>{extra}</div>}
            </div>
            {tabs}
          </div>
        )
      }

      const coverDom = cover ? <div class={`${pre}-cover`}>{cover}</div> : null
      const body = (
        <div class={`${pre}-body`} style={bodyStyle}>
          {loading ? loadingBlock : children}
        </div>
      )
      const actionDom
        = actions && actions.length ? <ul class={`${pre}-actions`}>{getAction(actions)}</ul> : null

      return wrapSSR(
        <div ref="cardContainerRef" {...attrs} class={[classString, attrs.class]}>
          {head}
          {coverDom}
          {children && children.length ? body : null}
          {actionDom}
        </div>,
      )
    }
  },
})
