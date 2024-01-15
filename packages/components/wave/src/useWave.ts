import type { ComponentInternalInstance, ComputedRef, Ref } from 'vue'
import { findDOMNode } from '@antdv/utils'
import showWaveEffect from './WaveEffect'

export default function useWave(
  instance: ComponentInternalInstance | null,
  className: Ref<string>,
  wave?: ComputedRef<{ disabled?: boolean }>,
): VoidFunction {
  function showWave() {
    const node = findDOMNode(instance)
    if (wave?.value?.disabled || !node)
      return

    showWaveEffect(node, className.value)
  }

  return showWave
}
