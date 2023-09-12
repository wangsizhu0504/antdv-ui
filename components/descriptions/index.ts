import Descriptions from './Descriptions'
import Item from './Item'
import type { App, Plugin } from 'vue'

const ADescriptions = Descriptions
export const DescriptionsItem = Item

ADescriptions.install = function (app: App) {
  app.component(Descriptions.name, Descriptions)
  app.component(Descriptions.Item.name, Descriptions.Item)
  return app
}

export default Descriptions as typeof Descriptions & Plugin & {
  readonly Item: typeof DescriptionsItem
}

export * from './props'
export * from './type'
