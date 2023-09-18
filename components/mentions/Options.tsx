import { defineComponent } from 'vue'
import { vcMentionOptionOptions, vcMentionOptionProps } from '../vc-mentions'

/* istanbul ignore next */
export default defineComponent({
  compatConfig: { MODE: 3 },
  ...vcMentionOptionOptions,
  name: 'AMentionsOption',
  props: vcMentionOptionProps,
})
