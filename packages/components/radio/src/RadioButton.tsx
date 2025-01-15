import { defineComponent } from 'vue'
import useConfigInject from '../../config-provider/src/hooks/useConfigInject'
import { useProvideRadioOptionTypeContext } from './context'
import { radioProps } from './props'
import Radio from './Radio'

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
