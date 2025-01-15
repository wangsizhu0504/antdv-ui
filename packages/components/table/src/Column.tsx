import type { CustomSlotsType } from '@antdv/types';
import type { TableColumnProps } from './interface';
import { defineComponent } from 'vue';

export default defineComponent<TableColumnProps>({
  name: 'ATableColumn',
  slots: Object as CustomSlotsType<{
    title?: any
    filterIcon?: any
    default?: any
  }>,

  render() {
    return null;
  },
});
