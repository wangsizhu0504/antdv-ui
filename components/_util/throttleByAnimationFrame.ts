import raf from './raf'

type throttledFn = (...args: any[]) => void
type ReturnThrottledFn = throttledFn & throttledCancelFn

interface throttledCancelFn {
  cancel: () => void
}

function throttleByAnimationFrame<T extends any[]>(fn: (...args: T) => void): ReturnThrottledFn {
  let requestId: number | null

  const later = (args: T) => () => {
    requestId = null
    fn(...args)
  }

  const throttled = (...args: T) => {
    if (requestId == null)
      requestId = raf(later(args))
  }

  throttled.cancel = () => {
    raf.cancel(requestId!)
    requestId = null
  }

  return throttled as ReturnThrottledFn
}

export default throttleByAnimationFrame
