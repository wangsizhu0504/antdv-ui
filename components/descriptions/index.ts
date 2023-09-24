import ADescriptions from './src/Descriptions'
import ADescriptionItem from './src/Item'
import type { App, Plugin } from 'vue'

export const DescriptionsItem = ADescriptionItem

export const Descriptions = Object.assign(ADescriptions, {
  Item: ADescriptionItem,
  install(app: App) {
    app.component(ADescriptions.name, ADescriptions)
    app.component(ADescriptionItem.name, ADescriptionItem)
    return app
  },
})

export default Descriptions as typeof Descriptions & Plugin & {
  readonly Item: typeof DescriptionsItem
}

export * from './src/props'
export * from './src/types'
