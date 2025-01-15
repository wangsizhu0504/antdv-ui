import type { Ref } from 'vue'
import { canUseDom, getScrollBarSize, removeCSS, updateCSS } from '@antdv/utils'
import { computed, watchEffect } from 'vue'

const UNIQUE_ID = `vc-util-locker-${Date.now()}`

let uuid = 0

/**
 * Test usage export. Do not use in your production
 */
export function isBodyOverflowing() {
  return (
    document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)
    && window.innerWidth > document.body.offsetWidth
  )
}

export function useScrollLocker(lock?: Ref<boolean>) {
  const mergedLock = computed(() => !!lock && !!lock.value)
  uuid += 1
  const id = `${UNIQUE_ID}_${uuid}`

  watchEffect(
    (onClear) => {
      if (!canUseDom())
        return

      if (mergedLock.value) {
        const scrollbarSize = getScrollBarSize()
        const isOverflow = isBodyOverflowing()

        updateCSS(
          `
html body {
  overflow-y: hidden;
  ${isOverflow ? `width: calc(100% - ${scrollbarSize}px);` : ''}
}`,
          id,
        )
      } else {
        removeCSS(id)
      }
      onClear(() => {
        removeCSS(id)
      })
    },
    { flush: 'post' },
  )
}
