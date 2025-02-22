import type { App, Plugin } from 'vue';
import AListItem from './src/Item';
import AListItemMeta from './src/ItemMeta';
import AList from './src/List';

export const ListItem = AListItem;
export const ListItemMeta = AListItemMeta;

export const List = Object.assign(AList, {
  Item: AListItem,
  ItemMeta: AListItemMeta,
  install(app: App) {
    app.component(AList.name, AList);
    app.component(AListItem.name, AListItem);
    app.component(AListItemMeta.name, AListItemMeta);
    return app;
  },
});

export default List as typeof List & Plugin & {
  readonly Item: typeof ListItem & {
    readonly Meta: typeof ListItemMeta
  }
};

export * from './src/interface';
export * from './src/props';
