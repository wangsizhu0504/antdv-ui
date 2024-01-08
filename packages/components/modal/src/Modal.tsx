import { defineComponent } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'
import { addEventListenerWrap, canUseDocElement, classNames, initDefaultProps, warning } from '@antdv/utils'
import { VcDialog, getTransitionName } from '@antdv/vue-components'
import Button, { convertLegacyProps } from '../../button'
import { useLocaleReceiver } from '../../locale-provider'

import useConfigInject from '../../config-provider/src/hooks/useConfigInject'

import useStyle from '../style'
import { modalProps } from './props'
import type { MousePosition } from './types'

let mousePosition: MousePosition
// ref: https://github.com/ant-design/ant-design/issues/15795
function getClickPosition(e: MouseEvent) {
  mousePosition = {
    x: e.pageX,
    y: e.pageY,
  }
  // 100ms 内发生过点击事件，则从点击位置动画展示
  // 否则直接 zoom 展示
  // 这样可以兼容非点击方式展开
  setTimeout(() => (mousePosition = null), 100)
}

// 只有点击事件支持从鼠标位置动画展开
if (canUseDocElement()) addEventListenerWrap(document.documentElement, 'click', getClickPosition, true)

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AModal',
  test: 1,
  inheritAttrs: false,
  props: initDefaultProps(modalProps(), {
    width: 520,
    confirmLoading: false,
    okType: 'primary',
  }),
  setup(props, { emit, slots, attrs }) {
    const [locale] = useLocaleReceiver('Modal')
    const { prefixCls, rootPrefixCls, direction, getPopupContainer } = useConfigInject(
      'modal',
      props,
    )
    const [wrapSSR, hashId] = useStyle(prefixCls)

    warning(
      props.visible === undefined,
      'Modal',
      '`visible` will be removed in next major version, please use `open` instead.',
    )
    const handleCancel = (e: MouseEvent) => {
      emit('update:visible', false)
      emit('update:open', false)
      emit('cancel', e)
      emit('change', false)
    }

    const handleOk = (e: MouseEvent) => {
      emit('ok', e)
    }

    const renderFooter = () => {
      const {
        okText = slots.okText?.(),
        okType,
        cancelText = slots.cancelText?.(),
        confirmLoading,
      } = props
      return (
        <>
          <Button onClick={handleCancel} {...props.cancelButtonProps}>
            {cancelText || locale.value.cancelText}
          </Button>
          <Button
            {...convertLegacyProps(okType)}
            loading={confirmLoading}
            onClick={handleOk}
            {...props.okButtonProps}
          >
            {okText || locale.value.okText}
          </Button>
        </>
      )
    }
    return () => {
      const {
        prefixCls: customizePrefixCls,
        visible,
        open,
        wrapClassName,
        centered,
        getContainer,
        closeIcon = slots.closeIcon?.(),
        focusTriggerAfterClose = true,
        ...restProps
      } = props

      const wrapClassNameExtended = classNames(wrapClassName, {
        [`${prefixCls.value}-centered`]: !!centered,
        [`${prefixCls.value}-wrap-rtl`]: direction.value === 'rtl',
      })
      return wrapSSR(
        <VcDialog
          {...restProps}
          {...attrs}
          rootClassName={hashId.value}
          class={classNames(hashId.value, attrs.class)}
          getContainer={getContainer || getPopupContainer?.value}
          prefixCls={prefixCls.value}
          wrapClassName={wrapClassNameExtended}
          visible={open ?? visible}
          onClose={handleCancel}
          focusTriggerAfterClose={focusTriggerAfterClose}
          transitionName={getTransitionName(rootPrefixCls.value, 'zoom', props.transitionName)}
          maskTransitionName={getTransitionName(
            rootPrefixCls.value,
            'fade',
            props.maskTransitionName,
          )}
          mousePosition={restProps.mousePosition ?? mousePosition}
          v-slots={{
            ...slots,
            footer: slots.footer || renderFooter,
            closeIcon: () => {
              return (
                <span class={`${prefixCls.value}-close-x`}>
                  {closeIcon || <CloseOutlined class={`${prefixCls.value}-close-icon`} />}
                </span>
              )
            },
          }}
        >
        </VcDialog>,
      )
    }
  },
})
