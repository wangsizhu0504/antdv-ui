import { defineComponent, ref } from 'vue'
import { initDefaultProps } from '../../_utils/vue'
import { PortalWrapper } from '../../_internal/portal'
import Child from './DrawerChild'
import { drawerWrapperProps } from './props'

export default defineComponent({
  compatConfig: { MODE: 3 },
  inheritAttrs: false,
  name: 'DrawerWrapper',
  props: initDefaultProps(drawerWrapperProps(), {
    prefixCls: 'drawer',
    placement: 'left',
    getContainer: 'body',
    level: 'all',
    duration: '.3s',
    ease: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
    afterVisibleChange: () => { },
    showMask: true,
    maskClosable: true,
    maskStyle: {},
    wrapperClassName: '',
    keyboard: true,
    forceRender: false,
    autofocus: true,
  }),
  emits: ['handleClick', 'close'],
  setup(props, { emit, slots }) {
    const dom = ref<HTMLElement>(null)

    const onHandleClick = (e: MouseEvent | KeyboardEvent) => {
      emit('handleClick', e)
    }

    const onClose = (e: MouseEvent | KeyboardEvent) => {
      emit('close', e)
    }

    return () => {
      const {
        getContainer,
        wrapperClassName,
        rootClassName,
        rootStyle,
        forceRender,
        ...otherProps
      } = props

      let portal = null
      if (!getContainer) {
        return (
          <Child
            v-slots={slots}
            {...otherProps}
            rootClassName={rootClassName}
            rootStyle={rootStyle}
            open={props.open}
            onClose={onClose}
            onHandleClick={onHandleClick}
            inline={true}
          ></Child>
        )
      }

      // 如果有 handler 为内置强制渲染；
      const $forceRender = !!slots.handler || forceRender
      if ($forceRender || props.open || dom.value) {
        portal = (
          <PortalWrapper
            autoLock
            visible={props.open}
            forceRender={$forceRender}
            getContainer={getContainer}
            wrapperClassName={wrapperClassName}
            v-slots={{
              default: ({ visible, afterClose, ...rest }) => (
                <Child
                  ref={dom}
                  v-slots={slots}
                  {...otherProps}
                  {...rest}
                  rootClassName={rootClassName}
                  rootStyle={rootStyle}
                  open={visible !== undefined ? visible : props.open}
                  afterVisibleChange={
                    afterClose !== undefined ? afterClose : props.afterVisibleChange
                  }
                  onClose={onClose}
                  onHandleClick={onHandleClick}
                />
              ),
            }}
          ></PortalWrapper>
        )
      }
      return portal
    }
  },
})
