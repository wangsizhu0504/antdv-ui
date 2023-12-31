import { defineComponent } from 'vue'
import type { TableColumnProps } from './types'
import type { CustomSlotsType } from '../../_utils/types'

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
