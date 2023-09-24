import { wrapperRaf } from './vue'

type throttledFn = (...args: any[]) => void
type ReturnThrottledFn = throttledFn & throttledCancelFn

interface throttledCancelFn {
  cancel: () => void
}

export function throttleByAnimationFrame<T extends any[]>(fn: (...args: T) => void): ReturnThrottledFn {
  let requestId: number | null

  const later = (args: T) => () => {
    requestId = null
    fn(...args)
  }

  const throttled = (...args: T) => {
    if (requestId == null)
      requestId = wrapperRaf(later(args))
  }

  throttled.cancel = () => {
    wrapperRaf.cancel(requestId!)
    requestId = null
  }

  return throttled as ReturnThrottledFn
}
