<script lang="ts">
  import { defineComponent } from 'vue';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import Basic from './basic.vue';
  import Event from './event.vue';
  import IconSlider from './icon-slider.vue';
  import InputNumber from './input-number.vue';
  import Mark from './mark.vue';
  import Reverse from './reverse.vue';
  import ShowTooltip from './show-tooltip.vue';
  import TipFormatter from './tip-formatter.vue';
  import Vertical from './vertical.vue';

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      InputNumber,
      IconSlider,
      TipFormatter,
      Event,
      Mark,
      Vertical,
      ShowTooltip,
      Reverse,
    },
    setup() {
      return {};
    },
  });
</script>

<template>
  <demo-sort>
    <Basic />
    <InputNumber />
    <IconSlider />
    <TipFormatter />
    <Event />
    <Mark />
    <Vertical />
    <ShowTooltip />
    <Reverse />
  </demo-sort>
</template>
