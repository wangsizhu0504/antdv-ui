import Breadcrumb from './Breadcrumb'
import BreadcrumbItem from './BreadcrumbItem'
import BreadcrumbSeparator from './BreadcrumbSeparator'
import type { App, Plugin } from 'vue'

export * from './props'
export * from './type'

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
