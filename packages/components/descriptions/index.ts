import type { App, Plugin } from 'vue'
import ADescriptions from './src/Descriptions'
import ADescriptionItem from './src/Item'

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

export * from './src/interface'
export * from './src/props'
