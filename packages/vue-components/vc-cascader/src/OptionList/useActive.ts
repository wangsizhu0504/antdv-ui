import type { Key } from '@antdv/types';
import type { Ref } from 'vue';
import { useState } from '@antdv/hooks';
import { watch } from 'vue';
import useBaseProps from '../../../vc-select/src/hooks/useBaseProps';
import { useInjectCascader } from '../context';

/**
 * Control the active open options path.
 */
export default (): [Ref<Key[]>, (activeValueCells: Key[]) => void] => {
  const baseProps = useBaseProps();
  const { values } = useInjectCascader();

  // Record current dropdown active options
  // This also control the open status
  const [activeValueCells, setActiveValueCells] = useState<Key[]>([]);

  watch(
    () => baseProps.open,
    () => {
      if (baseProps.open && !baseProps.multiple) {
        const firstValueCells = values.value[0];
        setActiveValueCells(firstValueCells || []);
      }
    },
    { immediate: true },
  );

  return [activeValueCells, setActiveValueCells];
};
