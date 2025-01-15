import type { Key } from '@antdv/types'
import type { VNode } from 'vue'
import type {
  ItemType,
  MenuDividerType as VcMenuDividerType,
  MenuItemGroupType as VcMenuItemGroupType,
  MenuItemType as VcMenuItemType,
  SubMenuType as VcSubMenuType,
} from '../interface'
import type { MenuProps } from '../props'
import type { StoreMenuInfo } from './useMenuContext'
import { ref, shallowRef, watch } from 'vue'
import MenuDivider from '../Divider'
import ItemGroup from '../ItemGroup'
import MenuItem from '../MenuItem'
import SubMenu from '../SubMenu'

export interface MenuItemType extends VcMenuItemType {
  danger?: boolean
  icon?: VNode | ((item: MenuItemType) => VNode)
  title?: string
}

export interface SubMenuType extends Omit<VcSubMenuType, 'children'> {
  icon?: VNode | ((item: SubMenuType) => VNode)
  children: ItemType[]
}

export interface MenuItemGroupType extends Omit<VcMenuItemGroupType, 'children'> {
  children?: MenuItemType[]
  key?: Key
}

export interface MenuDividerType extends VcMenuDividerType {
  dashed?: boolean
  key?: Key
}

function convertItemsToNodes(
  list: ItemType[],
  store: Map<string, StoreMenuInfo>,
  parentMenuInfo?: {
    childrenEventKeys: string[]
    parentKeys: string[]
  },
) {
  return (list || [])
    .map((opt, index) => {
      if (opt && typeof opt === 'object') {
        const { label, children, key, type, ...restProps } = opt as any
        const mergedKey = key ?? `tmp-${index}`
        // 此处 eventKey === key, 移除 children 后可以移除 eventKey
        const parentKeys = parentMenuInfo ? parentMenuInfo.parentKeys.slice() : []
        const childrenEventKeys = []
        // if
        const menuInfo = {
          eventKey: mergedKey,
          key: mergedKey,
          parentEventKeys: ref<string[]>(parentKeys),
          parentKeys: ref<string[]>(parentKeys),
          childrenEventKeys: ref<string[]>(childrenEventKeys),
          isLeaf: false,
        }

        // MenuItemGroup & SubMenuItem
        if (children || type === 'group') {
          if (type === 'group') {
            const childrenNodes = convertItemsToNodes(children, store, parentMenuInfo)
            // Group
            return (
              <ItemGroup key={mergedKey} {...restProps} title={label} originItemValue={opt}>
                {childrenNodes}
              </ItemGroup>
            )
          }
          store.set(mergedKey, menuInfo)
          if (parentMenuInfo)
            parentMenuInfo.childrenEventKeys.push(mergedKey)

          // Sub Menu
          const childrenNodes = convertItemsToNodes(children, store, {
            childrenEventKeys,
            parentKeys: [].concat(parentKeys, mergedKey),
          })
          return (
            <SubMenu key={mergedKey} {...restProps} title={label} originItemValue={opt}>
              {childrenNodes}
            </SubMenu>
          )
        }

        // MenuItem & Divider
        if (type === 'divider')
          return <MenuDivider key={mergedKey} {...restProps} />

        menuInfo.isLeaf = true
        store.set(mergedKey, menuInfo)
        return (
          <MenuItem key={mergedKey} {...restProps} originItemValue={opt}>
            {label}
          </MenuItem>
        )
      }

      return null
    })
    .filter(opt => opt)
}

// FIXME: Move logic here in v4
/**
 * We simply convert `items` to VueNode for reuse origin component logic. But we need move all the
 * logic from component into this hooks when in v4
 */
export default function useItems(props: MenuProps) {
  const itemsNodes = shallowRef([])
  const hasItmes = shallowRef(false)
  const store = shallowRef(new Map<string, StoreMenuInfo>())
  watch(
    () => props.items,
    () => {
      const newStore = new Map<string, StoreMenuInfo>()
      hasItmes.value = false
      if (props.items) {
        hasItmes.value = true
        itemsNodes.value = convertItemsToNodes(props.items as ItemType[], newStore)
      } else {
        itemsNodes.value = undefined
      }
      store.value = newStore
    },
    { immediate: true, deep: true },
  )
  return { itemsNodes, store, hasItmes }
}
