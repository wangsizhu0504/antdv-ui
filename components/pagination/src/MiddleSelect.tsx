import { defineComponent } from 'vue'
import Select, { selectProps } from '../../select'

export default defineComponent({
  name: 'MiddleSelect',
  inheritAttrs: false,
  props: selectProps(),
  Option: Select.Option,
  setup(props, { attrs, slots }) {
    return () => {
      const selelctProps: any = {
        ...props,
        size: 'middle',
        ...attrs,
      }
      return <Select {...selelctProps} v-slots={slots}></Select>
    }
  },
})
