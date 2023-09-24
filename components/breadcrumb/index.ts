import ABreadcrumb from './src/Breadcrumb'
import ABreadcrumbItem from './src/BreadcrumbItem'
import ABreadcrumbSeparator from './src/BreadcrumbSeparator'
import type { App, Plugin } from 'vue'

export const BreadcrumbItem = ABreadcrumbItem
export const BreadcrumbSeparator = ABreadcrumbSeparator

export const Breadcrumb = Object.assign(ABreadcrumb, {
  Item: ABreadcrumbItem,
  Separator: ABreadcrumbSeparator,
  install(app: App) {
    app.component(ABreadcrumb.name, ABreadcrumb)
    app.component(ABreadcrumbItem.name, ABreadcrumbItem)
    app.component(ABreadcrumbSeparator.name, ABreadcrumbSeparator)
    return app
  },
})

export default Breadcrumb as typeof Breadcrumb &
Plugin & {
  readonly Item: typeof BreadcrumbItem
  readonly Separator: typeof BreadcrumbSeparator
}

export * from './src/props'
export * from './src/types'
