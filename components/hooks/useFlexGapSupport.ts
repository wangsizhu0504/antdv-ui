import { onMounted, shallowRef } from 'vue'
import { detectFlexGapSupported } from '../_util/styleChecker'

export const useFlexGapSupport = () => {
  const flexible = shallowRef(false)
  onMounted(() => {
    flexible.value = detectFlexGapSupported()
  })

  return flexible
}
