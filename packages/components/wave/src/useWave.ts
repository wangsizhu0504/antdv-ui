import type { ComputedRef, Ref } from 'vue';
import { findDOMNode } from '@antdv/utils';
import { getCurrentInstance, onBeforeUnmount } from 'vue';
import showWaveEffect from './WaveEffect';

export default function useWave(
  className: Ref<string>,
  wave?: ComputedRef<{ disabled?: boolean }>,
): VoidFunction {
  const instance = getCurrentInstance();
  let stopWave: () => void;
  function showWave() {
    const node = findDOMNode(instance);
    stopWave?.();
    if (wave?.value?.disabled || !node) {
      return;
    }
    stopWave = showWaveEffect(node, className.value);
  }
  onBeforeUnmount(() => {
    stopWave?.();
  });
  return showWave;
}
