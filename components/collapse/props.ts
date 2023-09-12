import { booleanType, functionType, someType, stringType } from '../_util/type'
import PropTypes from '../_util/vue-types'
import type { ExtractPropTypes } from 'vue'
import type { ActiveKeyType, CollapsibleType, PanelProps } from './type'
import type { Key } from '../_util/type'

export const collapseProps = () => ({
  'prefixCls': String,
  'activeKey': someType<ActiveKeyType>([Array, Number, String]),
  'defaultActiveKey': someType<ActiveKeyType>([Array, Number, String]),
  'accordion': booleanType(),
  'destroyInactivePanel': booleanType(),
  'bordered': booleanType(),
  'expandIcon': functionType<(panelProps: PanelProps) => any>(),
  'openAnimation': PropTypes.object,
  'expandIconPosition': stringType<'start' | 'end'>(),
  'collapsible': stringType<CollapsibleType>(),
  'ghost': booleanType(),
  'onChange': functionType<(key: Key | Key[]) => void>(),
  'onUpdate:activeKey': functionType<(key: Key | Key[]) => void>(),
})

export const collapsePanelProps = () => ({
  openAnimation: PropTypes.object,
  prefixCls: String,
  header: PropTypes.any,
  headerClass: String,
  showArrow: booleanType(),
  isActive: booleanType(),
  destroyInactivePanel: booleanType(),
  /** @deprecated Use `collapsible="disabled"` instead */
  disabled: booleanType(),
  accordion: booleanType(),
  forceRender: booleanType(),
  expandIcon: functionType<(panelProps: PanelProps) => any>(),
  extra: PropTypes.any,
  panelKey: someType<number | string>(),
  collapsible: stringType<CollapsibleType>(),
  role: String,
  onItemClick: functionType<(panelKey: Key) => void>(),
})

export type CollapseProps = Partial<ExtractPropTypes<ReturnType<typeof collapseProps>>>

export type CollapsePanelProps = Partial<ExtractPropTypes<ReturnType<typeof collapsePanelProps>>>
