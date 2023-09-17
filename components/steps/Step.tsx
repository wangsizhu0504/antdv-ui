import { defineComponent } from 'vue'
import { Step as VcStep } from '../vc-steps'
import { VcStepProps } from '../vc-steps/Step'

/* istanbul ignore next */
export default defineComponent({
  compatConfig: { MODE: 3 },
  ...(VcStep as any),
  name: 'AStep',
  props: VcStepProps(),
})
