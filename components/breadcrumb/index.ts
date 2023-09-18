import breadcrumb from './Breadcrumb'
import breadcrumbItem from './BreadcrumbItem'
import breadcrumbSeparator from './BreadcrumbSeparator'
import type { App, Plugin } from 'vue'

export const BreadcrumbItem = breadcrumbItem
export const BreadcrumbSeparator = breadcrumbSeparator

export const Breadcrumb = Object.assign(breadcrumb, {
  Item: breadcrumbItem,
  Separator: breadcrumbSeparator,
  install(app: App) {
    app.component(breadcrumb.name, breadcrumb)
    app.component(breadcrumbItem.name, breadcrumbItem)
    app.component(breadcrumbSeparator.name, breadcrumbSeparator)
    return app
  },
})

export default Breadcrumb as typeof Breadcrumb &
Plugin & {
  readonly Item: typeof BreadcrumbItem
  readonly Separator: typeof BreadcrumbSeparator
}

export * from './props'
export * from './types'
