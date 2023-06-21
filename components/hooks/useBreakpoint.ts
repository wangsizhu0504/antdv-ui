import type { Ref } from 'vue'
import { onMounted, onUnmounted, shallowRef } from 'vue'
import type { ScreenMap } from '../_util/responsiveObserve'
import useResponsiveObserve from '../_util/responsiveObserve'

export function useBreakpoint(): Ref<ScreenMap> {
  const screens = shallowRef<ScreenMap>({})
  let token = null
  const responsiveObserve = useResponsiveObserve()

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
