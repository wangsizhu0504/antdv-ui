<docs>
---
order: 10
title:
  zh-CN: 内联登录栏
  en-US: Inline Login Form
---

## zh-CN

内联登录栏，常用在顶部导航栏中。

## en-US

Inline login form is often used in navigation bar.

</docs>

<script lang="ts" setup>
  import { LockOutlined, UserOutlined } from '@ant-design/icons-vue';
  import { computed, reactive } from 'vue';

  interface FormState {
    username: string;
    password: string;
  }
  const formState = reactive<FormState>({
    username: '',
    password: '',
  });
  function onFinish(values: any) {
    console.log('Success:', values);
  }

  function onFinishFailed(errorInfo: any) {
    console.log('Failed:', errorInfo);
  }
  const disabled = computed(() => {
    return !(formState.username && formState.password);
  });
</script>

<template>
  <a-form
    :model="formState"
    name="horizontal_login"
    layout="inline"
    autocomplete="off"
    @finish="onFinish"
    @finish-failed="onFinishFailed"
  >
    <a-form-item
      label="Username"
      name="username"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.username">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </a-input-password>
    </a-form-item>

    <a-form-item>
      <a-button :disabled="disabled" type="primary" html-type="submit">Log in</a-button>
    </a-form-item>
  </a-form>
</template>
