import { computed, defineComponent, ref, watch } from 'vue'
import { classNames } from '@antdv/utils'
import Pagination from '../../pagination'
import ListItem from './ListItem'
import { transferListBodyProps } from './props'
import type { TransferItem } from './interface'

function parsePagination(pagination) {
  if (!pagination)
    return null

  const defaultPagination = {
    pageSize: 10,
    simple: true,
    showSizeChanger: false,
    showLessItems: false,
  }

  if (typeof pagination === 'object') {
    return {
      ...defaultPagination,
      ...pagination,
    }
  }

  return defaultPagination
}

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ListBody',
  inheritAttrs: false,
  props: transferListBodyProps(),
  emits: ['itemSelect', 'itemRemove', 'scroll'],
  setup(props, { emit, expose }) {
    const current = ref(1)

    const handleItemSelect = (item: TransferItem) => {
      const { selectedKeys } = props
      const checked = selectedKeys.includes(item.key)
      emit('itemSelect', item.key, !checked)
    }

    const handleItemRemove = (item: TransferItem) => {
      emit('itemRemove', [item.key])
    }

    const handleScroll = (e: Event) => {
      emit('scroll', e)
    }

    const mergedPagination = computed(() => parsePagination(props.pagination))

    watch(
      [mergedPagination, () => props.filteredRenderItems],
      () => {
        if (mergedPagination.value) {
          // Calculate the page number
          const maxPageCount = Math.ceil(
            props.filteredRenderItems.length / mergedPagination.value.pageSize,
          )
          current.value = Math.min(current.value, maxPageCount)
        }
      },
      { immediate: true },
    )
    const items = computed(() => {
      const { filteredRenderItems } = props

      let displayItems = filteredRenderItems

      if (mergedPagination.value) {
        displayItems = filteredRenderItems.slice(
          (current.value - 1) * mergedPagination.value.pageSize,
          current.value * mergedPagination.value.pageSize,
        )
      }

      return displayItems
    })

    const onPageChange = (cur: number) => {
      current.value = cur
    }

    expose({ items })

    return () => {
      const {
        prefixCls,
        filteredRenderItems,
        selectedKeys,
        disabled: globalDisabled,
        showRemove,
      } = props

      let paginationNode = null

      if (mergedPagination.value) {
        paginationNode = (
          <Pagination
            simple={mergedPagination.value.simple}
            showSizeChanger={mergedPagination.value.showSizeChanger}
            showLessItems={mergedPagination.value.showLessItems}
            size="small"
            disabled={globalDisabled}
            class={`${prefixCls}-pagination`}
            total={filteredRenderItems.length}
            pageSize={mergedPagination.value.pageSize}
            current={current.value}
            onChange={onPageChange}
          />
        )
      }

      const itemsList = items.value.map(({ renderedEl, renderedText, item }: any) => {
        const { disabled } = item
        const checked = selectedKeys.includes(item.key)

        return (
          <ListItem
            disabled={globalDisabled || disabled}
            key={item.key}
            item={item}
            renderedText={renderedText}
            renderedEl={renderedEl}
            checked={checked}
            prefixCls={prefixCls}
            onClick={handleItemSelect}
            onRemove={handleItemRemove}
            showRemove={showRemove}
          />
        )
      })
      return (
        <>
          <ul
            class={classNames(`${prefixCls}-content`, {
              [`${prefixCls}-content-show-remove`]: showRemove,
            })}
            onScroll={handleScroll}
          >
            {itemsList}
          </ul>
          {paginationNode}
        </>
      )
    }
  },
})
