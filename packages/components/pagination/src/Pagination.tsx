import { computed, defineComponent, toRef } from 'vue'
import { DoubleLeftOutlined, DoubleRightOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
import { classNames } from '@antdv/utils'
import { enUS } from '@antdv/locale'
import { VcPagination } from '@antdv/vue-components'
import useBreakpoint from '../../base/useBreakpoint'
import useConfigInject from '../../config-provider/src/hooks/useConfigInject'
import { useLocaleReceiver } from '../../locale-provider'
import useStyle from '../style'
import { paginationProps } from './props'
import { MiddleSelect, MiniSelect } from './Select'

// CSSINJS

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

      const isSmall = size.value === 'small' || !!(breakpoint.value?.xs && !size.value && responsive)

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
