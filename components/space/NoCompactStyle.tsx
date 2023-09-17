import { defineComponent } from 'vue'
import { SpaceCompactItemContext } from './context'

export const NoCompactStyle = defineComponent({
  name: 'NoCompactStyle',
  setup(_, { slots }) {
    SpaceCompactItemContext.useProvide(null)
    return () => {
      return slots.default?.()
    }
  },
})
