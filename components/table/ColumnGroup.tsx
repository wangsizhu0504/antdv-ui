import { defineComponent } from 'vue'
import type { SlotsType } from 'vue'
import type { ColumnGroupProps } from '../vc-table/sugar/ColumnGroup'

export default defineComponent<ColumnGroupProps<any>>({
  name: 'ATableColumnGroup',
  slots: Object as SlotsType<{
    title?: any
    default?: any
  }>,
  __ANT_TABLE_COLUMN_GROUP: true,
  render() {
    return null
  },
})
