<docs>
---
order: 2
title:
  zh-CN: 滚动容器
  en-US: Container to scroll.
---

## zh-CN

用 `target` 设置 `Affix` 需要监听其滚动事件的元素，默认为 `window`。

## en-US

Set a `target` for 'Affix', which is listen to scroll event of target element (default is `window`).

</docs>

<script lang="ts" setup>
  import { ref } from 'vue';

  const containerRef = ref<any>();
</script>

<template>
  <div id="components-affix-demo-target" ref="containerRef" class="scrollable-container">
    <div class="background">
      <a-affix :target="() => containerRef">
        <a-button type="primary">
          Fixed at the top of container
        </a-button>
      </a-affix>
    </div>
  </div>
</template>

<style scoped>
#components-affix-demo-target.scrollable-container {
  height: 100px;
  overflow-y: scroll;
}

#components-affix-demo-target .background {
  padding-top: 60px;
  height: 300px;
  background-image: url('https://zos.alipayobjects.com/rmsportal/RmjwQiJorKyobvI.jpg');
}
</style>
