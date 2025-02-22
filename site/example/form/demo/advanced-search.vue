<docs>
---
order: 13
title:
  zh-CN: 高级搜索
  en-US: Advanced search
---

## zh-CN

三列栅格式的表单排列方式，常用于数据表格的高级搜索。

有部分定制的样式代码，由于输入标签长度不确定，需要根据具体情况自行调整。

## en-US

Three columns layout is often used for advanced searching of data table.

Because the width of label is not fixed, you may need to adjust it by customizing its style.

</docs>

<script lang="ts" setup>
  import type { FormInstance } from '@antdv/ui';
  import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
  import { reactive, ref } from 'vue';

  const expand = ref<any>(false);
  const formRef = ref<FormInstance>();
  const formState = reactive({});
  function onFinish(values: any) {
    console.log('Received values of form: ', values);
    console.log('formState: ', formState);
  }
</script>

<template>
  <div>
    <a-form
      ref="formRef"
      name="advanced_search"
      class="ant-advanced-search-form"
      :model="formState"
      @finish="onFinish"
    >
      <a-row :gutter="24">
        <template v-for="i in 10" :key="i">
          <a-col v-show="expand || i <= 6" :span="8">
            <a-form-item
              :name="`field-${i}`"
              :label="`field-${i}`"
              :rules="[{ required: true, message: 'input something' }]"
            >
              <a-input v-model:value="formState[`field-${i}`]" placeholder="placeholder"/>
            </a-form-item>
          </a-col>
        </template>
      </a-row>
      <a-row>
        <a-col :span="24" style="text-align: right">
          <a-button type="primary" html-type="submit">Search</a-button>
          <a-button style="margin: 0 8px" @click="() => formRef.resetFields()">Clear</a-button>
          <a style="font-size: 12px" @click="expand = !expand">
            <template v-if="expand">
              <UpOutlined />
            </template>
            <template v-else>
              <DownOutlined />
            </template>
            Collapse
          </a>
        </a-col>
      </a-row>
    </a-form>
    <div class="search-result-list">Search Result List</div>
  </div>
</template>

<style scoped>
#site-example-form-demo-advanced-search .ant-form {
  max-width: none;
}
#site-example-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 2px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}
[data-theme='dark'] .ant-advanced-search-form {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid #434343;
  padding: 24px;
  border-radius: 2px;
}
[data-theme='dark'] #site-example-form-demo-advanced-search .search-result-list {
  border: 1px dashed #434343;
  background: rgba(255, 255, 255, 0.04);
}
</style>
