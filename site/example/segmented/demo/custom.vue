<docs>
---
order: 5
title:
  zh-CN: 自定义渲染
  en-US: Custom
---

## zh-CN

自定义渲染每一个 Segmented Item。

## en-US
Custom each Segmented Item.
</docs>

<script lang="ts" setup>
  import { UserOutlined } from '@ant-design/icons-vue';
  import { Segmented } from '@antdv/ui';
  import { ref } from 'vue';

  const ASegmented = Segmented;
  const data = ref<any>([
    {
      value: 'user1',
      payload: {
        src: 'https://joeschmoe.io/api/v1/random',
        style: { backgroundColor: '#f56a00' },
      },
    },
    {
      value: 'user2',
      payload: {
        style: { backgroundColor: '#f56a00' },
        content: 'K',
      },
    },
    {
      value: 'user3',
      payload: {
        icon: UserOutlined,
        style: { backgroundColor: '#f56a00' },
      },
    },
  ]);
  const options2 = ref<any>([
    {
      value: 'spring',
      payload: {
        title: 'Spring',
        subTitle: 'Jan-Mar',
      },
    },
    {
      value: 'summer',
      payload: {
        title: 'Summer',
        subTitle: 'Apr-Jun',
      },
    },
    {
      value: 'autumn',
      payload: {
        title: 'Autumn',
        subTitle: 'Jul-Sept',
      },
    },
    {
      value: 'winter',
      payload: {
        title: 'Winter',
        subTitle: 'Oct-Dec',
      },
    },
  ]);
  const value = ref<any>('user1');
  const value2 = ref<any>('spring');
</script>

<template>
  <ASegmented v-model:value="value" :options="data">
    <template #label="{ value: val, payload = {} }">
      <div style="padding: 4px 4px">
        <template v-if="payload.icon">
          <a-avatar :src="payload.src" :style="payload.style">
            <template #icon><component :is="payload.icon" /></template>
            {{ payload.content }}
          </a-avatar>
        </template>
        <template v-else>
          <a-avatar :src="payload.src" :style="payload.style">
            {{ payload.content }}
          </a-avatar>
        </template>
        <div>{{ val }}</div>
      </div>
    </template>
  </ASegmented>
  <br />
  <br />
  <ASegmented v-model:value="value2" :options="options2">
    <template #label="{ payload }">
      <div style="padding: 4px 4px">
        <div>{{ payload.title }}</div>
        <div>{{ payload.subTitle }}</div>
      </div>
    </template>
  </ASegmented>
</template>
