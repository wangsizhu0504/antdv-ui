<script>
  import { defineComponent } from 'vue'
  import US from '../index.en-US.md'
  import CN from '../index.zh-CN.md'
  import Basic from './basic.vue'
  import Bordered from './bordered.vue'
  import DateRender from './date-render.vue'
  import Disabled from './disabled.vue'
  import DisabledDate from './disabled-date.vue'
  import ExtraFooter from './extra-footer.vue'
  import Format from './format.vue'
  import Mode from './mode.vue'
  import placementVue from './placement.vue'
  import PresettedRanges from './presetted-ranges.vue'
  import RangePicker from './range-picker.vue'
  import SelectInRnage from './select-in-range.vue'
  import Size from './size.vue'
  import statusVue from './status.vue'
  import Suffix from './suffix.vue'
  import Switchable from './switchable.vue'
  import Time from './time.vue'

  export default defineComponent({
    CN,
    US,
    components: {
      StatusVue: statusVue,
      PlacementVue: placementVue,
      Basic,
      DateRender,
      DisabledDate,
      Disabled,
      ExtraFooter,
      Format,
      Mode,
      PresettedRanges,
      Size,
      Switchable,
      Time,
      Suffix,
      SelectInRnage,
      Bordered,
      RangePicker,
    },
  })
</script>

<template>
  <demo-sort>
    <Basic />
    <RangePicker />
    <Bordered />
    <Format />
    <Time />
    <Disabled />
    <DisabledDate />
    <SelectInRnage />
    <PresettedRanges />
    <ExtraFooter />
    <Size />
    <DateRender />
    <Mode />
    <Switchable />
    <Suffix />
    <StatusVue />
    <PlacementVue />
  </demo-sort>
</template>

<style>
#site-example-date-picker-demo .ant-calendar-picker {
  margin: 0 8px 12px 0;
}
</style>
