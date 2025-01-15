import type { CSSMotionProps, FocusEventHandler, Key, MouseEventHandler } from '@antdv/types';
import type { ExtractPropTypes, PropType } from 'vue';
import type {
  BuiltinPlacements,
  ItemType,
  MenuClickEventHandler,
  MenuMode,
  MenuTheme,
  SelectEventHandler,
  TriggerSubMenuAction,
} from './interface';
import { objectType, PropTypes } from '@antdv/utils';

export function menuDividerProps() {
  return {
    prefixCls: String,
    dashed: Boolean,
  };
}

export function menuItemGroupProps() {
  return {
    title: PropTypes.any,
    // Internal user prop
    originItemValue: objectType<ItemType>(),
  };
}

export function menuProps() {
  return {
    'id': String,
    'prefixCls': String,
    // donot use items, now only support inner use
    'items': Array as PropType<ItemType[]>,
    'disabled': Boolean,
    'inlineCollapsed': Boolean,
    'disabledOverflow': Boolean,
    'forceSubMenuRender': Boolean,
    'openKeys': Array as PropType<Key[]>,
    'selectedKeys': Array as PropType<Key[]>,
    'activeKey': String, // 内部组件使用
    'selectable': { type: Boolean, default: true },
    'multiple': { type: Boolean, default: false },
    'tabindex': { type: [Number, String] },
    'motion': Object as PropType<CSSMotionProps>,
    'role': String,
    'theme': { type: String as PropType<MenuTheme>, default: 'light' },
    'mode': { type: String as PropType<MenuMode>, default: 'vertical' },

    'inlineIndent': { type: Number, default: 24 },
    'subMenuOpenDelay': { type: Number, default: 0 },
    'subMenuCloseDelay': { type: Number, default: 0.1 },

    'builtinPlacements': { type: Object as PropType<BuiltinPlacements> },

    'triggerSubMenuAction': { type: String as PropType<TriggerSubMenuAction>, default: 'hover' },

    'getPopupContainer': Function as PropType<(node: HTMLElement) => HTMLElement>,

    'expandIcon': Function as PropType<(p?: { isOpen: boolean, [key: string]: any }) => any>,
    'onOpenChange': Function as PropType<(keys: Key[]) => void>,
    'onSelect': Function as PropType<SelectEventHandler>,
    'onDeselect': Function as PropType<SelectEventHandler>,
    'onClick': [Function, Array] as PropType<MenuClickEventHandler>,
    'onFocus': Function as PropType<FocusEventHandler>,
    'onBlur': Function as PropType<FocusEventHandler>,
    'onMousedown': Function as PropType<MouseEventHandler>,
    'onUpdate:openKeys': Function as PropType<(keys: Key[]) => void>,
    'onUpdate:selectedKeys': Function as PropType<(keys: Key[]) => void>,
    'onUpdate:activeKey': Function as PropType<(key: Key) => void>,
  };
}

export function menuItemProps() {
  return {
    id: String,
    role: String,
    disabled: Boolean,
    danger: Boolean,
    title: { type: [String, Boolean], default: undefined },
    icon: PropTypes.any,
    onMouseenter: Function as PropType<MouseEventHandler>,
    onMouseleave: Function as PropType<MouseEventHandler>,
    onClick: Function as PropType<MouseEventHandler>,
    onKeydown: Function as PropType<MouseEventHandler>,
    onFocus: Function as PropType<MouseEventHandler>,
    // Internal user prop
    originItemValue: objectType<ItemType>(),
  };
}

export function subMenuProps() {
  return {
    icon: PropTypes.any,
    title: PropTypes.any,
    disabled: Boolean,
    level: Number,
    popupClassName: String,
    popupOffset: Array as unknown as PropType<[number, number]>,
    internalPopupClose: Boolean,
    eventKey: String,
    expandIcon: Function as PropType<(p?: { isOpen: boolean, [key: string]: any }) => any>,
    theme: String as PropType<MenuTheme>,
    onMouseenter: Function as PropType<MouseEventHandler>,
    onMouseleave: Function as PropType<MouseEventHandler>,
    onTitleClick: Function as PropType<(e: MouseEvent, key: Key) => void>,

    // Internal user prop
    originItemValue: objectType<ItemType>(),
  };
}

export type SubMenuProps = Partial<ExtractPropTypes<ReturnType<typeof subMenuProps>>>;

export type MenuItemProps = Partial<ExtractPropTypes<ReturnType<typeof menuItemProps>>>;

export type MenuProps = Partial<ExtractPropTypes<ReturnType<typeof menuProps>>>;

export type MenuDividerProps = Partial<ExtractPropTypes<ReturnType<typeof menuDividerProps>>>;

export type MenuItemGroupProps = Partial<ExtractPropTypes<ReturnType<typeof menuItemGroupProps>>>;
