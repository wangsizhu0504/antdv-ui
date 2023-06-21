import { defineComponent } from 'vue'
import type { SlotsType } from 'vue'
import type { ColumnType } from './interface'

export type ColumnProps<RecordType = unknown> = ColumnType<RecordType>
export default defineComponent<ColumnProps>({
  name: 'ATableColumn',
  slots: Object as SlotsType<{
    title?: any
    filterIcon?: any
    default?: any
  }>,

  render() {
    return null
  },
})
