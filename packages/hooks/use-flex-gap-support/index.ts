import { onMounted, shallowRef } from 'vue'
import { detectFlexGapSupported } from '@antdv/utils'

export function useFlexGapSupport() {
  const flexible = shallowRef(false)
  onMounted(() => {
    flexible.value = detectFlexGapSupported()
  })

  return flexible
}
