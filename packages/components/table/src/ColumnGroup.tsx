import type { CustomSlotsType } from '@antdv/types';
import type { ColumnGroupProps } from '@antdv/vue-components/vc-table/src/sugar/ColumnGroup';
import { defineComponent } from 'vue';

export default defineComponent<ColumnGroupProps<any>>({
  name: 'ATableColumnGroup',
  slots: Object as CustomSlotsType<{
    title?: any
    default?: any
  }>,
  __ANT_TABLE_COLUMN_GROUP: true,
  render() {
    return null;
  },
});
