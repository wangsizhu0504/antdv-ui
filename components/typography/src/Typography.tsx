import { defineComponent } from 'vue'
import { useConfigInject } from '../../hooks'
import { classNames } from '../../_utils/dom'
import useStyle from '../style'
import { typographyProps } from './props'

// CSSINJS

const Typography = defineComponent({
  name: 'ATypography',
  inheritAttrs: false,
  props: typographyProps(),
  setup(props, { slots, attrs }) {
    const { prefixCls, direction } = useConfigInject('typography', props)

    // Style
    const [wrapSSR, hashId] = useStyle(prefixCls)

    return () => {
      const {
        prefixCls: _prefixCls,
        direction: _direction,
        component: Component = 'article' as any,
        ...restProps
      } = { ...props, ...attrs }
      return wrapSSR(
        <Component
          {...restProps}
          class={classNames(
            prefixCls.value,
            { [`${prefixCls.value}-rtl`]: direction.value === 'rtl' },
            attrs.class,
            hashId.value,
          )}
        >
          {slots.default?.()}
        </Component>,
      )
    }
  },
})

export default Typography
