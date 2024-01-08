import { PropTypes, booleanType, eventType, objectType, someType } from '@antdv/utils'

import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'

import type { MouseEventHandler } from '@antdv/types'
import { buttonProps } from '../../button'
import type { MenuProps } from '../../menu'
import type { Align, DropdownArrowOptions, Trigger } from './types'

export function dropdownProps() {
  return {
    'arrow': someType<boolean | DropdownArrowOptions>([Boolean, Object]),
    'trigger': {
      type: [Array, String] as PropType<Trigger[] | Trigger>,
    },
    'menu': objectType<MenuProps>(),
    'overlay': PropTypes.any,
    /** @deprecated Please use `open` instead */
    'visible': booleanType(),
    'open': booleanType(),
    'disabled': booleanType(),
    'danger': booleanType(),
    'autofocus': booleanType(),
    'align': objectType<Align>(),
    'getPopupContainer': Function as PropType<(triggerNode: HTMLElement) => HTMLElement>,
    'prefixCls': String,
    'transitionName': String,
    'placement': String as PropType<
    | 'topLeft'
    | 'topCenter'
    | 'top'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomCenter'
    | 'bottom'
    | 'bottomRight'
  >,
    'overlayClassName': String,
    'overlayStyle': objectType<CSSProperties>(),
    'forceRender': booleanType(),
    'mouseEnterDelay': Number,
    'mouseLeaveDelay': Number,
    'openClassName': String,
    'minOverlayWidthMatchTrigger': booleanType(),
    'destroyPopupOnHide': booleanType(),
    /** @deprecated Please use `onOpenChange` instead */
    'onVisibleChange': {
      type: Function as PropType<(val: boolean) => void>,
    },
    /** @deprecated Please use `onUpdate:open` instead */
    'onUpdate:visible': {
      type: Function as PropType<(val: boolean) => void>,
    },
    'onOpenChange': {
      type: Function as PropType<(val: boolean) => void>,
    },
    'onUpdate:open': {
      type: Function as PropType<(val: boolean) => void>,
    },
  }
}

const buttonTypesProps = buttonProps()
export function dropdownButtonProps() {
  return {
    ...dropdownProps(),
    type: buttonTypesProps.type,
    size: String as PropType<'small' | 'large'>,
    htmlType: buttonTypesProps.htmlType,
    href: String,
    disabled: booleanType(),
    prefixCls: String,
    icon: PropTypes.any,
    title: String,
    loading: buttonTypesProps.loading,
    onClick: eventType<MouseEventHandler>(),
  }
}

export function innerDropdownProps() {
  return {
    minOverlayWidthMatchTrigger: { type: Boolean, default: undefined },
    arrow: { type: Boolean, default: false },
    prefixCls: PropTypes.string.def('rc-dropdown'),
    transitionName: String,
    overlayClassName: PropTypes.string.def(''),
    openClassName: String,
    animation: PropTypes.any,
    align: PropTypes.object,
    overlayStyle: { type: Object as PropType<CSSProperties>, default: () => ({} as CSSProperties) },
    placement: PropTypes.string.def('bottomLeft'),
    overlay: PropTypes.any,
    trigger: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).def(
      'hover',
    ),
    alignPoint: { type: Boolean, default: undefined },
    showAction: PropTypes.array,
    hideAction: PropTypes.array,
    getPopupContainer: Function,
    visible: { type: Boolean, default: undefined },
    defaultVisible: { type: Boolean, default: false },
    mouseEnterDelay: PropTypes.number.def(0.15),
    mouseLeaveDelay: PropTypes.number.def(0.1),
  }
}

export type DropdownProps = Partial<ExtractPropTypes<ReturnType<typeof dropdownProps>>>

export type DropdownButtonProps = Partial<ExtractPropTypes<ReturnType<typeof dropdownButtonProps>>>
