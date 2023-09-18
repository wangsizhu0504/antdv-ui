import { defineComponent } from 'vue'
import { vcMentionOptionProps } from './props'

export const vcMentionOptionOptions = {
  name: 'Option',
  props: vcMentionOptionProps,
  render(_props: any, { slots }: any) {
    return slots.default?.()
  },
}
export default defineComponent({
  compatConfig: { MODE: 3 },
  ...vcMentionOptionOptions,
})
