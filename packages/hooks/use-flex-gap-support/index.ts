import { detectFlexGapSupported } from '@antdv/utils';
import { onMounted, shallowRef } from 'vue';

export function useFlexGapSupport() {
  const flexible = shallowRef(false);
  onMounted(() => {
    flexible.value = detectFlexGapSupported();
  });

  return flexible;
}
