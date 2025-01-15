import type { Ref } from 'vue';

export interface GeneratorArgument {
  suffixCls: string
  tagName: 'header' | 'footer' | 'main' | 'section'
  name: string
}

export type SiderCollapsed = Ref<boolean>;
export type CollapseType = 'clickTrigger' | 'responsive';
export interface SiderContextProps {
  sCollapsed?: boolean
  collapsedWidth?: string | number
}
export interface SiderHookProvider {
  addSider?: (id: string) => void
  removeSider?: (id: string) => void
}
