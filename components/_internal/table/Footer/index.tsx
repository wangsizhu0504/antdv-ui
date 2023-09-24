import { computed, defineComponent, reactive, toRef } from 'vue'
import { useProvideSummary } from '../context/SummaryContext'
import { useInjectTable } from '../context/TableContext'
import SummaryCell from './Cell'
import SummaryRow from './Row'
import Summary from './Summary'
import type { FlattenColumns } from '../context/SummaryContext'
import type { DefaultRecordType, StickyOffsets } from '../interface'

export interface FooterProps<RecordType = DefaultRecordType> {
  stickyOffsets: StickyOffsets
  flattenColumns: FlattenColumns<RecordType>
}

export default defineComponent<FooterProps>({
  name: 'TableFooter',
  inheritAttrs: false,
  props: ['stickyOffsets', 'flattenColumns'] as any,
  setup(props, { slots }) {
    const tableContext = useInjectTable()
    useProvideSummary(
      reactive({
        stickyOffsets: toRef(props, 'stickyOffsets'),
        flattenColumns: toRef(props, 'flattenColumns'),
        scrollColumnIndex: computed(() => {
          const lastColumnIndex = props.flattenColumns.length - 1
          const scrollColumn = props.flattenColumns[lastColumnIndex]
          return scrollColumn?.scrollbar ? lastColumnIndex : null
        }),
      }),
    )
    return () => {
      const { prefixCls } = tableContext
      return <tfoot class={`${prefixCls}-summary`}>{slots.default?.()}</tfoot>
    }
  },
})

export { SummaryRow, SummaryCell }
export const FooterComponents = Summary
