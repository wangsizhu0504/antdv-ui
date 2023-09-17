import { computed, defineComponent, provide, ref, toRef, watch } from 'vue'
import classNames from '../_util/classNames'

import Spin from '../spin'
import Pagination from '../pagination'
import { Row } from '../grid'

import { flattenChildren } from '../_util/props-util'
import initDefaultProps from '../_util/props-util/initDefaultProps'

import { useBreakpoint, useConfigInject } from '../hooks'
import { responsiveArray } from '../_util/responsiveObserve'
import eagerComputed from '../_util/eagerComputed'
import { ListContextKey } from './contextKey'
import useStyle from './style'
import Item from './Item'
import { listProps } from './props'
import type { Breakpoint } from '../_util/responsiveObserve'
import type { CustomSlotsType, Key } from '../_util/type'
import type { PaginationConfig } from '../pagination'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AList',
  inheritAttrs: false,
  Item,
  props: initDefaultProps(listProps(), {
    dataSource: [],
    bordered: false,
    split: true,
    loading: false,
    pagination: false,
  }),
  slots: Object as CustomSlotsType<{
    extra: any
    loadMore: any
    renderItem: { item: any, index: number }
    header: any
    footer: any
    default: any
  }>,
  setup(props, { slots, attrs }) {
    provide(ListContextKey, {
      grid: toRef(props, 'grid'),
      itemLayout: toRef(props, 'itemLayout'),
    })
    const defaultPaginationProps = {
      current: 1,
      total: 0,
    }
    const { prefixCls, direction, renderEmpty } = useConfigInject('list', props)

    // Style
    const [wrapSSR, hashId] = useStyle(prefixCls)

    const paginationObj = computed(() =>
      props.pagination && typeof props.pagination === 'object' ? props.pagination : {},
    )
    const paginationCurrent = ref(paginationObj.value.defaultCurrent ?? 1)
    const paginationSize = ref(paginationObj.value.defaultPageSize ?? 10)
    watch(paginationObj, () => {
      if ('current' in paginationObj.value)
        paginationCurrent.value = paginationObj.value.current

      if ('pageSize' in paginationObj.value)
        paginationSize.value = paginationObj.value.pageSize
    })

    const listItemsKeys: Key[] = []

    const triggerPaginationEvent = (eventName: string) => (page: number, pageSize: number) => {
      paginationCurrent.value = page
      paginationSize.value = pageSize
      if (paginationObj.value[eventName])
        paginationObj.value[eventName](page, pageSize)
    }

    const onPaginationChange = triggerPaginationEvent('onChange')

    const onPaginationShowSizeChange = triggerPaginationEvent('onShowSizeChange')

    const loadingProp = computed(() => {
      if (typeof props.loading === 'boolean') {
        return {
          spinning: props.loading,
        }
      } else {
        return props.loading
      }
    })

    const isLoading = computed(() => loadingProp.value && loadingProp.value.spinning)

    const sizeCls = computed(() => {
      let size = ''
      switch (props.size) {
        case 'large':
          size = 'lg'
          break
        case 'small':
          size = 'sm'
          break
        default:
          break
      }
      return size
    })

    const classObj = computed(() => ({
      [`${prefixCls.value}`]: true,
      [`${prefixCls.value}-vertical`]: props.itemLayout === 'vertical',
      [`${prefixCls.value}-${sizeCls.value}`]: sizeCls.value,
      [`${prefixCls.value}-split`]: props.split,
      [`${prefixCls.value}-bordered`]: props.bordered,
      [`${prefixCls.value}-loading`]: isLoading.value,
      [`${prefixCls.value}-grid`]: !!props.grid,
      [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
    }))

    const paginationProps = computed(() => {
      const pp = {
        ...defaultPaginationProps,
        total: props.dataSource.length,
        current: paginationCurrent.value,
        pageSize: paginationSize.value,
        ...((props.pagination as PaginationConfig) || {}),
      }

      const largestPage = Math.ceil(pp.total / pp.pageSize)
      if (pp.current > largestPage)
        pp.current = largestPage

      return pp
    })

    const splitDataSource = computed(() => {
      let dd = [...props.dataSource]
      if (props.pagination) {
        if (
          props.dataSource.length
          > (paginationProps.value.current - 1) * paginationProps.value.pageSize
        ) {
          dd = [...props.dataSource].splice(
            (paginationProps.value.current - 1) * paginationProps.value.pageSize,
            paginationProps.value.pageSize,
          )
        }
      }
      return dd
    })

    const screens = useBreakpoint()

    const currentBreakpoint = eagerComputed(() => {
      for (let i = 0; i < responsiveArray.length; i += 1) {
        const breakpoint: Breakpoint = responsiveArray[i]
        if (screens.value[breakpoint])
          return breakpoint
      }
      return undefined
    })

    const colStyle = computed(() => {
      if (!props.grid)
        return undefined

      const columnCount
        = currentBreakpoint.value && props.grid[currentBreakpoint.value]
          ? props.grid[currentBreakpoint.value]
          : props.grid.column
      if (columnCount) {
        return {
          width: `${100 / columnCount}%`,
          maxWidth: `${100 / columnCount}%`,
        }
      }
      return undefined
    })

    const renderInnerItem = (item: any, index: number) => {
      const renderItem = props.renderItem ?? slots.renderItem
      if (!renderItem) return null

      let key
      const rowKeyType = typeof props.rowKey
      if (rowKeyType === 'function')
        key = (props.rowKey as any)(item)
      else if (rowKeyType === 'string' || rowKeyType === 'number')
        key = item[props.rowKey as any]
      else
        key = item.key

      if (!key)
        key = `list-item-${index}`

      listItemsKeys[index] = key

      return renderItem({ item, index })
    }

    return () => {
      const loadMore = props.loadMore ?? slots.loadMore?.()
      const footer = props.footer ?? slots.footer?.()
      const header = props.header ?? slots.header?.()
      const children = flattenChildren(slots.default?.())
      const isSomethingAfterLastItem = !!(loadMore || props.pagination || footer)
      const classString = classNames(
        {
          ...classObj.value,
          [`${prefixCls.value}-something-after-last-item`]: isSomethingAfterLastItem,
        },
        attrs.class,
        hashId.value,
      )
      const paginationContent = props.pagination
        ? (
        <div class={`${prefixCls.value}-pagination`}>
          <Pagination
            {...paginationProps.value}
            onChange={onPaginationChange}
            onShowSizeChange={onPaginationShowSizeChange}
          />
        </div>
          )
        : null

      let childrenContent = isLoading.value && <div style={{ minHeight: '53px' }} />
      if (splitDataSource.value.length > 0) {
        listItemsKeys.length = 0
        const items = splitDataSource.value.map((item: any, index: number) =>
          renderInnerItem(item, index),
        )
        const childrenList = items.map((child: any, index) => (
          <div key={listItemsKeys[index]} style={colStyle.value}>
            {child}
          </div>
        ))
        childrenContent = props.grid
          ? (
          <Row gutter={props.grid.gutter}>{childrenList}</Row>
            )
          : (
          <ul class={`${prefixCls.value}-items`}>{items}</ul>
            )
      } else if (!children.length && !isLoading.value) {
        childrenContent = (
          <div class={`${prefixCls.value}-empty-text`}>
            {props.locale?.emptyText || renderEmpty('List')}
          </div>
        )
      }

      const paginationPosition = paginationProps.value.position || 'bottom'
      return wrapSSR(
        <div {...attrs} class={classString}>
          {(paginationPosition === 'top' || paginationPosition === 'both') && paginationContent}
          {header && <div class={`${prefixCls.value}-header`}>{header}</div>}
          <Spin {...loadingProp.value}>
            {childrenContent}
            {children}
          </Spin>
          {footer && <div class={`${prefixCls.value}-footer`}>{footer}</div>}
          {loadMore
            || ((paginationPosition === 'bottom' || paginationPosition === 'both')
              && paginationContent)}
        </div>,
      )
    }
  },
})
