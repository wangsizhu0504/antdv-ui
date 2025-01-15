import { VcStep, VcStepProps } from '@antdv/vue-components';
import { defineComponent } from 'vue';

export default defineComponent({
  compatConfig: { MODE: 3 },
  ...(VcStep as any),
  name: 'AStep',
  props: VcStepProps(),
});
