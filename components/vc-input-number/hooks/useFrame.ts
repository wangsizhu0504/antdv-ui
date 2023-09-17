import { onBeforeUnmount, shallowRef } from 'vue'
import raf from '../../_util/raf'

/**
 * Always trigger latest once when call multiple time
 */
export default () => {
  const idRef = shallowRef(0)

  const cleanUp = () => {
    raf.cancel(idRef.value)
  }

  onBeforeUnmount(() => {
    cleanUp()
  })

  return (callback: () => void) => {
    cleanUp()

    idRef.value = raf(() => {
      callback()
    })
  }
}
