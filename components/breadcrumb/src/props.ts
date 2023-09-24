import { PropTypes, eventType, objectType } from '../../_utils/vue'

import type { MouseEventHandler, VueNode } from '../../_utils/types'
import type { ExtractPropTypes, PropType } from 'vue'
import type { Route } from './types'
import type { DropdownProps } from '../../dropdown'

export const breadcrumbProps = () => ({
  prefixCls: String,
  routes: { type: Array as PropType<Route[]> },
  params: PropTypes.any,
  separator: PropTypes.any,
  itemRender: {
    type: Function as PropType<
      (opt: { route: Route, params: unknown, routes: Route[], paths: string[] }) => VueNode
    >,
  },
})

export const breadcrumbItemProps = () => ({
  prefixCls: String,
  href: String,
  separator: PropTypes.any,
  dropdownProps: objectType<DropdownProps>(),
  overlay: PropTypes.any,
  onClick: eventType<MouseEventHandler>(),
})

export const breadcrumbSeparatorProps = () => ({
  prefixCls: String,
})

export type BreadcrumbProps = Partial<ExtractPropTypes<ReturnType<typeof breadcrumbProps>>>

export type BreadcrumbItemProps = Partial<ExtractPropTypes<ReturnType<typeof breadcrumbItemProps>>>

export type BreadcrumbSeparatorProps = Partial<ExtractPropTypes<ReturnType<typeof breadcrumbSeparatorProps>>>
