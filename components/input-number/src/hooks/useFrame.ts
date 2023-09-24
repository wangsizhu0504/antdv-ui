import { onBeforeUnmount, shallowRef } from 'vue'
import { wrapperRaf } from '../../../_utils/vue'

/**
 * Always trigger latest once when call multiple time
 */
export default () => {
  const idRef = shallowRef(0)

  const cleanUp = () => {
    wrapperRaf.cancel(idRef.value)
  }

  onBeforeUnmount(() => {
    cleanUp()
  })

  return (callback: () => void) => {
    cleanUp()

    idRef.value = wrapperRaf(() => {
      callback()
    })
  }
}
