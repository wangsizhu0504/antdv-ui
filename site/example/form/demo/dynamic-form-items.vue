<docs>
---
order: 4.1
title:
  zh-CN: 动态增减嵌套字段
  en-US: Dynamic Form nest Items
---

## zh-CN

通过数组 name 绑定嵌套字段

## en-US

Bind nested fields by array name.

</docs>

<script lang="ts" setup>
  import type { FormInstance } from '@antdv/ui';
  import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import { reactive, ref } from 'vue';

  interface User {
    first: string;
    last: string;
    id: number;
  }
  const formRef = ref<FormInstance>();
  const dynamicValidateForm = reactive<{ users: User[] }>({
    users: [],
  });
  function removeUser(item: User) {
    const index = dynamicValidateForm.users.indexOf(item);
    if (index !== -1) {
      dynamicValidateForm.users.splice(index, 1);
    }
  }
  function addUser() {
    dynamicValidateForm.users.push({
      first: '',
      last: '',
      id: Date.now(),
    });
  }
  function onFinish(values) {
    console.log('Received values of form:', values);
    console.log('dynamicValidateForm.users:', dynamicValidateForm.users);
  }
</script>

<template>
  <a-form
    ref="formRef"
    name="dynamic_form_nest_item"
    :model="dynamicValidateForm"
    @finish="onFinish"
  >
    <a-space
      v-for="(user, index) in dynamicValidateForm.users"
      :key="user.id"
      style="display: flex; margin-bottom: 8px"
      align="baseline"
    >
      <a-form-item
        :name="['users', index, 'first']"
        :rules="{
          required: true,
          message: 'Missing first name',
        }"
      >
        <a-input v-model:value="user.first" placeholder="First Name" />
      </a-form-item>
      <a-form-item
        :name="['users', index, 'last']"
        :rules="{
          required: true,
          message: 'Missing last name',
        }"
      >
        <a-input v-model:value="user.last" placeholder="Last Name" />
      </a-form-item>
      <MinusCircleOutlined @click="removeUser(user)" />
    </a-space>
    <a-form-item>
      <a-button type="dashed" block @click="addUser">
        <PlusOutlined />
        Add user
      </a-button>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
