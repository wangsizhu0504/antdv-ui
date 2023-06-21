import { computed, defineComponent, reactive } from 'vue'
import type { ExtractPropTypes, PropType } from 'vue'
import { flattenChildren } from '../_util/props-util'
import { useToken } from '../theme/internal'
import type { SizeType } from '../config-provider'
import devWarning from '../vc-util/devWarning'
import { createContext, useConfigInject } from '../hooks'

export const buttonGroupProps = () => ({
  prefixCls: String,
  size: {
    type: String as PropType<SizeType>,
  },
})

export type ButtonGroupProps = Partial<ExtractPropTypes<ReturnType<typeof buttonGroupProps>>>
export const GroupSizeContext = createContext<{
  size: SizeType
}>()
export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AButtonGroup',
  props: buttonGroupProps(),
  setup(props, { slots }) {
    const { prefixCls, direction } = useConfigInject('btn-group', props)
    const [, , hashId] = useToken()
    GroupSizeContext.useProvide(
      reactive({
        size: computed(() => props.size),
      }),
    )
    const classes = computed(() => {
      const { size } = props
      let sizeCls = ''
      switch (size) {
        case 'large':
          sizeCls = 'lg'
          break
        case 'small':
          sizeCls = 'sm'
          break
        case 'middle':
        case undefined:
          break
        default:

          devWarning(!size, 'Button.Group', 'Invalid prop `size`.')
      }
      return {
        [`${prefixCls.value}`]: true,
        [`${prefixCls.value}-${sizeCls}`]: sizeCls,
        [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
        [hashId.value]: true,
      }
    })
    return () => {
      return <div class={classes.value}>{flattenChildren(slots.default?.())}</div>
    }
  },
})
