import { VerticalAlignTopOutlined } from '@ant-design/icons-vue'
import {
  Transition,
  defineComponent,
  nextTick,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue'
import { useConfigInject } from '../../hooks'
import { getTransitionProps } from '../../_internal/transition'
import { throttleByAnimationFrame } from '../../_utils/throttleByAnimationFrame'
import { initDefaultProps } from '../../_utils/vue'
import { getScroll, scrollTo } from '../../_utils/scroll'
import { floatButtonPrefixCls } from '../../constant'
import useStyle from '../style'
import { useInjectFloatButtonGroupContext } from './context'
import { backTopProps } from './props'
import FloatButton from './FloatButton'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ABackTop',
  inheritAttrs: false,
  props: initDefaultProps(backTopProps(), {
    visibilityHeight: 400,
    target: () => window,
    duration: 450,
    type: 'default',
    shape: 'circle',
  }),
  // emits: ['click'],
  setup(props, { slots, attrs, emit }) {
    const { prefixCls, direction } = useConfigInject(floatButtonPrefixCls, props)

    const [wrapSSR] = useStyle(prefixCls)

    const domRef = ref()
    const state = reactive({
      visible: props.visibilityHeight === 0,
      scrollEvent: null,
    })

    const getDefaultTarget = () =>
      (domRef.value && domRef.value.ownerDocument) ? domRef.value.ownerDocument : window

    const scrollToTop = (e: Event) => {
      const { target = getDefaultTarget, duration } = props
      scrollTo(0, {
        getContainer: target,
        duration,
      })
      emit('click', e)
    }

    const handleScroll = throttleByAnimationFrame((e: Event | { target: any }) => {
      const { visibilityHeight } = props
      const scrollTop = getScroll(e.target, true)
      state.visible = scrollTop >= visibilityHeight
    })

    const bindScrollEvent = () => {
      const { target } = props
      const getTarget = target || getDefaultTarget
      const container = getTarget()
      handleScroll({ target: container })
      container?.addEventListener('scroll', handleScroll)
    }

    const scrollRemove = () => {
      const { target } = props
      const getTarget = target || getDefaultTarget
      const container = getTarget()
      handleScroll.cancel()
      container?.removeEventListener('scroll', handleScroll)
    }

    watch(
      () => props.target,
      () => {
        scrollRemove()
        nextTick(() => {
          bindScrollEvent()
        })
      },
    )

    onMounted(() => {
      nextTick(() => {
        bindScrollEvent()
      })
    })

    onActivated(() => {
      nextTick(() => {
        bindScrollEvent()
      })
    })

    onDeactivated(() => {
      scrollRemove()
    })

    onBeforeUnmount(() => {
      scrollRemove()
    })
    const floatButtonGroupContext = useInjectFloatButtonGroupContext()
    return () => {
      const { description, type, shape, tooltip, badge } = props
      const floatButtonProps = {
        ...attrs,
        shape: floatButtonGroupContext?.shape.value || shape,
        onClick: scrollToTop,
        class: {
          [`${prefixCls.value}`]: true,
          [`${attrs.class}`]: attrs.class,
          [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
        },
        description,
        type,
        tooltip,
        badge,
      }

      const transitionProps = getTransitionProps('fade')
      return wrapSSR(
        <Transition {...transitionProps}>
          <FloatButton v-show={state.visible} {...floatButtonProps} ref={domRef}>
            {{
              icon: () => slots.icon?.() || <VerticalAlignTopOutlined />,
            }}
          </FloatButton>
        </Transition>,
      )
    }
  },
})
