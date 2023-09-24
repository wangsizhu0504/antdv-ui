import { PropTypes, objectType } from '../../_utils/vue'

import type { MousePosition } from './types'
import type { VueNode, getContainerFunc } from '../../_utils/types'
import type { ButtonProps as ButtonPropsType, LegacyButtonType } from '../../button'
import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'

export const modalProps = () => ({
  'prefixCls': String,
  /** @deprecated Please use `open` instead. */
  'visible': { type: Boolean, default: undefined },
  'open': { type: Boolean, default: undefined },
  'confirmLoading': { type: Boolean, default: undefined },
  'title': PropTypes.any,
  'closable': { type: Boolean, default: undefined },
  'closeIcon': PropTypes.any,
  'onOk': Function as PropType<(e: MouseEvent) => void>,
  'onCancel': Function as PropType<(e: MouseEvent) => void>,
  'onUpdate:visible': Function as PropType<(visible: boolean) => void>,
  'onUpdate:open': Function as PropType<(open: boolean) => void>,
  'onChange': Function as PropType<(open: boolean) => void>,
  'afterClose': Function as PropType<() => void>,
  'centered': { type: Boolean, default: undefined },
  'width': [String, Number],
  'footer': PropTypes.any,
  'okText': PropTypes.any,
  'okType': String as PropType<LegacyButtonType>,
  'cancelText': PropTypes.any,
  'icon': PropTypes.any,
  'maskClosable': { type: Boolean, default: undefined },
  'forceRender': { type: Boolean, default: undefined },
  'okButtonProps': objectType<ButtonPropsType>(),
  'cancelButtonProps': objectType<ButtonPropsType>(),
  'destroyOnClose': { type: Boolean, default: undefined },
  'wrapClassName': String,
  'maskTransitionName': String,
  'transitionName': String,
  'getContainer': {
    type: [String, Function, Boolean, Object] as PropType<
      string | HTMLElement | getContainerFunc | false
    >,
    default: undefined,
  },
  'zIndex': Number,
  'bodyStyle': objectType<CSSProperties>(),
  'maskStyle': objectType<CSSProperties>(),
  'mask': { type: Boolean, default: undefined },
  'keyboard': { type: Boolean, default: undefined },
  'wrapProps': Object,
  'focusTriggerAfterClose': { type: Boolean, default: undefined },
  'modalRender': Function as PropType<(arg: { originVNode: VueNode }) => VueNode>,
  'mousePosition': objectType<MousePosition>(),
})

export type ModalProps = Partial<ExtractPropTypes<ReturnType<typeof modalProps>>>
