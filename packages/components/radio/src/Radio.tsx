import type { RadioChangeEvent } from './interface';
import type { RadioProps } from './props';
import { classNames, omit } from '@antdv/utils';
import { VcCheckbox } from '@antdv/vue-components';
import { computed, defineComponent, ref } from 'vue';
import { useInjectDisabled } from '../../config-provider';
import useConfigInject from '../../config-provider/src/hooks/useConfigInject';
import { FormItemInputContext, useInjectFormItemContext } from '../../form/src/FormItemContext';
import useStyle from '../style';
import { useInjectRadioGroupContext, useInjectRadioOptionTypeContext } from './context';
import { radioProps } from './props';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ARadio',
  inheritAttrs: false,
  props: radioProps(),
  setup(props, { emit, expose, slots, attrs }) {
    const formItemContext = useInjectFormItemContext();
    const formItemInputContext = FormItemInputContext.useInject();
    const radioOptionTypeContext = useInjectRadioOptionTypeContext();
    const radioGroupContext = useInjectRadioGroupContext();
    const vcCheckbox = ref<HTMLElement>();

    const { prefixCls: radioPrefixCls, direction, disabled } = useConfigInject('radio', props);
    const disabledContext = useInjectDisabled();
    const mergedDisabled = computed(() => disabled.value ?? disabledContext.value);

    const prefixCls = computed(() =>
      (radioGroupContext?.optionType.value === 'button' || radioOptionTypeContext === 'button')
        ? `${radioPrefixCls.value}-button`
        : radioPrefixCls.value,
    );
    const contextDisabled = useInjectDisabled();

    // Style
    const [wrapSSR, hashId] = useStyle(radioPrefixCls);

    const focus = () => {
      vcCheckbox.value.focus();
    };

    const blur = () => {
      vcCheckbox.value.blur();
    };

    expose({ focus, blur });

    const handleChange = (event: RadioChangeEvent) => {
      const targetChecked = event.target.checked;
      emit('update:checked', targetChecked);
      emit('update:value', targetChecked);
      emit('change', event);
      formItemContext.onFieldChange();
    };

    const onChange = (e: RadioChangeEvent) => {
      emit('change', e);
      if (radioGroupContext && radioGroupContext.onChange)
        radioGroupContext.onChange(e);
    };

    return () => {
      const radioGroup = radioGroupContext;
      const { prefixCls: customizePrefixCls, id = formItemContext.id.value, ...restProps } = props;

      const rProps: RadioProps = {
        prefixCls: prefixCls.value,
        id,
        ...omit(restProps, ['onUpdate:checked', 'onUpdate:value']),
        disabled: disabled.value ?? contextDisabled.value,
      };

      if (radioGroup) {
        rProps.name = radioGroup.name.value;
        rProps.onChange = onChange;
        rProps.checked = props.value === radioGroup.value.value;
        rProps.disabled = mergedDisabled.value || radioGroup.disabled.value;
      } else {
        rProps.onChange = handleChange;
      }
      const wrapperClassString = classNames(
        {
          [`${prefixCls.value}-wrapper`]: true,
          [`${prefixCls.value}-wrapper-checked`]: rProps.checked,
          [`${prefixCls.value}-wrapper-disabled`]: rProps.disabled,
          [`${prefixCls.value}-wrapper-rtl`]: direction.value === 'rtl',
          [`${prefixCls.value}-wrapper-in-form-item`]: formItemInputContext.isFormItemInput,
        },
        attrs.class,
        hashId.value,
      );

      return wrapSSR(
        <label {...attrs} class={wrapperClassString}>
          <VcCheckbox {...rProps} type="radio" ref={vcCheckbox} />
          {slots.default && <span>{slots.default()}</span>}
        </label>,
      );
    };
  },
});
