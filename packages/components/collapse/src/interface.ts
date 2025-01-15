export type CollapsibleType = 'header' | 'icon' | 'disabled';

export type ActiveKeyType = Array<string | number> | string | number;

export interface PanelProps {
  isActive?: boolean
  header?: any
  showArrow?: boolean
  forceRender?: boolean
  /** @deprecated Use `collapsible="disabled"` instead */
  disabled?: boolean
  extra?: any
  collapsible?: CollapsibleType
}
