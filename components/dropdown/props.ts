import PropTypes from '../_util/vue-types'

import { booleanType, eventType, objectType, someType } from '../_util/type'
import { buttonProps } from '../button'
import type { Align, DropdownArrowOptions, Trigger } from './type'
import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'

import type { MouseEventHandler } from '../_util/EventInterface'
import type { MenuProps } from '../menu'

export const dropdownProps = () => ({
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
})

const buttonTypesProps = buttonProps()
export const dropdownButtonProps = () => ({
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
})

export type DropdownProps = Partial<ExtractPropTypes<ReturnType<typeof dropdownProps>>>

export type DropdownButtonProps = Partial<ExtractPropTypes<ReturnType<typeof dropdownButtonProps>>>
