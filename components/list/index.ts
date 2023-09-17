import list from './List'
import item from './Item'
import itemMeta from './ItemMeta'
import type { App, Plugin } from 'vue'

export const List = list
export const ListItem = item
export const ListItemMeta = itemMeta

/* istanbul ignore next */
List.install = function (app: App) {
  app.component(List.name, List)
  app.component(ListItem.name, ListItem)
  app.component(ListItemMeta.name, ListItemMeta)
  return app
}

export default List as typeof List & Plugin & {
  readonly Item: typeof ListItem & {
    readonly Meta: typeof ListItemMeta
  }
}

export * from './props'
export * from './type'
