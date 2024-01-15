import { defineComponent } from 'vue'
import type { CustomSlotsType } from '@antdv/types'
import type { TableColumnProps } from './interface'

export default defineComponent<TableColumnProps>({
  name: 'ATableColumn',
  slots: Object as CustomSlotsType<{
    title?: any
    filterIcon?: any
    default?: any
  }>,

  render() {
    return null
  },
})
