<docs>
---
order: 5
title:
  zh-CN: 竖直方向的小型步骤条
  en-US: Vertical mini version
---

## zh-CN

简单的竖直方向的小型步骤条。

## en-US

A simple mini version step bar in the vertical direction.
</docs>

<script lang="ts" setup>
  const description = 'This is a description.';
</script>

<template>
  <a-steps
    direction="vertical"
    size="small"
    :current="1"
    :items="[
      { title: 'Finished', description },
      {
        title: 'In Progress',
        description,
      },
      {
        title: 'Waiting',
        description,
      },
    ]"
  />
</template>
