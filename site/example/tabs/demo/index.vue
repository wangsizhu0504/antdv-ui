<script lang="ts">
  import { defineComponent } from 'vue';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import Basic from './basic.vue';
  import CardTop from './card-top.vue';
  import Card from './card.vue';
  import Centered from './centered.vue';
  import CustomAddTrigger from './custom-add-trigger.vue';
  import CustomTabBar from './custom-tab-bar.vue';
  import Disabled from './disabled.vue';
  import EditableCard from './editable-card.vue';
  import Extra from './extra.vue';
  import Icon from './icon.vue';
  import Position from './position.vue';
  import Size from './size.vue';
  import Slide from './slide.vue';

  export default defineComponent({
    category: 'Components',
    subtitle: '标签页',
    type: 'Data Display',
    title: 'Tabs',
    CN,
    US,
    components: {
      Centered,
      Basic,
      Card,
      CardTop,
      CustomAddTrigger,
      Disabled,
      EditableCard,
      Extra,
      Icon,
      Position,
      Size,
      Slide,
      CustomTabBar,
    },
  });
</script>

<template>
  <demo-sort :cols="1">
    <Basic />
    <Disabled />
    <Centered />
    <Icon />
    <Slide />
    <Extra />
    <Size />
    <Position />
    <Card />
    <EditableCard />
    <CardTop />
    <CustomAddTrigger />
    <CustomTabBar />
  </demo-sort>
</template>
