import { defineComponent } from 'vue'
import type { ColumnProps } from './types'
import type { CustomSlotsType } from '../_util/type'

export default defineComponent<ColumnProps>({
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
