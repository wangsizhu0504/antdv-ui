import { findDOMNode } from '../../_utils/vue'
import showWaveEffect from './WaveEffect'
import type { ComponentInternalInstance, ComputedRef, Ref } from 'vue'

export default function useWave(
  instance: ComponentInternalInstance | null,
  className: Ref<string>,
  wave: ComputedRef<{ disabled?: boolean }>,
): VoidFunction {
  function showWave() {
    const node = findDOMNode(instance)
    if (wave.value?.disabled || !node)
      return

    showWaveEffect(node, className.value)
  }

  return showWave
}
