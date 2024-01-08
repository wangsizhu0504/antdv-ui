import { computed, defineComponent, nextTick, ref, watch } from 'vue'
import { classNames } from '@antdv/utils'
import useConfigInject from '../../config-provider/src/hooks/useConfigInject'
import { useInjectFormItemContext } from '../../form/src/FormItemContext'
import useStyle from '../style'
import { useProvideRadioGroupContext } from './context'
import Radio from './Radio'
import { radioGroupProps } from './props'
import type { RadioChangeEvent, RadioGroupChildOption } from './types'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ARadioGroup',
  inheritAttrs: false,
  props: radioGroupProps(),
  // emits: ['update:value', 'change'],
  setup(props, { slots, emit, attrs }) {
    const formItemContext = useInjectFormItemContext()
    const { prefixCls, direction, size } = useConfigInject('radio', props)

    // Style
    const [wrapSSR, hashId] = useStyle(prefixCls)

    const stateValue = ref(props.value)
    const updatingValue = ref<boolean>(false)
    watch(
      () => props.value,
      (val) => {
        stateValue.value = val
        updatingValue.value = false
      },
    )

    const onRadioChange = (ev: RadioChangeEvent) => {
      const lastValue = stateValue.value
      const { value } = ev.target

      if (!('value' in props))
        stateValue.value = value

      // nextTick for https://github.com/vueComponent/ant-design-vue/issues/1280
      if (!updatingValue.value && value !== lastValue) {
        updatingValue.value = true
        emit('update:value', value)
        emit('change', ev)
        formItemContext.onFieldChange()
      }
      nextTick(() => {
        updatingValue.value = false
      })
    }

    useProvideRadioGroupContext({
      onChange: onRadioChange,
      value: stateValue,
      disabled: computed(() => props.disabled),
      name: computed(() => props.name),
      optionType: computed(() => props.optionType),
    })

    return () => {
      const { options, buttonStyle, id = formItemContext.id.value } = props

      const groupPrefixCls = `${prefixCls.value}-group`

      const classString = classNames(
        groupPrefixCls,
        `${groupPrefixCls}-${buttonStyle}`,
        {
          [`${groupPrefixCls}-${size.value}`]: size.value,
          [`${groupPrefixCls}-rtl`]: direction.value === 'rtl',
        },
        attrs.class,
        hashId.value,
      )

      let children = null
      if (options && options.length > 0) {
        children = options.map((option) => {
          if (typeof option === 'string' || typeof option === 'number') {
            return (
              <Radio
                key={option}
                prefixCls={prefixCls.value}
                disabled={props.disabled}
                value={option}
                checked={stateValue.value === option}
              >
                {option}
              </Radio>
            )
          }
          const { value, disabled, label } = option as RadioGroupChildOption
          return (
            <Radio
              key={`radio-group-value-options-${value}`}
              prefixCls={prefixCls.value}
              disabled={disabled || props.disabled}
              value={value}
              checked={stateValue.value === value}
            >
              {label}
            </Radio>
          )
        })
      } else {
        children = slots.default?.()
      }
      return wrapSSR(
        <div {...attrs} class={classString} id={id}>
          {children}
        </div>,
      )
    }
  },
})
