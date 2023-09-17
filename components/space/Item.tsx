import { defineComponent } from 'vue'
import { spaceCompactItemProps } from './props'
import { SpaceCompactItemContext } from './context'

export default defineComponent({
  name: 'CompactItem',
  props: spaceCompactItemProps(),
  setup(props, { slots }) {
    SpaceCompactItemContext.useProvide(props)

    return () => slots.default?.()
  },
})
