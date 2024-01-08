import { onBeforeUnmount, shallowRef } from 'vue'

export function useDestroyed() {
  const destroyed = shallowRef(false)
  onBeforeUnmount(() => {
    destroyed.value = true
  })

  return destroyed
}
