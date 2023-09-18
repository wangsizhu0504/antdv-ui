import list from './List'
import item from './Item'
import itemMeta from './ItemMeta'
import type { App, Plugin } from 'vue'

export const ListItem = item
export const ListItemMeta = itemMeta

export const List = Object.assign(list, {
  Item: item,
  ItemMeta: itemMeta,
  install(app: App) {
    app.component(list.name, list)
    app.component(item.name, item)
    app.component(itemMeta.name, itemMeta)
    return app
  },
})

export default List as typeof List & Plugin & {
  readonly Item: typeof ListItem & {
    readonly Meta: typeof ListItemMeta
  }
}

export * from './props'
export * from './types'
