<script>
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import Hours from './12hours.vue';
  import Addon from './addon.vue';
  import Basic from './basic.vue';
  import Bordered from './bordered.vue';
  import Disabled from './disabled.vue';
  import HideColumn from './hide-column.vue';
  import IntervalOptions from './interval-options.vue';
  import placementVue from './placement.vue';
  import RangePicker from './range-picker.vue';
  import Size from './size.vue';
  import statusVue from './status.vue';
  import Suffix from './suffix.vue';

  export default {
    CN,
    US,
    components: {
      PlacementVue: placementVue,
      StatusVue: statusVue,
      Hours,
      Addon,
      Basic,
      Disabled,
      HideColumn,
      IntervalOptions,
      Size,
      Suffix,
      Bordered,
      RangePicker,
    },
  };
</script>

<template>
  <demo-sort>
    <Basic />
    <Bordered />
    <RangePicker />
    <Hours />
    <Addon />
    <Disabled />
    <HideColumn />
    <IntervalOptions />
    <Size />
    <Suffix />
    <StatusVue />
    <PlacementVue />
  </demo-sort>
</template>

<style>
[id^='components-time-picker-demo'] .ant-time-picker {
  margin: 0 8px 12px 0;
}
</style>
