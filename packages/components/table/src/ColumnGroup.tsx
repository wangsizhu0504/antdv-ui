import { defineComponent } from 'vue'
import type { CustomSlotsType } from '@antdv/types'
import type { ColumnGroupProps } from '@antdv/vue-components/vc-table/src/sugar/ColumnGroup'

export default defineComponent<ColumnGroupProps<any>>({
  name: 'ATableColumnGroup',
  slots: Object as CustomSlotsType<{
    title?: any
    default?: any
  }>,
  __ANT_TABLE_COLUMN_GROUP: true,
  render() {
    return null
  },
})
