<docs>
---
order: 4.2
title:
  zh-CN: 复杂的动态增减表单项
  en-US: Complex Dynamic Form Item
---

## zh-CN

这个例子演示了一个表单中包含多个表单控件的情况。

## en-US

This example demonstrates the case that a form contains multiple form controls.

</docs>

<script lang="ts" setup>
  import type { FormInstance } from '@antdv/ui';
  import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import { reactive, ref, watch } from 'vue';

  interface Sights {
    value: string;
    price: string;
    id: number;
  }
  const areas = [
    { label: 'Beijing', value: 'Beijing' },
    { label: 'Shanghai', value: 'Shanghai' },
  ];

  const sights = {
    Beijing: ['Tiananmen', 'Great Wall'],
    Shanghai: ['Oriental Pearl', 'The Bund'],
  };

  const formRef = ref<FormInstance>();
  const dynamicValidateForm = reactive<{ sights: Sights[]; area: string }>({
    sights: [],
    area: undefined,
  });
  watch(
    () => dynamicValidateForm.area,
    () => {
      dynamicValidateForm.sights = [];
    },
  );
  function removeSight(item: Sights) {
    const index = dynamicValidateForm.sights.indexOf(item);
    if (index !== -1) {
      dynamicValidateForm.sights.splice(index, 1);
    }
  }
  function addSight() {
    dynamicValidateForm.sights.push({
      value: undefined,
      price: undefined,
      id: Date.now(),
    });
  }
  function onFinish(values) {
    console.log('Received values of form:', values);
    console.log('dynamicValidateForm:', dynamicValidateForm);
  }
</script>

<template>
  <a-form
    ref="formRef"
    name="dynamic_form_nest_item"
    :model="dynamicValidateForm"
    @finish="onFinish"
  >
    <a-form-item name="area" label="Area" :rules="[{ required: true, message: 'Missing area' }]">
      <a-select v-model:value="dynamicValidateForm.area" :options="areas" />
    </a-form-item>
    <a-space
      v-for="(sight, index) in dynamicValidateForm.sights"
      :key="sight.id"
      style="display: flex; margin-bottom: 8px"
      align="baseline"
    >
      <a-form-item
        :name="['sights', index, 'value']"
        label="Sight"
        :rules="{
          required: true,
          message: 'Missing sight',
        }"
      >
        <a-select
          v-model:value="sight.value"
          :disabled="!dynamicValidateForm.area"
          :options="(sights[dynamicValidateForm.area] || []).map(a => ({ value: a }))"
          style="width: 130px"
        />
      </a-form-item>
      <a-form-item
        label="Price"
        :name="['sights', index, 'price']"
        :rules="{
          required: true,
          message: 'Missing price',
        }"
      >
        <a-input v-model:value="sight.price" />
      </a-form-item>
      <MinusCircleOutlined @click="removeSight(sight)" />
    </a-space>
    <a-form-item>
      <a-button type="dashed" block @click="addSight">
        <PlusOutlined />
        Add sights
      </a-button>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
