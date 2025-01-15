import { defineComponent } from 'vue';
import { descriptionsItemProp } from './props';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ADescriptionsItem',
  props: descriptionsItemProp(),
  setup(_, { slots }) {
    return () => slots.default?.();
  },
});
