<docs>
---
order: 4
title:
  zh-CN: 主题
  en-US: Menu Themes
---

## zh-CN

内建了两套主题 `light` 和 `dark`，默认 `light`。

## en-US

There are two built-in themes: `light` and `dark`. The default value is `light`.

</docs>

<script lang="ts" setup>
  import type { MenuTheme } from '@antdv/ui';
  import { AppstoreOutlined, CalendarOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons-vue';
  import { h, ref } from 'vue';

  const theme = ref<MenuTheme>('dark');
  const selectedKeys = ref<any>(['1']);
  const openKeys = ref<any>(['sub1']);
  const items = ref<any>([
    {
      key: '1',
      icon: () => h(MailOutlined),
      label: 'Navigation One',
      title: 'Navigation One',
    },
    {
      key: '2',
      icon: () => h(CalendarOutlined),
      label: 'Navigation Two',
      title: 'Navigation Two',
    },
    {
      key: 'sub1',
      icon: () => h(AppstoreOutlined),
      label: 'Navigation Three',
      title: 'Navigation Three',
      children: [
        {
          key: '3',
          label: 'Option 3',
          title: 'Option 3',
        },
        {
          key: '4',
          label: 'Option 4',
          title: 'Option 4',
        },
        {
          key: 'sub1-2',
          label: 'Submenu',
          title: 'Submenu',
          children: [
            {
              key: '5',
              label: 'Option 5',
              title: 'Option 5',
            },
            {
              key: '6',
              label: 'Option 6',
              title: 'Option 6',
            },
          ],
        },
      ],
    },
    {
      key: 'sub2',
      icon: () => h(SettingOutlined),
      label: 'Navigation Four',
      title: 'Navigation Four',
      children: [
        {
          key: '7',
          label: 'Option 7',
          title: 'Option 7',
        },
        {
          key: '8',
          label: 'Option 8',
          title: 'Option 8',
        },
        {
          key: '9',
          label: 'Option 9',
          title: 'Option 9',
        },
        {
          key: '10',
          label: 'Option 10',
          title: 'Option 10',
        },
      ],
    },
  ]);
  function changeTheme(checked: boolean) {
    theme.value = checked ? 'dark' : 'light';
  }
</script>

<template>
  <div>
    <a-switch
      :checked="theme === 'dark'"
      checked-children="Dark"
      un-checked-children="Light"
      @change="changeTheme"
    />
    <br />
    <br />
    <a-menu
      v-model:open-keys="openKeys"
      v-model:selected-keys="selectedKeys"
      style="width: 256px"
      mode="inline"
      :theme="theme"
      :items="items"
    />
  </div>
</template>
