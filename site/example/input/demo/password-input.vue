<docs>
---
order: 11
title:
  zh-CN: 密码框
  en-US: Password box
---

## zh-CN

密码框。

## en-US

Input type of password.

</docs>

<script lang="ts" setup>
  import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons-vue';
  import { ref } from 'vue';

  const value = ref<string>('');
  const value2 = ref<string>('');
  const value3 = ref<string>('');
  const value4 = ref<string>('');

  const visible = ref<boolean>(true);
</script>

<template>
  <a-space direction="vertical" size="middle" style="width: 100%">
    <a-input-password v-model:value="value" placeholder="input password" />
    <a-input-password v-model:value="value2" placeholder="input password">
      <template #iconRender="v">
        <EyeTwoTone v-if="v"/>
        <EyeInvisibleOutlined v-else/>
      </template>
    </a-input-password>
    <a-input-password
      v-model:value="value3"
      placeholder="input password"
      :visibility-toggle="false"
    />
    <a-space>
      <a-input-password
        v-model:value="value4"
        v-model:visible="visible"
        placeholder="input password"
      />
      <a-button @click="visible = !visible">{{ visible ? 'Hide' : 'Show' }}</a-button>
    </a-space>
  </a-space>
</template>
