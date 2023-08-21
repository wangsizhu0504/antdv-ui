import Breadcrumb from './Breadcrumb'
import BreadcrumbItem from './BreadcrumbItem'
import BreadcrumbSeparator from './BreadcrumbSeparator'
import type { App, Plugin } from 'vue'

export type { BreadcrumbProps } from './Breadcrumb'
export type { BreadcrumbItemProps } from './BreadcrumbItem'
export type { BreadcrumbSeparatorProps } from './BreadcrumbSeparator'

const AntdBreadcrumb = Breadcrumb
AntdBreadcrumb.Item = BreadcrumbItem
AntdBreadcrumb.Separator = BreadcrumbSeparator

/* istanbul ignore next */
AntdBreadcrumb.install = function (app: App) {
  app.component(AntdBreadcrumb.name, AntdBreadcrumb)
  app.component(AntdBreadcrumb.Item.name, AntdBreadcrumb.Item)
  app.component(AntdBreadcrumb.Separator.name, AntdBreadcrumb.Separator)
  return app
}

export { BreadcrumbItem, BreadcrumbSeparator }
export default AntdBreadcrumb as typeof AntdBreadcrumb &
Plugin & {
  readonly Item: typeof BreadcrumbItem
  readonly Separator: typeof BreadcrumbSeparator
}
