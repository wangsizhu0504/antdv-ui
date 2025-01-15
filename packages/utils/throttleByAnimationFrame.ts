import { raf } from './vue/raf';

type throttledFn = (...args: any[]) => void;

interface throttledCancelFn { cancel: () => void }

export function throttleByAnimationFrame<T extends any[]>(fn: (...args: T) => void) {
  let requestId: number | null;

  const later = (args: T) => () => {
    requestId = null;
    fn(...args);
  };

  const throttled: throttledFn & throttledCancelFn = (...args: T) => {
    if (requestId == null)
      requestId = raf(later(args));
  };

  throttled.cancel = () => {
    raf.cancel(requestId!);
    requestId = null;
  };

  return throttled;
}
