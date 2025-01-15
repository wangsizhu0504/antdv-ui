import { isStyleSupport } from '@antdv/utils'
import { onMounted, shallowRef } from 'vue'

const supportSticky = shallowRef(false)
export function useProvideSticky() {
  onMounted(() => {
    supportSticky.value = supportSticky.value || isStyleSupport('position', 'sticky')
  })
}

export function useInjectSticky() {
  return supportSticky
}
