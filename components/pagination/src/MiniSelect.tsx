import { defineComponent } from 'vue'
import Select, { selectProps } from '../../select'

export default defineComponent({
  name: 'MiniSelect',
  compatConfig: { MODE: 3 },
  inheritAttrs: false,
  props: selectProps(),
  Option: Select.Option,
  setup(props, { attrs, slots }) {
    return () => {
      const selelctProps: any = {
        ...props,
        size: 'small',
        ...attrs,
      }
      return <Select {...selelctProps} v-slots={slots}></Select>
    }
  },
})
