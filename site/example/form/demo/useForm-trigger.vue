<docs>
---
order: 10
title:
  zh-CN: useForm 自定义触发时机
  en-US: useForm custom trigger
---

## zh-CN

通过 [`Form.useForm`](#useform) 自定义触发校验时机

## en-US

use [`Form.useForm`](#useform) custom trigger to validation logic and status.
</docs>

<script lang="ts" setup>
  import { Form } from '@antdv/ui';
  import { reactive, toRaw } from 'vue';

  const useForm = Form.useForm;

  const labelCol = { span: 4 };
  const wrapperCol = { span: 14 };
  const modelRef = reactive({
    name: '',
    region: undefined,
  });
  const rulesRef = reactive({
    name: [
      {
        required: true,
        message: 'Please input Activity name',
      },
      {
        min: 3,
        max: 5,
        message: 'Length should be 3 to 5',
        trigger: 'blur',
      },
    ],
    region: [
      {
        required: true,
        message: 'Please select region',
      },
    ],
  });
  const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef);
  function onSubmit() {
    validate()
      .then(() => {
        console.log(toRaw(modelRef));
      })
      .catch((err) => {
        console.log('error', err);
      });
  }
</script>

<template>
  <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="Activity name" v-bind="validateInfos.name">
      <a-input
        v-model:value="modelRef.name"
        @blur="validate('name', { trigger: 'blur' }).catch(() => {})"
      />
    </a-form-item>
    <a-form-item label="Activity zone" v-bind="validateInfos.region">
      <a-select v-model:value="modelRef.region" placeholder="please select your zone">
        <a-select-option value="shanghai">Zone one</a-select-option>
        <a-select-option value="beijing">Zone two</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click.prevent="onSubmit">Create</a-button>
      <a-button style="margin-left: 10px" @click="resetFields">Reset</a-button>
    </a-form-item>
  </a-form>
</template>
