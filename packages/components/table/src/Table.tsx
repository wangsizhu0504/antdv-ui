import type { RenderExpandIconProps } from '@antdv/vue-components/vc-table/src/interface'
import type { SlotsType } from 'vue'
import type { TableColumnType } from './interface'
import { initDefaultProps } from '@antdv/utils'
import { defineComponent, ref } from 'vue'

import InternalTable from './InternalTable'
import { tableProps } from './props'
import { convertChildrenToColumns } from './util'

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
    bodyCell?: (props: {
      text: any
      value: any
      record: Record<string, any>
      index: number
      column: TableColumnType
    }) => void,
    headerCell?: (props: { title: any; column: TableColumnType }) => void;
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
