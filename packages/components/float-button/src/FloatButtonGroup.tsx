import {
  Transition,
  computed,
  defineComponent,
  onBeforeUnmount,
  ref,
  watch,
} from 'vue'
import { CloseOutlined, FileTextOutlined } from '@ant-design/icons-vue'
import { canUseDom, classNames, findDOMNode, initDefaultProps } from '@antdv/utils'
import { getTransitionProps } from '@antdv/vue-components'
import { useMergedState } from '@antdv/hooks'
import useConfigInject from '../../config-provider/src/hooks/useConfigInject'
import useStyle from '../style'

import FloatButton from './FloatButton'
import { useProvideFloatButtonGroupContext } from './context'
import { floatButtonGroupProps } from './props'
import type { FloatButtonGroupProps } from './props'
import { floatButtonPrefixCls } from './constants'

// CSSINJS

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AFloatButtonGroup',
  inheritAttrs: false,
  props: initDefaultProps(floatButtonGroupProps(), {
    type: 'default',
    shape: 'circle',
  } as FloatButtonGroupProps),
  setup(props, { attrs, slots, emit }) {
    const { prefixCls, direction } = useConfigInject(floatButtonPrefixCls, props)

    // style
    const [wrapSSR, hashId] = useStyle(prefixCls)

    const [open, setOpen] = useMergedState(false, { value: computed(() => props.open) })

    const floatButtonGroupRef = ref<HTMLDivElement>(null)
    const floatButtonRef = ref<HTMLButtonElement | HTMLAnchorElement>(null)

    useProvideFloatButtonGroupContext({
      shape: computed(() => props.shape),
    })
    const hoverTypeAction = {
      onMouseenter() {
        setOpen(true)
        emit('update:open', true)
        props.onOpenChange?.(true)
      },
      onMouseleave() {
        setOpen(false)
        emit('update:open', false)
        props.onOpenChange?.(false)
      },
    }
    const hoverAction = computed(() => {
      return props.trigger === 'hover' ? hoverTypeAction : {}
    })

    const handleOpenChange = () => {
      const nextOpen = !open.value
      emit('update:open', nextOpen)
      props.onOpenChange?.(nextOpen)
      setOpen(nextOpen)
    }

    const onClick = (e: MouseEvent) => {
      if (floatButtonGroupRef.value?.contains(e.target as Node)) {
        if (findDOMNode(floatButtonRef.value)?.contains(e.target as Node))
          handleOpenChange()

        return
      }
      setOpen(false)
      emit('update:open', false)
      props.onOpenChange?.(false)
    }

    watch(
      computed(() => props.trigger),
      (value) => {
        if (!canUseDom())
          return

        document.removeEventListener('click', onClick)
        if (value === 'click')
          document.addEventListener('click', onClick)
      },
      { immediate: true },
    )
    onBeforeUnmount(() => {
      document.removeEventListener('click', onClick)
    })

    return () => {
      const { shape = 'circle', type = 'default', tooltip, description, trigger } = props

      const groupPrefixCls = `${prefixCls.value}-group`

      const groupCls = classNames(groupPrefixCls, hashId.value, attrs.class, {
        [`${groupPrefixCls}-rtl`]: direction.value === 'rtl',
        [`${groupPrefixCls}-${shape}`]: shape,
        [`${groupPrefixCls}-${shape}-shadow`]: !trigger,
      })

      const wrapperCls = classNames(hashId.value, `${groupPrefixCls}-wrap`)

      const transitionProps = getTransitionProps(`${groupPrefixCls}-wrap`)

      return wrapSSR(
        <div ref={floatButtonGroupRef} {...attrs} class={groupCls} {...hoverAction.value}>
          {trigger && ['click', 'hover'].includes(trigger)
            ? (
              <>
                <Transition {...transitionProps}>
                  <div v-show={open.value} class={wrapperCls}>
                    {slots.default && slots.default()}
                  </div>
                </Transition>
                <FloatButton
                  ref={floatButtonRef}
                  type={type}
                  shape={shape}
                  tooltip={tooltip}
                  description={description}
                  v-slots={{
                    icon: () =>
                      open.value
                        ? slots.closeIcon?.() || <CloseOutlined />
                        : slots.icon?.() || <FileTextOutlined />,
                    tooltip: slots.tooltip,
                    description: slots.description,
                  }}
                >
                </FloatButton>
              </>
              )
            : (
                slots.default?.()
              )}
        </div>,
      )
    }
  },
})
