import type { VueNode } from '@antdv/types';
import type { CSSProperties, ExtractPropTypes, PropType } from 'vue';
import type { AnchorContainer, AnchorDirection, AnchorLinkItemProps } from './interface';

import { anyType, arrayType, objectType, PropTypes } from '@antdv/utils';

export function anchorProps() {
  return {
    prefixCls: String,
    offsetTop: Number,
    bounds: Number,
    affix: { type: Boolean, default: true },
    showInkInFixed: { type: Boolean, default: false },
    getContainer: Function as PropType<() => AnchorContainer>,
    wrapperClass: String,
    wrapperStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) as CSSProperties },
    getCurrentAnchor: Function as PropType<(activeLink: string) => string>,
    targetOffset: Number,
    items: arrayType<AnchorLinkItemProps[]>(),
    direction: PropTypes.oneOf(['vertical', 'horizontal'] as AnchorDirection[]).def('vertical'),
    onChange: Function as PropType<(currentActiveLink: string) => void>,
    onClick: Function as PropType<(e: MouseEvent, link: { title: any, href: string }) => void>,
  };
}

export function anchorLinkProps() {
  return {
    prefixCls: String,
    href: {
      type: String,
      default: '#',
    },
    title: anyType<VueNode | ((item: any) => VueNode)>(),
    target: String,
    /* private use  */
    customTitleProps: objectType<AnchorLinkItemProps>(),
  };
}

export type AnchorProps = Partial<ExtractPropTypes<ReturnType<typeof anchorProps>>>;

export type AnchorLinkProps = Partial<ExtractPropTypes<ReturnType<typeof anchorLinkProps>>>;
