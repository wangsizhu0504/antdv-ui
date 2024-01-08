import { defineComponent } from 'vue'
import Select, { selectProps } from '../../select'

export const MiniSelect = defineComponent({
  name: 'MiniSelect',
  compatConfig: { MODE: 3 },
  inheritAttrs: false,
  props: selectProps(),
  Option: Select.Option,
  setup(props, { attrs, slots }) {
    return () => {
      const getSelectProps: any = {
        ...props,
        size: 'small',
        ...attrs,
      }
      return <Select {...getSelectProps} v-slots={slots}></Select>
    }
  },
})

export const MiddleSelect = defineComponent({
  name: 'MiddleSelect',
  inheritAttrs: false,
  props: selectProps(),
  Option: Select.Option,
  setup(props, { attrs, slots }) {
    return () => {
      const getSelectProps: any = {
        ...props,
        size: 'middle',
        ...attrs,
      }
      return <Select {...getSelectProps} v-slots={slots}></Select>
    }
  },
})
