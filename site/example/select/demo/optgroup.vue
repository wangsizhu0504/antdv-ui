<docs>
---
order: 7
title:
  zh-CN: 分组
  en-US: Option Group
---

## zh-CN

用 `OptGroup` 或 `options.options` 进行选项分组。

## en-US

Using `OptGroup` or `options.options` to group the options.

</docs>

<script lang="ts" setup>
  import type { SelectProps } from '@antdv/ui';
  import { UserOutlined } from '@ant-design/icons-vue';
  import { ref } from 'vue';

  function handleChange(value: string) {
    console.log(`selected ${value}`);
  }

  const options = ref<SelectProps['options']>([
    {
      label: 'Manager',
      options: [
        {
          value: 'jack',
          label: 'Jack',
        },
        {
          value: 'lucy',
          label: 'Lucy',
        },
      ],
    },
    {
      label: 'Engineer',
      options: [
        {
          value: 'yiminghe',
          label: 'Yiminghe',
        },
      ],
    },
  ]);

  const value = ref<any>(['lucy']);
</script>

<template>
  <a-space>
    <a-select v-model:value="value" style="width: 200px" @change="handleChange">
      <a-select-opt-group>
        <template #label>
          <span>
            <UserOutlined />
            Manager
          </span>
        </template>
        <a-select-option value="jack">Jack</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
      </a-select-opt-group>
      <a-select-opt-group label="Engineer">
        <a-select-option value="Yiminghe">yiminghe</a-select-option>
        <a-select-option value="Yiminghe1">yiminghe1</a-select-option>
      </a-select-opt-group>
    </a-select>
    <a-select
      v-model:value="value"
      :options="options"
      style="width: 200px"
      @change="handleChange"
    />
  </a-space>
</template>
