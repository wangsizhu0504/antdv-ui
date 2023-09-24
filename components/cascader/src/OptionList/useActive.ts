import { watch } from 'vue'
import { useInjectCascader } from '../context'
import { useBaseProps } from '../../../_internal/select'
import { useState } from '../../../hooks'
import type { Key } from '../../../_utils/types'
import type { Ref } from 'vue'

/**
 * Control the active open options path.
 */
export default (): [Ref<Key[]>, (activeValueCells: Key[]) => void] => {
  const baseProps = useBaseProps()
  const { values } = useInjectCascader()

  // Record current dropdown active options
  // This also control the open status
  const [activeValueCells, setActiveValueCells] = useState<Key[]>([])

  watch(
    () => baseProps.open,
    () => {
      if (baseProps.open && !baseProps.multiple) {
        const firstValueCells = values.value[0]
        setActiveValueCells(firstValueCells || [])
      }
    },
    { immediate: true },
  )

  return [activeValueCells, setActiveValueCells]
}
