import { defineComponent } from 'vue'
import { optionOptions, optionProps } from '../vc-mentions/src/Option'

/* istanbul ignore next */
export default defineComponent({
  compatConfig: { MODE: 3 },
  ...optionOptions,
  name: 'AMentionsOption',
  props: optionProps,
})
