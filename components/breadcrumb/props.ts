import PropTypes from '../_util/vue-types'
import { type VueNode, eventType, objectType } from '../_util/type'

import type { ExtractPropTypes, PropType } from 'vue'
import type { Route } from './type'
import type { MouseEventHandler } from '../_util/EventInterface'
import type { DropdownProps } from '../dropdown'

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
