<docs>
---
order: 9
title:
  zh-CN: useForm 嵌套表单
  en-US: useForm for nested Form
---

## zh-CN

通过 [`Form.useForm`](#useform)  使用点字符串拼接进行嵌套数据校验。

## en-US

[`Form.useForm`](#useform) use dot string splicing for nested data verification.
</docs>

<script lang="ts" setup>
  import { Form } from '@antdv/ui';
  import { reactive, toRaw } from 'vue';

  const useForm = Form.useForm;

  const labelCol = { span: 4 };
  const wrapperCol = { span: 14 };

  const modelRef = reactive({
    name: '',
    sub: {
      name: '',
    },
  });
  const { resetFields, validate, validateInfos } = useForm(
    modelRef,
    reactive({
      'name': [
        {
          required: true,
          message: 'Please input name',
        },
      ],
      'sub.name': [
        {
          required: true,
          message: 'Please input sub name',
        },
      ],
    }),
  );
  function onSubmit() {
    validate()
      .then((res) => {
        console.log(res, toRaw(modelRef));
      })
      .catch((err) => {
        console.log('error', err);
      });
  }
  function reset() {
    resetFields();
  }
</script>

<template>
  <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="Activity name" v-bind="validateInfos.name">
      <a-input v-model:value="modelRef.name" />
    </a-form-item>
    <a-form-item label="Sub name" v-bind="validateInfos['sub.name']">
      <a-input v-model:value="modelRef.sub.name" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click.prevent="onSubmit">Create</a-button>
      <a-button style="margin-left: 10px" @click="reset">Reset</a-button>
    </a-form-item>
  </a-form>
</template>
