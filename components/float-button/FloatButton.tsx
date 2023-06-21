import { computed, defineComponent, ref } from 'vue'
import classNames from '../_util/classNames'
import Tooltip from '../tooltip'
import { useConfigInject } from '../hooks'
import warning from '../_util/warning'
import { initDefaultProps } from '../_util/props-util'
import useStyle from './style'
import { floatButtonProps } from './interface'
import Content from './FloatButtonContent'
import { useInjectFloatButtonGroupContext } from './context'

// import { useCompactItemContext } from '../space/Compact';

// CSSINJS

export const floatButtonPrefixCls = 'float-btn'

const FloatButton = defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AFloatButton',
  inheritAttrs: false,
  props: initDefaultProps(floatButtonProps(), { type: 'default', shape: 'circle' }),
  setup(props, { attrs, slots }) {
    const { prefixCls, direction } = useConfigInject(floatButtonPrefixCls, props)
    const [wrapSSR, hashId] = useStyle(prefixCls)
    const { shape: groupShape } = useInjectFloatButtonGroupContext()

    const floatButtonRef = ref<HTMLAnchorElement | HTMLButtonElement>(null)

    const mergeShape = computed(() => {
      return groupShape?.value || props.shape
    })

    return () => {
      const {
        prefixCls: customPrefixCls,
        type = 'default',
        shape = 'circle',
        description = slots.description?.(),
        tooltip,
        ...restProps
      } = props

      const classString = classNames(
        prefixCls.value,
        `${prefixCls.value}-${type}`,
        `${prefixCls.value}-${mergeShape.value}`,
        {
          [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
        },
        attrs.class,
        hashId.value,
      )

      const buttonNode = (
        <Tooltip
          placement="left"
          v-slots={{
            title:
              (slots.tooltip || tooltip)
                ? () => (slots.tooltip && slots.tooltip()) || tooltip
                : undefined,
            default: () => (
              <div class={`${prefixCls.value}-body`}>
                <Content
                  prefixCls={prefixCls.value}
                  v-slots={{
                    icon: slots.icon,
                    description: () => description,
                  }}
                ></Content>
              </div>
            ),
          }}
        ></Tooltip>
      )

      if (process.env.NODE_ENV !== 'production') {
        warning(
          !(shape === 'circle' && description),
          'FloatButton',
          'supported only when `shape` is `square`. Due to narrow space for text, short sentence is recommended.',
        )
      }

      return wrapSSR(
        props.href
          ? (
          <a ref={floatButtonRef} {...attrs} {...(restProps as any)} class={classString}>
            {buttonNode}
          </a>
            )
          : (
          <button ref={floatButtonRef} {...attrs} {...restProps} class={classString} type="button">
            {buttonNode}
          </button>
            ),
      )
    }
  },
})

export default FloatButton
