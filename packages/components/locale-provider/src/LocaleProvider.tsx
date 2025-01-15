import { ANT_MARK } from '@antdv/constants';
import { devWarning } from '@antdv/utils';
import { defineComponent, provide, reactive, watch } from 'vue';
import { changeConfirmLocale } from '../../modal/src/locale';

import { localeProviderProps } from './props';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ALocaleProvider',
  props: localeProviderProps(),
  setup(props, { slots }) {
    devWarning(
      props.ANT_MARK__ === ANT_MARK,
      'LocaleProvider',
      '`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead',
    );
    const state = reactive({
      antLocale: {
        ...props.locale,
        exist: true,
      },
      ANT_MARK__: ANT_MARK,
    });
    provide('localeData', state);
    watch(
      () => props.locale,
      (locale) => {
        changeConfirmLocale(locale && locale.Modal);
        state.antLocale = {
          ...locale,
          exist: true,
        } as any;
      },
      { immediate: true },
    );

    return () => {
      return slots.default?.();
    };
  },
});
