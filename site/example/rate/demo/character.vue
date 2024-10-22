<docs>
---
order: 5
title:
  zh-CN: 其他字符
  en-US: Other Character
---

## zh-CN

可以将星星替换为其他字符，比如字母，数字，字体图标甚至中文。

## en-US

Replace the default star to other character like alphabet, digit, iconfont or even Chinese word.

</docs>

<script lang="ts" setup>
  import { HeartOutlined } from '@ant-design/icons-vue'
  import { ref } from 'vue'

  const value1 = ref<number>(2)
  const value2 = ref<number>(2.5)
  const value3 = ref<number>(0.5)
</script>

<template>
  <div>
    <a-rate v-model:value="value1" allow-half>
      <template #character>
        <HeartOutlined />
      </template>
    </a-rate>
    <br />
    <a-rate v-model:value="value2" character="A" allow-half style="font-size: 36px" />
    <br />
    <a-rate v-model:value="value3" character="好" allow-half />
    <br />
  </div>
</template>
