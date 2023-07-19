import { computed, defineComponent } from 'vue'
import { FormItemInputContext } from '../form/FormItemContext'
import { useConfigInject } from '../hooks'
import classNames from '../_util/classNames'
import useStyle from './style'
import type { SizeType } from '../config-provider'
import type { PropType } from 'vue'

// CSSINJS

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AInputGroup',
  inheritAttrs: false,
  props: {
    prefixCls: String,
    size: { type: String as PropType<SizeType> },
    compact: { type: Boolean, default: undefined },
  },
  setup(props, { slots, attrs }) {
    const { prefixCls, direction, getPrefixCls } = useConfigInject('input-group', props)
    const formItemInputContext = FormItemInputContext.useInject()
    FormItemInputContext.useProvide(formItemInputContext, {
      isFormItemInput: false,
    })

    // style
    const inputPrefixCls = computed(() => getPrefixCls('input'))
    const [wrapSSR, hashId] = useStyle(inputPrefixCls)

    const cls = computed(() => {
      const pre = prefixCls.value
      return {
        [`${pre}`]: true,
        [hashId.value]: true,
        [`${pre}-lg`]: props.size === 'large',
        [`${pre}-sm`]: props.size === 'small',
        [`${pre}-compact`]: props.compact,
        [`${pre}-rtl`]: direction.value === 'rtl',
      }
    })
    return () => {
      return wrapSSR(
        <span {...attrs} class={classNames(cls.value, attrs.class)}>
          {slots.default?.()}
        </span>,
      )
    }
  },
})
