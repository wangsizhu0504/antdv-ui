import type { Ref, ShallowRef } from 'vue';
import type { BaseOptionType, DefaultOptionType, FieldNames, FilterFunc, SelectProps } from '../Select';
import { computed } from 'vue';
import { toArray } from '../utils/commonUtil';
import { injectPropsWithOption } from '../utils/valueUtil';

function includes(test: any, search: string) {
  return toArray(test).join('').toUpperCase().includes(search);
}

export default (
  options: ShallowRef<DefaultOptionType[]>,
  fieldNames: Ref<FieldNames>,
  searchValue?: Ref<string>,
  filterOption?: Ref<SelectProps['filterOption']>,
  optionFilterProp?: Ref<string>,
) =>
  computed(() => {
    const searchValueVal = searchValue.value;
    const optionFilterPropValue = optionFilterProp?.value;
    const filterOptionValue = filterOption?.value;
    if (!searchValueVal || filterOptionValue === false)
      return options.value;

    const { options: fieldOptions, label: fieldLabel, value: fieldValue } = fieldNames.value;
    const filteredOptions: DefaultOptionType[] = [];

    const customizeFilter = typeof filterOptionValue === 'function';

    const upperSearch = searchValueVal.toUpperCase();
    const filterFunc = customizeFilter
      ? (filterOptionValue as FilterFunc<BaseOptionType>)
      : (_: string, option: DefaultOptionType) => {
          // Use provided `optionFilterProp`
          if (optionFilterPropValue)
            return includes(option[optionFilterPropValue], upperSearch);

          // Auto select `label` or `value` by option type
          if (option[fieldOptions]) {
            // hack `fieldLabel` since `OptionGroup` children is not `label`
            return includes(option[fieldLabel !== 'children' ? fieldLabel : 'label'], upperSearch);
          }

          return includes(option[fieldValue], upperSearch);
        };

    const wrapOption: (opt: DefaultOptionType) => DefaultOptionType = customizeFilter
      ? opt => injectPropsWithOption(opt)
      : opt => opt;

    options.value.forEach((item) => {
      // Group should check child options
      if (item[fieldOptions]) {
        // Check group first
        const matchGroup = filterFunc(searchValueVal, wrapOption(item));
        if (matchGroup) {
          filteredOptions.push(item);
        } else {
          // Check option
          const subOptions = item[fieldOptions].filter((subItem: DefaultOptionType) =>
            filterFunc(searchValueVal, wrapOption(subItem)),
          );
          if (subOptions.length) {
            filteredOptions.push({
              ...item,
              [fieldOptions]: subOptions,
            });
          }
        }

        return;
      }

      if (filterFunc(searchValueVal, wrapOption(item)))
        filteredOptions.push(item);
    });
    return filteredOptions;
  });
