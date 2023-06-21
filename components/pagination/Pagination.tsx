import type { ExtractPropTypes } from 'vue'
import { computed, defineComponent, toRef } from 'vue'
import { DoubleLeftOutlined, DoubleRightOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
import enUS from '../locale/lang/en_US'
import { useLocaleReceiver } from '../locale-provider/LocaleReceiver'
import VcPagination from '../vc-pagination'
import classNames from '../_util/classNames'
import { useBreakpoint, useConfigInject } from '../hooks'
import { arrayType, booleanType, functionType, someType, stringType } from '../_util/type'
import useStyle from './style'
import MiniSelect, { MiddleSelect } from './Select'

// CSSINJS

export const paginationProps = () => ({
  'total': Number,
  'defaultCurrent': Number,
  'disabled': booleanType(),
  'current': Number,
  'defaultPageSize': Number,
  'pageSize': Number,
  'hideOnSinglePage': booleanType(),
  'showSizeChanger': booleanType(),
  'pageSizeOptions': arrayType<(string | number)[]>(),
  'buildOptionText': functionType<(opt: { value: any }) => any>(),
  'showQuickJumper': someType<boolean | { goButton?: any }>([Boolean, Object]),
  'showTotal': functionType<(total: number, range: [number, number]) => any>(),
  'size': stringType<'default' | 'small'>(),
  'simple': booleanType(),
  'locale': Object,
  'prefixCls': String,
  'selectPrefixCls': String,
  'totalBoundaryShowSizeChanger': Number,
  'selectComponentClass': String,
  'itemRender':
    functionType<
      (opt: {
        page: number
        type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next'
        originalElement: any
      }) => any
    >(),
  'role': String,
  'responsive': Boolean,
  'showLessItems': booleanType(),
  'onChange': functionType<(page: number, pageSize: number) => void>(),
  'onShowSizeChange': functionType<(current: number, size: number) => void>(),
  'onUpdate:current': functionType<(current: number) => void>(),
  'onUpdate:pageSize': functionType<(size: number) => void>(),
})

export type PaginationPosition = 'top' | 'bottom' | 'both'
export const paginationConfig = () => ({
  ...paginationProps(),
  position: stringType<PaginationPosition>(),
})

export type PaginationProps = Partial<ExtractPropTypes<ReturnType<typeof paginationProps>>>
export type PaginationConfig = Partial<ExtractPropTypes<ReturnType<typeof paginationConfig>>>

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'APagination',
  inheritAttrs: false,
  props: paginationProps(),
  // emits: ['change', 'showSizeChange', 'update:current', 'update:pageSize'],
  setup(props, { slots, attrs }) {
    const { prefixCls, configProvider, direction, size } = useConfigInject('pagination', props)

    // style
    const [wrapSSR, hashId] = useStyle(prefixCls)

    const selectPrefixCls = computed(() =>
      configProvider.getPrefixCls('select', props.selectPrefixCls),
    )
    const breakpoint = useBreakpoint()
    const [locale] = useLocaleReceiver('Pagination', enUS.Pagination, toRef(props, 'locale'))
    const getIconsProps = (pre: string) => {
      const ellipsis = <span class={`${pre}-item-ellipsis`}>•••</span>
      const prevIcon = (
        <button class={`${pre}-item-link`} type="button" tabindex={-1}>
          {direction.value === 'rtl' ? <RightOutlined /> : <LeftOutlined />}
        </button>
      )
      const nextIcon = (
        <button class={`${pre}-item-link`} type="button" tabindex={-1}>
          {direction.value === 'rtl' ? <LeftOutlined /> : <RightOutlined />}
        </button>
      )
      const jumpPrevIcon = (
        <a rel="nofollow" class={`${pre}-item-link`}>
          <div class={`${pre}-item-container`}>
            {direction.value === 'rtl'
              ? (
              <DoubleRightOutlined class={`${pre}-item-link-icon`} />
                )
              : (
              <DoubleLeftOutlined class={`${pre}-item-link-icon`} />
                )}
            {ellipsis}
          </div>
        </a>
      )
      const jumpNextIcon = (
        <a rel="nofollow" class={`${pre}-item-link`}>
          <div class={`${pre}-item-container`}>
            {direction.value === 'rtl'
              ? (
              <DoubleLeftOutlined class={`${pre}-item-link-icon`} />
                )
              : (
              <DoubleRightOutlined class={`${pre}-item-link-icon`} />
                )}
            {ellipsis}
          </div>
        </a>
      )
      return { prevIcon, nextIcon, jumpPrevIcon, jumpNextIcon }
    }

    return () => {
      const {
        itemRender = slots.itemRender,
        buildOptionText = slots.buildOptionText,
        selectComponentClass,
        responsive,
        ...restProps
      } = props

      const isSmall
        = size.value === 'small' || !!(breakpoint.value?.xs && !size.value && responsive)
      const paginationProps = {
        ...restProps,
        ...getIconsProps(prefixCls.value),
        prefixCls: prefixCls.value,
        selectPrefixCls: selectPrefixCls.value,
        selectComponentClass: selectComponentClass || (isSmall ? MiniSelect : MiddleSelect),
        locale: locale.value,
        buildOptionText,
        ...attrs,
        class: classNames(
          {
            [`${prefixCls.value}-mini`]: isSmall,
            [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
          },
          attrs.class,
          hashId.value,
        ),
        itemRender,
      }

      return wrapSSR(<VcPagination {...paginationProps} />)
    }
  },
})
