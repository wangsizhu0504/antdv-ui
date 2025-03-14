import type { TableLocale } from '@antdv/locale';
import type { FilterSearchType } from '../interface';
import { SearchOutlined } from '@ant-design/icons-vue';
import { functionType, objectType, someType, stringType } from '@antdv/utils';
import { defineComponent } from 'vue';

import Input from '../../../input';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'FilterSearch',
  inheritAttrs: false,
  props: {
    value: stringType(),
    onChange: functionType<(e: InputEvent) => void>(),
    filterSearch: someType<FilterSearchType>([Boolean, Function]),
    tablePrefixCls: stringType(),
    locale: objectType<TableLocale>(),
  },
  setup(props) {
    return () => {
      const { value, onChange, filterSearch, tablePrefixCls, locale } = props;
      if (!filterSearch)
        return null;

      return (
        <div class={`${tablePrefixCls}-filter-dropdown-search`}>
          <Input
            v-slots={{ prefix: () => <SearchOutlined /> }}
            placeholder={locale.filterSearchPlaceholder}
            onChange={onChange}
            value={value}
            // for skip min-width of input
            htmlSize={1}
            class={`${tablePrefixCls}-filter-dropdown-search-input`}
          />
        </div>
      );
    };
  },
});
