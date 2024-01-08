import { defineComponent, onMounted, ref } from 'vue'
import type { Key } from '@antdv/types'
import { ResizeObserver } from '@antdv/vue-components'

export interface MeasureCellProps {
  columnKey: Key
  onColumnResize: (key: Key, width: number) => void
}

export default defineComponent<MeasureCellProps>({
  name: 'MeasureCell',
  props: ['columnKey'] as any,
  setup(props, { emit }) {
    const tdRef = ref<HTMLTableCellElement>()
    onMounted(() => {
      if (tdRef.value)
        emit('columnResize', props.columnKey, tdRef.value.offsetWidth)
    })
    return () => {
      return (
        <ResizeObserver
          onResize={({ offsetWidth }) => {
            emit('columnResize', props.columnKey, offsetWidth)
          }}
        >
          <td ref={tdRef} style={{ padding: 0, border: 0, height: 0 }}>
            <div style={{ height: 0, overflow: 'hidden' }}>&nbsp;</div>
          </td>
        </ResizeObserver>
      )
    }
  },
})
