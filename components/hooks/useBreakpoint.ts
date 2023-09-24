import { onMounted, onUnmounted, shallowRef } from 'vue'
import { useResponsiveObserver } from './useResponsiveObserver'
import type { ScreenMap } from '../_utils/types'
import type { Ref } from 'vue'

export function useBreakpoint(): Ref<ScreenMap> {
  const screens = shallowRef<ScreenMap>({})
  let token = null
  const responsiveObserve = useResponsiveObserver()

  onMounted(() => {
    token = responsiveObserve.value.subscribe((supportScreens: ScreenMap) => {
      screens.value = supportScreens
    })
  })

  onUnmounted(() => {
    responsiveObserve.value.unsubscribe(token)
  })

  return screens
}
