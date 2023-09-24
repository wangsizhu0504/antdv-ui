import { findDOMNode } from '../../_utils/vue'
import showWaveEffect from './WaveEffect'
import type { ComponentInternalInstance, Ref } from 'vue'

export default function useWave(
  instance: ComponentInternalInstance | null,
  className: Ref<string>,
): VoidFunction {
  function showWave() {
    const node = findDOMNode(instance)

    showWaveEffect(node, className.value)
  }

  return showWave
}
