import { supportsPassive } from '../supportsPassive'

export function addEventListenerWrap(target: any, eventType: string, cb: Function, option?: any) {
  if (target && target.addEventListener) {
    let opt = option
    if (
      opt === undefined
      && supportsPassive
      && (eventType === 'touchstart' || eventType === 'touchmove' || eventType === 'wheel')
    )
      opt = { passive: false }

    target.addEventListener(eventType, cb, opt)
  }
  return {
    remove: () => {
      if (target && target.removeEventListener)
        target.removeEventListener(eventType, cb)
    },
  }
}
