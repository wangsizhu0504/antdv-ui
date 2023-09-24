import { computed, defineComponent } from 'vue'
import { useConfigInject } from '../../hooks'
import { cardGridProps } from './props'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ACardGrid',
  __ANT_CARD_GRID: true,
  props: cardGridProps(),
  setup(props, { slots }) {
    const { prefixCls } = useConfigInject('card', props)
    const classNames = computed(() => {
      return {
        [`${prefixCls.value}-grid`]: true,
        [`${prefixCls.value}-grid-hoverable`]: props.hoverable,
      }
    })
    return () => {
      return <div class={classNames.value}>{slots.default?.()}</div>
    }
  },
})
