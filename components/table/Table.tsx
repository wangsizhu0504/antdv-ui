import { defineComponent, ref } from 'vue'
import { initDefaultProps } from '../_util/props-util'
import InternalTable from './InternalTable'
import { convertChildrenToColumns } from './util'

import { tableProps } from './props'
import type { ColumnType } from './types'
import type { RenderExpandIconProps } from '../vc-table/interface'
import type { SlotsType } from 'vue'

// CSSINJS

export default defineComponent({
  name: 'ATable',
  inheritAttrs: false,
  props: initDefaultProps(tableProps(), {
    rowKey: 'key',
  }),
  slots: Object as SlotsType<{
    emptyText?: any
    expandIcon?: RenderExpandIconProps<any>
    title?: any
    footer?: any
    summary?: any
    expandedRowRender?: any
    expandColumnTitle?: any
    bodyCell?: {
      text: any
      value: any
      record: Record<string, any>
      index: number
      column: ColumnType
    }
    headerCell?: {
      title: any
      column: ColumnType
    }
    customFilterIcon?: any
    customFilterDropdown?: any
    default: any
  }>,
  setup(props, { attrs, slots, expose }) {
    const table = ref()
    expose({
      table,
    })
    return () => {
      const columns = props.columns || convertChildrenToColumns(slots.default?.())
      return (
        <InternalTable
          ref={table}
          {...attrs}
          {...props}
          columns={columns || []}
          expandedRowRender={slots.expandedRowRender || props.expandedRowRender}
          contextSlots={{ ...slots }} // use new object, 否则slot热更新失效，原因需进一步探究
          v-slots={slots}
        />
      )
    }
  },
})
