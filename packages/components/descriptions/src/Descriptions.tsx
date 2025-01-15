import type { Breakpoint, CustomSlotsType, ScreenMap } from '@antdv/types'
import type { VNode } from 'vue'
import type { DescriptionsProps } from './props'
import { responsiveArray } from '@antdv/constants'
import { useResponsiveObserver } from '@antdv/hooks'
import { cloneElement, devWarning, flattenChildren } from '@antdv/utils'
import {
  computed,
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  ref,
  toRef,
} from 'vue'
import useConfigInject from '../../config-provider/src/hooks/useConfigInject'
import useStyle from '../style'
import { DEFAULT_COLUMN_MAP } from './constants'
import DescriptionsItem from './Item'
import { descriptionsProps } from './props'
import Row from './Row'
import { createProviderContext } from './useContext'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ADescriptions',
  inheritAttrs: false,
  props: descriptionsProps(),
  slots: Object as CustomSlotsType<{
    title?: any
    extra?: any
    default?: any
  }>,
  Item: DescriptionsItem,
  setup(props, { slots, attrs }) {
    const { prefixCls, direction } = useConfigInject('descriptions', props)
    let token: number
    const screens = ref<ScreenMap>({})

    const [wrapSSR, hashId] = useStyle(prefixCls)

    const responsiveObserve = useResponsiveObserver()

    onBeforeMount(() => {
      token = responsiveObserve.value.subscribe((screen) => {
        if (typeof props.column !== 'object')
          return

        screens.value = screen
      })
    })

    onBeforeUnmount(() => {
      responsiveObserve.value.unsubscribe(token)
    })
    createProviderContext({
      labelStyle: toRef(props, 'labelStyle'),
      contentStyle: toRef(props, 'contentStyle'),
    })
    function getColumn(column: DescriptionsProps['column'], _screens: ScreenMap): number {
      if (typeof column === 'number')
        return column

      if (typeof column === 'object') {
        for (let i = 0; i < responsiveArray.length; i++) {
          const breakpoint: Breakpoint = responsiveArray[i]
          if (_screens[breakpoint] && column[breakpoint] !== undefined)
            return column[breakpoint] || DEFAULT_COLUMN_MAP[breakpoint]
        }
      }

      return 3
    }

    function getFilledItem(node: VNode, rowRestCol: number, span?: number): VNode {
      let clone = node

      if (span === undefined || span > rowRestCol) {
        clone = cloneElement(node, {
          span: rowRestCol,
        })
        devWarning(
          span === undefined,
          'Descriptions',
          'Sum of column `span` in a line not match `column` of Descriptions.',
        )
      }

      return clone
    }
    const mergeColumn = computed(() => getColumn(props.column, screens.value))
    function getRows(children: VNode[], column: number) {
      const childNodes = flattenChildren(children)
      const rows: VNode[][] = []

      let tmpRow: VNode[] = []
      let rowRestCol = column
      childNodes.forEach((node, index) => {
        const span: number = node.props?.span
        const mergedSpan = span || 1

        // Additional handle last one
        if (index === childNodes.length - 1) {
          tmpRow.push(getFilledItem(node, rowRestCol, span))
          rows.push(tmpRow)
          return
        }

        if (mergedSpan < rowRestCol) {
          rowRestCol -= mergedSpan
          tmpRow.push(node)
        } else {
          tmpRow.push(getFilledItem(node, rowRestCol, mergedSpan))
          rows.push(tmpRow)
          rowRestCol = column
          tmpRow = []
        }
      })

      return rows
    }
    return () => {
      const {
        size,
        bordered = false,
        layout = 'horizontal',
        colon = true,
        title = slots.title?.(),
        extra = slots.extra?.(),
      } = props

      const children = slots.default?.()
      const rows = getRows(children, mergeColumn.value)

      return wrapSSR(
        <div
          {...attrs}
          class={[
            prefixCls.value,
            {
              [`${prefixCls.value}-${size}`]: size !== 'default',
              [`${prefixCls.value}-bordered`]: !!bordered,
              [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
            },
            attrs.class,
            hashId.value,
          ]}
        >
          {(title || extra) && (
            <div class={`${prefixCls.value}-header`}>
              {title && <div class={`${prefixCls.value}-title`}>{title}</div>}
              {extra && <div class={`${prefixCls.value}-extra`}>{extra}</div>}
            </div>
          )}
          <div class={`${prefixCls.value}-view`}>
            <table>
              <tbody>
                {rows.map((row, index) => {
                  return (
                    <Row
                      key={index}
                      index={index}
                      colon={colon}
                      prefixCls={prefixCls.value}
                      vertical={layout === 'vertical'}
                      bordered={bordered}
                      row={row}
                    />
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>,
      )
    }
  },
})
