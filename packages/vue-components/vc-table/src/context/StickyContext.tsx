import { onMounted, shallowRef } from 'vue'
import { isStyleSupport } from '@antdv/utils'

const supportSticky = shallowRef(false)
export function useProvideSticky() {
  onMounted(() => {
    supportSticky.value = supportSticky.value || isStyleSupport('position', 'sticky')
  })
}

export function useInjectSticky() {
  return supportSticky
}
