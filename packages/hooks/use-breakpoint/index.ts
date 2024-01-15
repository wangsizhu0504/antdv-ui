import type { Ref } from 'vue'
import { onMounted, onUnmounted, shallowRef } from 'vue'
import type { ScreenMap } from '@antdv/types'
import { useResponsiveObserver } from '../use-responsive-observe'

export function useBreakpoint(): Ref<ScreenMap> {
  const screens = shallowRef<ScreenMap>({})
  let token = null
  const responsiveObserve = useResponsiveObserver()

  onMounted(() => {
    token = responsiveObserve.value.subscribe((supportScreens) => {
      screens.value = supportScreens
    })
  })

  onUnmounted(() => {
    responsiveObserve.value.unsubscribe(token)
  })

  return screens
}
