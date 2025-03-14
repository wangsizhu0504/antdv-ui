// CSSINJS
import type { CheckboxOptionType } from './interface';
import { computed, defineComponent, provide, ref, watch } from 'vue';
import useConfigInject from '../../config-provider/src/hooks/useConfigInject';
import { useInjectFormItemContext } from '../../form/src/FormItemContext';
import useStyle from '../style';
import Checkbox from './Checkbox';
import { CheckboxGroupContextKey } from './interface';

import { checkboxGroupProps } from './props';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ACheckboxGroup',
  inheritAttrs: false,
  props: checkboxGroupProps(),
  // emits: ['change', 'update:value'],
  setup(props, { slots, attrs, emit, expose }) {
    const formItemContext = useInjectFormItemContext();
    const { prefixCls, direction } = useConfigInject('checkbox', props);
    const groupPrefixCls = computed(() => `${prefixCls.value}-group`);

    // style
    const [wrapSSR, hashId] = useStyle(groupPrefixCls);

    const mergedValue = ref((props.value === undefined ? props.defaultValue : props.value) || []);
    watch(
      () => props.value,
      () => {
        mergedValue.value = props.value || [];
      },
    );
    const options = computed(() => {
      return props.options.map((option) => {
        if (typeof option === 'string' || typeof option === 'number') {
          return {
            label: option,
            value: option,
          };
        }
        return option;
      });
    });
    const triggerUpdate = ref(Symbol('TriggerUpdateKey'));
    const registeredValuesMap = ref(new Map<symbol, string>());
    const cancelValue = (id: symbol) => {
      registeredValuesMap.value.delete(id);
      triggerUpdate.value = Symbol('TriggerUpdateCancelKey');
    };
    const registerValue = (id: symbol, value: string) => {
      registeredValuesMap.value.set(id, value);
      triggerUpdate.value = Symbol('TriggerUpdateRegisterKey');
    };

    const registeredValues = ref(new Map());
    watch(triggerUpdate, () => {
      const valuseMap = new Map();
      for (const value of registeredValuesMap.value.values())
        valuseMap.set(value, true);

      registeredValues.value = valuseMap;
    });

    const toggleOption = (option: CheckboxOptionType) => {
      const optionIndex = mergedValue.value.indexOf(option.value);
      const value = [...mergedValue.value];
      if (optionIndex === -1)
        value.push(option.value);
      else
        value.splice(optionIndex, 1);

      if (props.value === undefined)
        mergedValue.value = value;

      const val = value
        .filter(v => registeredValues.value.has(v))
        .sort((a, b) => {
          const indexA = options.value.findIndex(opt => opt.value === a);
          const indexB = options.value.findIndex(opt => opt.value === b);
          return indexA - indexB;
        });
      emit('update:value', val);
      emit('change', val);
      formItemContext.onFieldChange();
    };
    provide(CheckboxGroupContextKey, {
      cancelValue,
      registerValue,
      toggleOption,
      mergedValue,
      name: computed(() => props.name),
      disabled: computed(() => props.disabled),
    });
    expose({
      mergedValue,
    });
    return () => {
      const { id = formItemContext.id.value } = props;
      let children = null;
      if (options.value && options.value.length > 0) {
        children = options.value.map(option => (
          <Checkbox
            prefixCls={prefixCls.value}
            key={option.value.toString()}
            disabled={'disabled' in option ? option.disabled : props.disabled}
            indeterminate={option.indeterminate}
            value={option.value}
            checked={mergedValue.value.includes(option.value)}
            onChange={option.onChange}
            class={`${groupPrefixCls.value}-item`}
          >
            {slots.label !== undefined ? slots.label?.(option) : option.label}
          </Checkbox>
        ));
      }
      return wrapSSR(
        <div
          {...attrs}
          class={[
            groupPrefixCls.value,
            { [`${groupPrefixCls.value}-rtl`]: direction.value === 'rtl' },
            attrs.class,
            hashId.value,
          ]}
          id={id}
        >
          {children || slots.default?.()}
        </div>,
      );
    };
  },
});
