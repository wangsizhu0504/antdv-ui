import { computed } from 'vue'
import type { GlobalToken } from '@antdv/theme'
import { useToken } from '@antdv/theme'
import type { BreakpointMap, ScreenMap } from '@antdv/types'

type SubscribeFunc = (screens: ScreenMap) => void
function getResponsiveMap(token: GlobalToken): BreakpointMap {
  return {
    xs: `(max-width: ${token.screenXSMax}px)`,
    sm: `(min-width: ${token.screenSM}px)`,
    md: `(min-width: ${token.screenMD}px)`,
    lg: `(min-width: ${token.screenLG}px)`,
    xl: `(min-width: ${token.screenXL}px)`,
    xxl: `(min-width: ${token.screenXXL}px)`,
    xxxl: `{min-width: ${token.screenXXXL}px}`,
  }
}

export function useResponsiveObserver() {
  const [, token] = useToken()

  return computed(() => {
    const responsiveMap: BreakpointMap = getResponsiveMap(token.value)
    const subscribers = new Map<Number, SubscribeFunc>()
    let subUid = -1
    let screens = {}

    return {
      matchHandlers: {} as {
        [prop: string]: {
          mql: MediaQueryList;
          listener: ((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null;
        };
      },
      dispatch(pointMap: ScreenMap) {
        screens = pointMap
        subscribers.forEach(func => func(screens))
        return subscribers.size >= 1
      },
      subscribe(func: SubscribeFunc): number {
        if (!subscribers.size) this.register()
        subUid += 1
        subscribers.set(subUid, func)
        func(screens)
        return subUid
      },
      unsubscribe(paramToken: number) {
        subscribers.delete(paramToken)
        if (!subscribers.size) this.unregister()
      },
      unregister() {
        Object.keys(responsiveMap).forEach((screen: string) => {
          const matchMediaQuery = responsiveMap[screen]
          const handler = this.matchHandlers[matchMediaQuery]
          handler?.mql.removeListener(handler?.listener)
        })
        subscribers.clear()
      },
      register() {
        Object.keys(responsiveMap).forEach((screen: string) => {
          const matchMediaQuery = responsiveMap[screen]
          const listener = ({ matches }: { matches: boolean }) => {
            this.dispatch({
              ...screens,
              [screen]: matches,
            })
          }
          const mql = window.matchMedia(matchMediaQuery)
          mql.addListener(listener)
          this.matchHandlers[matchMediaQuery] = {
            mql,
            listener,
          }

          listener(mql)
        })
      },
      responsiveMap,
    }
  })
}
