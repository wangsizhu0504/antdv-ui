import { onBeforeUnmount, shallowRef } from 'vue'

export const useDestroyed = () => {
  const destroyed = shallowRef(false)
  onBeforeUnmount(() => {
    destroyed.value = true
  })

  return destroyed
}
