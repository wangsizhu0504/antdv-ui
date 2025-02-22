<docs>
---
order: 3
title:
  zh-CN: 确认对话框
  en-US: Confirmation modal dialog
---

## zh-CN

使用 `confirm()` 可以快捷地弹出确认框。

## en-US

To use `confirm()` to show a confirmation modal dialog.

</docs>

<script lang="ts" setup>
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { Modal } from '@antdv/ui';
  import { createVNode } from 'vue';

  function showConfirm() {
    Modal.confirm({
      title: 'Do you Want to delete these items?',
      icon: createVNode(ExclamationCircleOutlined),
      content: createVNode('div', { style: 'color:red;' }, 'Some descriptions'),
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
      class: 'test',
    });
  }
  function showDeleteConfirm() {
    Modal.confirm({
      title: 'Are you sure delete this task?',
      icon: createVNode(ExclamationCircleOutlined),
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  function showPropsConfirm() {
    Modal.confirm({
      title: 'Are you sure delete this task?',
      icon: createVNode(ExclamationCircleOutlined),
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      okButtonProps: {
        disabled: true,
      },
      cancelText: 'No',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  function showPromiseConfirm() {
    Modal.confirm({
      title: 'Do you want to delete these items?',
      icon: createVNode(ExclamationCircleOutlined),
      content: 'When clicked the OK button, this dialog will be closed after 1 second',
      async onOk() {
        try {
          return await new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          });
        } catch {
          return console.log('Oops errors!');
        }
      },
      onCancel() {},
    });
  }
</script>

<template>
  <a-space wrap>
    <a-button @click="showConfirm">Confirm</a-button>
    <a-button @click="showPromiseConfirm">With promise</a-button>
    <a-button type="dashed" @click="showDeleteConfirm">Delete</a-button>
    <a-button type="dashed" @click="showPropsConfirm">With extra props</a-button>
  </a-space>
</template>
