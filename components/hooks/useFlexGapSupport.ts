import { onMounted, shallowRef } from 'vue'
import { detectFlexGapSupported } from '../_utils/style'

export const useFlexGapSupport = () => {
  const flexible = shallowRef(false)
  onMounted(() => {
    flexible.value = detectFlexGapSupported()
  })

  return flexible
}
