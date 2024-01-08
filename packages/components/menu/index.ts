import type { App, Plugin } from 'vue'
import AMenu from './src/Menu'
import AMenuItem from './src/MenuItem'
import ASubMenu from './src/SubMenu'
import AItemGroup from './src/ItemGroup'
import ADivider from './src/Divider'

export const Submenu = ASubMenu

export const Menu = Object.assign(AMenu, {
  Item: AMenuItem,
  SubMenu: ASubMenu,
  Divider: ADivider,
  ItemGroup: AItemGroup,
  install(app: App) {
    app.component(AMenu.name, AMenu)
    app.component(AMenuItem.name, AMenuItem)
    app.component(ASubMenu.name, ASubMenu)
    app.component(ADivider.name, ADivider)
    app.component(AItemGroup.name, AItemGroup)
    return app
  },

})
export const MenuItem = AMenuItem
export const SubMenu = ASubMenu
export const MenuDivider = ADivider
export const MenuItemGroup = AItemGroup
export const Item = AMenuItem
export const ItemGroup = AItemGroup

export default Menu as typeof Menu & Plugin & {
  readonly Item: typeof AMenuItem
  readonly SubMenu: typeof ASubMenu
  readonly Divider: typeof ADivider
  readonly ItemGroup: typeof AItemGroup
}

export * from './src/props'
export * from './src/types'

export * from './src/OverrideContext'
