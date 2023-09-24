import { defineComponent } from 'vue'
import { mentionOptionProps } from './props'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AMentionsOption',
  props: mentionOptionProps,
  render(_props: any, { slots }: any) {
    return slots.default?.()
  },
})
