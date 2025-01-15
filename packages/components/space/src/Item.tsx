import { defineComponent } from 'vue'
import { SpaceCompactItemContext } from './context'
import { spaceCompactItemProps } from './props'

export default defineComponent({
  name: 'CompactItem',
  props: spaceCompactItemProps(),
  setup(props, { slots }) {
    SpaceCompactItemContext.useProvide(props)

    return () => slots.default?.()
  },
})
