<docs>
---
order: 5
title:
  zh-CN: 切换菜单类型
  en-US: Switch the menu type
---

## zh-CN

展示动态切换模式。

## en-US

Show the dynamic switching mode (between `inline` and `vertical`).

</docs>

<script lang="ts" setup>
  import { h, reactive } from 'vue'
  import { AppstoreOutlined, CalendarOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons-vue'
  import type { ItemType, MenuMode, MenuTheme } from '@antdv/ui'

  const state = reactive({
    mode: 'inline' as MenuMode,
    theme: 'light' as MenuTheme,
    selectedKeys: ['1'],
    openKeys: ['sub1'],
  })

  function getItem(
    label: string,
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
    } as ItemType
  }

  const items: ItemType[] = reactive([
    getItem('Navigation One', '1', h(MailOutlined)),
    getItem('Navigation Two', '2', h(CalendarOutlined)),
    getItem('Navigation Two', 'sub1', h(AppstoreOutlined), [
      getItem('Option 3', '3'),
      getItem('Option 4', '4'),
      getItem('Submenu', 'sub1-2', null, [getItem('Option 5', '5'), getItem('Option 6', '6')]),
    ]),
    getItem('Navigation Three', 'sub2', h(SettingOutlined), [
      getItem('Option 7', '7'),
      getItem('Option 8', '8'),
      getItem('Option 9', '9'),
      getItem('Option 10', '10'),
    ]),
  ])

  function changeMode(checked: boolean) {
    state.mode = checked ? 'vertical' : 'inline'
  }

  function changeTheme(checked: boolean) {
    state.theme = checked ? 'dark' : 'light'
  }
</script>

<template>
  <div>
    <a-switch :checked="state.mode === 'vertical'" @change="changeMode" />
    Change Mode
    <span class="ant-divider" style="margin: 0 1em" />
    <a-switch :checked="state.theme === 'dark'" @change="changeTheme" />
    Change Theme
    <br />
    <br />
    <a-menu
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      style="width: 256px"
      :mode="state.mode"
      :items="items"
      :theme="state.theme"
    />
  </div>
</template>
