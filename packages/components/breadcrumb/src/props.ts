import type { MouseEventHandler, VueNode } from '@antdv/types';

import type { ExtractPropTypes, PropType } from 'vue';
import type { DropdownProps } from '../../dropdown';
import type { Route } from './interface';
import { eventType, objectType, PropTypes } from '@antdv/utils';

export function breadcrumbProps() {
  return {
    prefixCls: String,
    routes: { type: Array as PropType<Route[]> },
    params: PropTypes.any,
    separator: PropTypes.any,
    itemRender: {
      type: Function as PropType<
        (opt: { route: Route, params: unknown, routes: Route[], paths: string[] }) => VueNode
      >,
    },
  };
}

export function breadcrumbItemProps() {
  return {
    prefixCls: String,
    href: String,
    separator: PropTypes.any,
    dropdownProps: objectType<DropdownProps>(),
    overlay: PropTypes.any,
    onClick: eventType<MouseEventHandler>(),
  };
}

export function breadcrumbSeparatorProps() {
  return {
    prefixCls: String,
  };
}

export type BreadcrumbProps = Partial<ExtractPropTypes<ReturnType<typeof breadcrumbProps>>>;

export type BreadcrumbItemProps = Partial<ExtractPropTypes<ReturnType<typeof breadcrumbItemProps>>>;

export type BreadcrumbSeparatorProps = Partial<ExtractPropTypes<ReturnType<typeof breadcrumbSeparatorProps>>>;
