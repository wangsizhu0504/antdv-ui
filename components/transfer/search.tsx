import { SearchOutlined } from '@ant-design/icons-vue'
import { defineComponent } from 'vue'
import Input from '../input'
import initDefaultProps from '../_util/props-util/initDefaultProps'
import { transferSearchProps } from './props'
import type { ChangeEvent } from '../_util/EventInterface'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Search',
  inheritAttrs: false,
  props: initDefaultProps(transferSearchProps(), {
    placeholder: '',
  }),
  emits: ['change'],
  setup(props, { emit }) {
    const handleChange = (e: ChangeEvent) => {
      emit('change', e)
      if (e.target.value === '')
        props.handleClear?.()
    }

    return () => {
      const { placeholder, value, prefixCls, disabled } = props
      return (
        <Input
          placeholder={placeholder}
          class={prefixCls}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          allowClear
          v-slots={{ prefix: () => <SearchOutlined /> }}
        />
      )
    }
  },
})
