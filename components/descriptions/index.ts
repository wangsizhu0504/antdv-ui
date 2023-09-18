import descriptions from './Descriptions'
import item from './Item'
import type { App, Plugin } from 'vue'

export const DescriptionsItem = item

export const Descriptions = Object.assign(descriptions, {
  Item: item,
  install(app: App) {
    app.component(descriptions.name, descriptions)
    app.component(item.name, item)
    return app
  },
})

export default Descriptions as typeof Descriptions & Plugin & {
  readonly Item: typeof DescriptionsItem
}

export * from './props'
export * from './types'
