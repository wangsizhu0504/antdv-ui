<docs>
---
order: 2
title:
  zh-CN: 只展开当前父级菜单
  en-US: Open current submenu only
---

## zh-CN

点击菜单，收起其他展开的所有菜单，保持菜单聚焦简洁。

## en-US

Click the menu and you will see that all the other menus gets collapsed to keep the entire menu compact.

</docs>

<script lang="ts" setup>
  import type { ItemType } from '@antdv/ui';
  import type { VueElement } from 'vue';
  import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons-vue';
  import { h, reactive } from 'vue';

  function getItem(
    label: VueElement | string,
    key: string,
    icon?: any,
    children?: ItemType[],
    type?: 'group',
  ): ItemType {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as ItemType;
  }

  const items: ItemType[] = reactive([
    getItem('Navigation One', 'sub1', () => h(MailOutlined), [
      getItem('Option 1', '1'),
      getItem('Option 2', '2'),
      getItem('Option 3', '3'),
      getItem('Option 4', '4'),
    ]),
    getItem('Navigation Two', 'sub2', () => h(AppstoreOutlined), [
      getItem('Option 5', '5'),
      getItem('Option 6', '6'),
      getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),
    getItem('Navigation Three', 'sub4', () => h(SettingOutlined), [
      getItem('Option 9', '9'),
      getItem('Option 10', '10'),
      getItem('Option 11', '11'),
      getItem('Option 12', '12'),
    ]),
  ]);

  const state = reactive({
    rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
    openKeys: ['sub1'],
    selectedKeys: [],
  });
  function onOpenChange(openKeys: string[]) {
    const latestOpenKey = openKeys.find(key => !state.openKeys.includes(key));
    if (!state.rootSubmenuKeys.includes(latestOpenKey)) {
      state.openKeys = openKeys;
    } else {
      state.openKeys = latestOpenKey ? [latestOpenKey] : [];
    }
  }
</script>

<template>
  <div>
    <a-menu
      v-model:selected-keys="state.selectedKeys"
      style="width: 256px"
      mode="inline"
      :open-keys="state.openKeys"
      :items="items"
      @open-change="onOpenChange"
    />
  </div>
</template>
