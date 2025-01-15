import type { ComputedRef, CSSProperties, Ref } from 'vue'
import type { StretchType } from '../interface'
import { computed, shallowRef } from 'vue'

export default (
  stretch?: Ref<StretchType>,
): [ComputedRef<CSSProperties>, (element: HTMLElement) => void] => {
  const targetSize = shallowRef({ width: 0, height: 0 })

  function measureStretch(element: HTMLElement) {
    targetSize.value = {
      width: element.offsetWidth,
      height: element.offsetHeight,
    }
  }

  // Merge stretch style
  const style = computed(() => {
    const sizeStyle: CSSProperties = {}

    if (stretch.value) {
      const { width, height } = targetSize.value

      // Stretch with target
      if (stretch.value.includes('height') && height)
        sizeStyle.height = `${height}px`
      else if (stretch.value.includes('minHeight') && height)
        sizeStyle.minHeight = `${height}px`

      if (stretch.value.includes('width') && width)
        sizeStyle.width = `${width}px`
      else if (stretch.value.includes('minWidth') && width)
        sizeStyle.minWidth = `${width}px`
    }

    return sizeStyle
  })

  return [style, measureStretch]
}
