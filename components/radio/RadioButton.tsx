import { defineComponent } from 'vue'
import { useConfigInject } from '../hooks'
import Radio, { radioProps } from './Radio'
import { useProvideRadioOptionTypeContext } from './context'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ARadioButton',
  inheritAttrs: false,
  props: radioProps(),
  setup(props, { slots, attrs }) {
    const { prefixCls } = useConfigInject('radio', props)
    useProvideRadioOptionTypeContext('button')
    return () => {
      return (
        <Radio {...attrs} {...props} prefixCls={prefixCls.value}>
          {slots.default?.()}
        </Radio>
      )
    }
  },
})
