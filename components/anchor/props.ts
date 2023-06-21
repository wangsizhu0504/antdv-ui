import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import type { VueNode } from '../_util/type'
import { anyType, arrayType, objectType } from '../_util/type'
import PropTypes from '../_util/vue-types'
import type { AnchorContainer, AnchorDirection, AnchorLinkItemProps } from './type'

export const anchorProps = {
  prefixCls: String,
  offsetTop: Number,
  bounds: Number,
  affix: { type: Boolean, default: true },
  showInkInFixed: { type: Boolean, default: false },
  getContainer: Function as PropType<() => AnchorContainer>,
  wrapperClass: String,
  wrapperStyle: { type: Object as PropType<CSSProperties>, default: undefined as CSSProperties },
  getCurrentAnchor: Function as PropType<(activeLink: string) => string>,
  targetOffset: Number,
  items: arrayType<AnchorLinkItemProps[]>(),
  direction: PropTypes.oneOf(['vertical', 'horizontal'] as AnchorDirection[]).def('vertical'),
  onChange: Function as PropType<(currentActiveLink: string) => void>,
  onClick: Function as PropType<(e: MouseEvent, link: { title: any; href: string }) => void>,
}

export const anchorLinkProps = {
  prefixCls: String,
  href: String,
  title: anyType<VueNode | ((item: any) => VueNode)>(),
  target: String,
  /* private use  */
  customTitleProps: objectType<AnchorLinkItemProps>(),
}

export type AnchorProps = Partial<ExtractPropTypes<typeof anchorProps>>

export type AnchorLinkProps = Partial<ExtractPropTypes<typeof anchorLinkProps>>
