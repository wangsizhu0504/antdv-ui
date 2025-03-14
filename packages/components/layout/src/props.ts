import type { CSSProperties, ExtractPropTypes, HTMLAttributes, PropType } from 'vue';
import type { CollapseType } from './interface';
import { PropTypes, tuple } from '@antdv/utils';

export function layoutProps() {
  return {
    prefixCls: String,
    hasSider: { type: Boolean, default: undefined },
    tagName: String,
  };
}
export function siderProps() {
  return {
    prefixCls: String,
    collapsible: { type: Boolean, default: undefined },
    collapsed: { type: Boolean, default: undefined },
    defaultCollapsed: { type: Boolean, default: undefined },
    reverseArrow: { type: Boolean, default: undefined },
    zeroWidthTriggerStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({}),
    },
    trigger: PropTypes.any,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    collapsedWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    breakpoint: PropTypes.oneOf(tuple('xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl')),
    theme: PropTypes.oneOf(tuple('light', 'dark')).def('dark'),
    onBreakpoint: Function as PropType<(broken: boolean) => void>,
    onCollapse: Function as PropType<(collapsed: boolean, type: CollapseType) => void>,
  };
}

export type SiderProps = Partial<ExtractPropTypes<ReturnType<typeof siderProps>>>;

export type LayoutProps = Partial<ExtractPropTypes<ReturnType<typeof layoutProps>>> & HTMLAttributes;
