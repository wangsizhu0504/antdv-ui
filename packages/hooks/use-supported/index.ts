import { shallowRef } from 'vue'
import { tryOnMounted } from '../try-on-mounted'

export function useSupported(callback: () => unknown, sync = false) {
  const isSupported = shallowRef<boolean>()

  const update = () => (isSupported.value = Boolean(callback()))

  update()

  tryOnMounted(update, sync)
  return isSupported
}
