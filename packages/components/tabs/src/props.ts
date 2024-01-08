import {
  PropTypes,
  booleanType,
  functionType,
  objectType,
  someType,
  stringType,
} from '@antdv/utils'
import type { FocusEventHandler, Key, MouseEventHandler } from '@antdv/types'
import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'

import type { SizeType } from '../../config-provider'
import type {
  AnimatedConfig,
  EditableConfig,
  OnTabScroll,
  RenderTabBar,
  Tab,
  TabPosition,
  TabsLocale,
  TabsType,
} from './types'

export function addButtonProps() {
  return {
    prefixCls: String,
    editable: { type: Object as PropType<EditableConfig> },
    locale: { type: Object as PropType<TabsLocale>, default: undefined as TabsLocale },
  }
}

export function tabNavListProps() {
  return {
    id: { type: String },
    tabPosition: { type: String as PropType<TabPosition> },
    activeKey: { type: [String, Number] },
    rtl: { type: Boolean },
    animated: objectType<AnimatedConfig>(),
    editable: objectType<EditableConfig>(),
    moreIcon: PropTypes.any,
    moreTransitionName: { type: String },
    mobile: { type: Boolean },
    tabBarGutter: { type: Number },
    renderTabBar: { type: Function as PropType<RenderTabBar> },
    locale: objectType<TabsLocale>(),
    popupClassName: String,
    getPopupContainer: functionType<
    ((triggerNode?: HTMLElement | undefined) => HTMLElement) | undefined
  >(),
    onTabClick: {
      type: Function as PropType<(activeKey: Key, e: MouseEvent | KeyboardEvent) => void>,
    },
    onTabScroll: { type: Function as PropType<OnTabScroll> },
  }
}

export const operationNodeProps = {
  prefixCls: { type: String },
  id: { type: String },
  tabs: { type: Object as PropType<Array<Tab & { closeIcon?: () => any }>> },
  rtl: { type: Boolean },
  tabBarGutter: { type: Number },
  activeKey: { type: [String, Number] },
  mobile: { type: Boolean },
  moreIcon: PropTypes.any,
  moreTransitionName: { type: String },
  editable: { type: Object as PropType<EditableConfig> },
  locale: { type: Object as PropType<TabsLocale>, default: undefined as TabsLocale },
  removeAriaLabel: String,
  onTabClick: { type: Function as PropType<(key: Key, e: MouseEvent | KeyboardEvent) => void> },
  popupClassName: String,
  getPopupContainer: functionType<
    ((triggerNode?: HTMLElement | undefined) => HTMLElement) | undefined
  >(),
}

export function tabNodeProps() {
  return {
    id: { type: String as PropType<string> },
    prefixCls: { type: String as PropType<string> },
    tab: { type: Object as PropType<Tab & { closeIcon?: () => any }> },
    active: { type: Boolean },
    closable: { type: Boolean },
    editable: { type: Object as PropType<EditableConfig> },
    onClick: { type: Function as PropType<(e: MouseEvent | KeyboardEvent) => void> },
    onResize: {
      type: Function as PropType<
      (width: number, height: number, left: number, top: number) => void
    >,
    },
    renderWrapper: { type: Function as PropType<(node: any) => any> },
    removeAriaLabel: { type: String },
    // onRemove: { type: Function as PropType<() => void> },
    onFocus: { type: Function as PropType<FocusEventHandler> },
  }
}

export function tabPanelListProps() {
  return {
    activeKey: { type: [String, Number] as PropType<Key> },
    id: { type: String },
    rtl: { type: Boolean },
    animated: { type: Object as PropType<AnimatedConfig>, default: undefined as AnimatedConfig },
    tabPosition: { type: String as PropType<TabPosition> },
    destroyInactiveTabPane: { type: Boolean },
  }
}

export function tabPaneProps() {
  return {
    tab: PropTypes.any,
    disabled: { type: Boolean },
    forceRender: { type: Boolean },
    closable: { type: Boolean },
    animated: { type: Boolean },
    active: { type: Boolean },
    destroyInactiveTabPane: { type: Boolean },

    // Pass by TabPaneList
    prefixCls: { type: String },
    tabKey: { type: [String, Number] },
    id: { type: String },
  // closeIcon: PropTypes.any,
  }
}

export function tabsProps() {
  return {
    'prefixCls': { type: String },
    'id': { type: String },
    'popupClassName': String,
    'getPopupContainer': functionType<
      ((triggerNode?: HTMLElement | undefined) => HTMLElement) | undefined
    >(),
    'activeKey': { type: [String, Number] },
    'defaultActiveKey': { type: [String, Number] },
    'direction': stringType<'ltr' | 'rtl'>(),
    'animated': someType<boolean | AnimatedConfig>([Boolean, Object]),
    'renderTabBar': functionType<RenderTabBar>(),
    'tabBarGutter': { type: Number },
    'tabBarStyle': objectType<CSSProperties>(),
    'tabPosition': stringType<TabPosition>(),
    'destroyInactiveTabPane': booleanType(),

    'hideAdd': Boolean,
    'type': stringType<TabsType>(),
    'size': stringType<SizeType>(),
    'centered': Boolean,
    'onEdit': functionType<(e: MouseEvent | KeyboardEvent | Key, action: 'add' | 'remove') => void>(),
    'onChange': functionType<(activeKey: Key) => void>(),
    'onTabClick': functionType<(activeKey: Key, e: KeyboardEvent | MouseEvent) => void>(),
    'onTabScroll': functionType<OnTabScroll>(),
    'onUpdate:activeKey': functionType<(activeKey: Key) => void>(),
    // Accessibility
    'locale': objectType<TabsLocale>(),
    'onPrevClick': functionType<MouseEventHandler>(),
    'onNextClick': functionType<MouseEventHandler>(),
    'tabBarExtraContent': PropTypes.any,
  }
}

export type TabsProps = Partial<ExtractPropTypes<ReturnType<typeof tabsProps>>>

export type TabPaneProps = Partial<ExtractPropTypes<ReturnType<typeof tabPaneProps>>>

export type TabNodeProps = Partial<ExtractPropTypes<typeof tabNodeProps>>

export type TabPanelProps = Partial<ExtractPropTypes<ReturnType<typeof tabPanelListProps>>>

export type OperationNodeProps = Partial<ExtractPropTypes<typeof operationNodeProps>>

export type TabNavListProps = Partial<ExtractPropTypes<ReturnType<typeof tabNavListProps>>>

export type AddButtonProps = Partial<ExtractPropTypes<ReturnType<typeof addButtonProps>>>
