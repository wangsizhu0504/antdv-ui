import {
  Teleport,
  defineComponent,
  nextTick,
  onBeforeMount,
  onMounted,
  onUpdated,
  watch,
} from 'vue'
import { useInjectPortal } from '../../trigger/context'
import { PropTypes } from '../../../_utils/vue'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Portal',
  inheritAttrs: false,
  props: {
    getContainer: PropTypes.func.isRequired,
    didUpdate: Function,
  },
  setup(props, { slots }) {
    let isSSR = true
    // getContainer 不会改变，不用响应式
    let container: HTMLElement
    const { shouldRender } = useInjectPortal()
    onBeforeMount(() => {
      isSSR = false
      const containerDom = props.getContainer()
      if (shouldRender.value && containerDom)
        container = containerDom
    })
    onMounted(() => {
      if (shouldRender.value)
        container = props.getContainer()
    })
    const stopWatch = watch(shouldRender, () => {
      if (shouldRender.value && !container)
        container = props.getContainer()

      if (container)
        stopWatch()
    })
    onUpdated(() => {
      nextTick(() => {
        if (shouldRender.value)
          props.didUpdate?.(props)
      })
    })
    // onBeforeUnmount(() => {
    //   if (container && container.parentNode) {
    //     container.parentNode.removeChild(container);
    //   }
    // });
    return () => {
      if (!shouldRender.value) return null
      if (isSSR)
        return slots.default?.()
      return container ? <Teleport to={container} v-slots={slots}></Teleport> : null
    }
  },
})
