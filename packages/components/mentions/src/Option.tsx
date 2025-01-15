import { optionOptions, optionProps } from '@antdv/vue-components/vc-mentions/src/Option';
import { defineComponent } from 'vue';

/* istanbul ignore next */
export default defineComponent({
  compatConfig: { MODE: 3 },
  ...optionOptions,
  name: 'AMentionsOption',
  props: optionProps,
});
