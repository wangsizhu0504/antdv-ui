<docs>
---
order: 4
title:
  zh-CN: Promise 接口
  en-US: Promise interface
---

## zh-CN

可以通过 then 接口在关闭后运行 callback 。以上用例将在每个 message 将要结束时通过 then 显示新的 message 。

## en-US

`message` provides promise interface for `onClose`. The above example will display a new message when old message is about to finish.

</docs>

<script lang="ts" setup>
  import { message } from '@antdv/ui'

  function success() {
    message
      .loading('Action in progress..', 2.5)
      .then(
        () => message.success('Loading finished', 2.5),

        () => {},
      )
      .then(() => message.info('Loading finished is finished', 2.5))
  }
</script>

<template>
  <a-button @click="success">Display a sequence of message</a-button>
</template>
