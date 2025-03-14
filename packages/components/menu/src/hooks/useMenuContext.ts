import type { CSSMotionProps, Key } from '@antdv/types';

import type { ComputedRef, InjectionKey, PropType, Ref } from 'vue';
import type { BuiltinPlacements, MenuClickEventHandler, MenuMode, MenuTheme, TriggerSubMenuAction } from '../interface';
import { defineComponent, inject, provide, toRef } from 'vue';

export interface StoreMenuInfo {
  eventKey: string
  key: Key
  parentEventKeys: Ref<string[]>
  childrenEventKeys?: Ref<string[]>
  isLeaf?: boolean
  parentKeys: Ref<Key[]>
}
export interface MenuContextProps {
  rootClassName: Ref<string>
  registerMenuInfo: (key: string, info: StoreMenuInfo) => void
  unRegisterMenuInfo: (key: string) => void
  prefixCls: ComputedRef<string>
  openKeys: Ref<Key[]>
  selectedKeys: Ref<Key[]>

  selectedSubMenuKeys: Ref<Array<number | string>>
  rtl?: ComputedRef<boolean>

  inlineCollapsed: Ref<boolean>
  theme?: ComputedRef<MenuTheme>

  siderCollapsed?: Ref<boolean>

  // // Mode
  mode: Ref<MenuMode>

  // // Disabled
  disabled?: ComputedRef<boolean>
  // // Used for overflow only. Prevent hidden node trigger open
  overflowDisabled?: Ref<boolean>

  // // Active
  activeKeys: Ref<Key[]>
  changeActiveKeys: (keys: Key[]) => void
  // onActive: (key: string) => void;
  // onInactive: (key: string) => void;

  // // Selection
  // selectedKeys: string[];

  // // Level
  inlineIndent: ComputedRef<number>

  // // Motion
  motion?: ComputedRef<CSSMotionProps | null>
  defaultMotions?: ComputedRef<Partial<{
    [key in MenuMode | 'other']: CSSMotionProps | ((name?: string) => CSSMotionProps);
  }> | null>

  // // Popup
  subMenuOpenDelay: ComputedRef<number>
  subMenuCloseDelay: ComputedRef<number>
  forceSubMenuRender: ComputedRef<boolean>
  builtinPlacements?: ComputedRef<BuiltinPlacements>
  triggerSubMenuAction?: ComputedRef<TriggerSubMenuAction>

  // // Icon
  // itemIcon?: RenderIconType;
  expandIcon?: ComputedRef<(p?: { isOpen: boolean, [key: string]: any }) => any>

  // // Function
  onItemClick: MenuClickEventHandler
  onOpenChange: (key: Key, open: boolean) => void
  getPopupContainer: ComputedRef<(node: HTMLElement) => HTMLElement>
}

const MenuContextKey: InjectionKey<MenuContextProps> = Symbol('menuContextKey');

function useProvideMenu(props: MenuContextProps) {
  provide(MenuContextKey, props);
}

function useInjectMenu() {
  return inject(MenuContextKey);
}

const ForceRenderKey: InjectionKey<boolean> = Symbol('ForceRenderKey');

export function useProvideForceRender(forceRender: boolean) {
  provide(ForceRenderKey, forceRender);
}

export function useInjectForceRender() {
  return inject(ForceRenderKey, false);
}

const MenuFirstLevelContextKey: InjectionKey<boolean> = Symbol('menuFirstLevelContextKey');
function useProvideFirstLevel(firstLevel: boolean) {
  provide(MenuFirstLevelContextKey, firstLevel);
}

function useInjectFirstLevel() {
  return inject(MenuFirstLevelContextKey, true);
}

const MenuContextProvider = defineComponent({
  compatConfig: { MODE: 3 },
  name: 'MenuContextProvider',
  inheritAttrs: false,
  props: {
    mode: { type: String as PropType<MenuMode>, default: undefined },
    overflowDisabled: { type: Boolean, default: undefined },
  },
  setup(props, { slots }) {
    const menuContext = useInjectMenu();
    const newContext = { ...menuContext };
    // 确保传入的属性不会动态增删
    // 不需要 watch 变化
    if (props.mode !== undefined)
      newContext.mode = toRef(props, 'mode');

    if (props.overflowDisabled !== undefined)
      newContext.overflowDisabled = toRef(props, 'overflowDisabled');

    useProvideMenu(newContext);
    return () => slots.default?.();
  },
});

export {
  MenuContextKey,
  MenuContextProvider,
  MenuFirstLevelContextKey,
  useInjectFirstLevel,
  useInjectMenu,
  useProvideFirstLevel,
  useProvideMenu,
};

export default useProvideMenu;
