import {
  computed,
  defineComponent,
  inject,
  nextTick,
  onMounted,
  onUnmounted,
  provide,
  shallowRef,
  watch,
} from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'
import { omit } from '../../_utils/omit'
import { getPropsSlot, initDefaultProps } from '../../_utils/vue'
import { warning } from '../../_utils/log'
import { isNumeric } from '../../_utils/is'
import { NoCompactStyle } from '../../space'
import { classNames } from '../../_utils/dom'
import { useConfigInject, useScrollLocker } from '../../hooks'

import { getTransitionName, getTransitionProps } from '../../_internal/transition'
import useStyle from '../style'
import DrawerWrapper from './DrawerWrapper'
import { drawerProps } from './props'
import type { CustomSlotsType } from '../../_utils/types'
import type { PushState } from './types'
import type { CSSProperties } from 'vue'

const defaultPushState: PushState = { distance: 180 }

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ADrawer',
  inheritAttrs: false,
  props: initDefaultProps(drawerProps(), {
    closable: true,
    placement: 'right',
    maskClosable: true,
    mask: true,
    level: null,
    keyboard: true,
    push: defaultPushState,
  }),
  slots: Object as CustomSlotsType<{
    closeIcon: any
    title: any
    extra: any
    footer: any
    handle: any
    default: any
  }>,
  // emits: ['update:visible', 'close', 'afterVisibleChange'],
  setup(props, { emit, slots, attrs }) {
    const sPush = shallowRef(false)
    const destroyClose = shallowRef(false)
    const vcDrawer = shallowRef(null)
    const load = shallowRef(false)
    const visible = shallowRef(false)
    const mergedOpen = computed(() => props.open ?? props.visible)
    watch(
      mergedOpen,
      () => {
        if (mergedOpen.value)
          load.value = true
        else
          visible.value = false
      },
      { immediate: true },
    )
    watch(
      [mergedOpen, load],
      () => {
        if (mergedOpen.value && load.value)
          visible.value = true
      },
      { immediate: true },
    )
    const parentDrawerOpts = inject('parentDrawerOpts', null)
    const { prefixCls, getPopupContainer, direction } = useConfigInject('drawer', props)
    const [wrapSSR, hashId] = useStyle(prefixCls)
    const getContainer = computed(() =>
      // 有可能为 false，所以不能直接判断
      props.getContainer === undefined && getPopupContainer?.value
        ? () => getPopupContainer.value(document.body)
        : props.getContainer,
    )

    warning(
      !props.afterVisibleChange,
      'Drawer',
      '`afterVisibleChange` prop is deprecated, please use `@afterVisibleChange` event instead',
    )
    // ========================== Warning ===========================
    if (process.env.NODE_ENV !== 'production') {
      [
        ['visible', 'open'],
        ['onUpdate:visible', 'onUpdate:open'],
        ['onAfterVisibleChange', 'onAfterOpenChange'],
      ].forEach(([deprecatedName, newName]) => {
        warning(
          !props[deprecatedName],
          'Drawer',
          `\`${deprecatedName}\` is deprecated, please use \`${newName}\` instead.`,
        )
      })
    }
    const domFocus = () => {
      vcDrawer.value?.domFocus?.()
    }

    const setPush = () => {
      sPush.value = true
    }

    const setPull = () => {
      sPush.value = false
      nextTick(() => {
        domFocus()
      })
    }
    provide('parentDrawerOpts', {
      setPush,
      setPull,
    })

    if (props.lockScroll)
      useScrollLocker(visible)

    onMounted(() => {
      if (mergedOpen.value && parentDrawerOpts)
        parentDrawerOpts.setPush()
    })

    onUnmounted(() => {
      if (parentDrawerOpts)
        parentDrawerOpts.setPull()
    })

    watch(
      visible,
      () => {
        if (parentDrawerOpts) {
          if (visible.value)
            parentDrawerOpts.setPush()
          else
            parentDrawerOpts.setPull()
        }
      },
      { flush: 'post' },
    )

    const close = (e: Event) => {
      emit('update:visible', false)
      emit('update:open', false)
      emit('close', e)
    }

    const afterVisibleChange = (open: boolean) => {
      if (!open) {
        if (destroyClose.value === false) {
          // set true only once
          destroyClose.value = true
        }
        if (props.destroyOnClose)
          load.value = false
      }
      props.afterVisibleChange?.(open)
      emit('afterVisibleChange', open)
      emit('afterOpenChange', open)
    }

    const pushTransform = computed(() => {
      const { push, placement } = props
      let distance: number | string
      if (typeof push === 'boolean')
        distance = push ? defaultPushState.distance : 0
      else
        distance = push!.distance

      distance = Number.parseFloat(String(distance || 0))

      if (placement === 'left' || placement === 'right')
        return `translateX(${placement === 'left' ? distance : -distance}px)`

      if (placement === 'top' || placement === 'bottom')
        return `translateY(${placement === 'top' ? distance : -distance}px)`

      return null
    })
    // ============================ Size ============================
    const mergedWidth = computed(() => props.width ?? (props.size === 'large' ? 736 : 378))
    const mergedHeight = computed(() => props.height ?? (props.size === 'large' ? 736 : 378))
    const offsetStyle = computed(() => {
      // https://github.com/ant-design/ant-design/issues/24287
      const { mask, placement } = props
      if (!visible.value && !mask)
        return {}

      const val: CSSProperties = {}
      if (placement === 'left' || placement === 'right')
        val.width = isNumeric(mergedWidth.value) ? `${mergedWidth.value}px` : mergedWidth.value
      else
        val.height = isNumeric(mergedHeight.value) ? `${mergedHeight.value}px` : mergedHeight.value

      return val
    })

    const wrapperStyle = computed(() => {
      const { zIndex } = props
      const val = offsetStyle.value
      return [{ zIndex, transform: sPush.value ? pushTransform.value : undefined }, val]
    })

    const renderCloseIcon = (prefixCls: string) => {
      const { closable } = props
      const $closeIcon = slots.closeIcon ? slots.closeIcon?.() : props.closeIcon
      return (
        closable && (
          <button key="closer" onClick={close} aria-label="Close" class={`${prefixCls}-close`}>
            {$closeIcon === undefined ? <CloseOutlined></CloseOutlined> : $closeIcon}
          </button>
        )
      )
    }

    const renderHeader = (prefixCls: string) => {
      const { closable, headerStyle } = props
      const extra = getPropsSlot(slots, props, 'extra')
      const title = getPropsSlot(slots, props, 'title')
      if (!title && !closable)
        return null

      return (
        <div
          class={classNames(`${prefixCls}-header`, {
            [`${prefixCls}-header-close-only`]: closable && !title && !extra,
          })}
          style={headerStyle}
        >
          <div class={`${prefixCls}-header-title`}>
            {renderCloseIcon(prefixCls)}
            {title && <div class={`${prefixCls}-title`}>{title}</div>}
          </div>
          {extra && <div class={`${prefixCls}-extra`}>{extra}</div>}
        </div>
      )
    }

    const renderFooter = (prefixCls: string) => {
      const footer = getPropsSlot(slots, props, 'footer')
      if (!footer)
        return null

      const footerClassName = `${prefixCls}-footer`
      return (
        <div class={footerClassName} style={props.footerStyle}>
          {footer}
        </div>
      )
    }

    const renderBody = (prefixCls: string) => {
      if (destroyClose.value && !props.forceRender && !load.value)
        return null

      const { bodyStyle, drawerStyle } = props

      return (
        <div class={`${prefixCls}-wrapper-body`} style={drawerStyle}>
          {renderHeader(prefixCls)}
          <div key="body" class={`${prefixCls}-body`} style={bodyStyle}>
            {slots.default?.()}
          </div>
          {renderFooter(prefixCls)}
        </div>
      )
    }

    const drawerClassName = computed(() =>
      classNames(
        {
          'no-mask': !props.mask,
          [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
        },
        props.rootClassName,
        hashId.value,
      ),
    )
    // =========================== Motion ===========================
    const maskMotion = computed(() => {
      return getTransitionProps(getTransitionName(prefixCls.value, 'mask-motion'))
    })
    const panelMotion = (motionPlacement: string) => {
      return getTransitionProps(
        getTransitionName(prefixCls.value, `panel-motion-${motionPlacement}`),
      )
    }

    return () => {
      const { width, height, placement, mask, forceRender, ...rest } = props

      const vcDrawerProps: any = {
        ...attrs,
        ...omit(rest, [
          'size',
          'closeIcon',
          'closable',
          'destroyOnClose',
          'drawerStyle',
          'headerStyle',
          'bodyStyle',
          'title',
          'push',
          'onAfterVisibleChange',
          'onClose',
          'onUpdate:visible',
          'onUpdate:open',
          'visible',
        ]),
        forceRender,
        onClose: close,
        afterVisibleChange,
        handler: false,
        prefixCls: prefixCls.value,
        open: visible.value,
        showMask: mask,
        placement,
        ref: vcDrawer,
      }
      return wrapSSR(
        <NoCompactStyle>
          <DrawerWrapper
            {...vcDrawerProps}
            maskMotion={maskMotion.value}
            motion={panelMotion}
            width={mergedWidth.value}
            height={mergedHeight.value}
            getContainer={getContainer.value}
            rootClassName={drawerClassName.value}
            rootStyle={props.rootStyle}
            contentWrapperStyle={wrapperStyle.value}
            v-slots={{
              handler: props.handle ? () => props.handle : slots.handle,
              default: () => renderBody(prefixCls.value),
            }}
          ></DrawerWrapper>
        </NoCompactStyle>,
      )
    }
  },
})
