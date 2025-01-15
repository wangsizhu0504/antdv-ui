<script lang="ts">
  import { defineComponent } from 'vue'
  import US from '../index.en-US.md'
  import CN from '../index.zh-CN.md'
  import Basic from './basic.vue'
  import Card from './card.vue'
  import CustomizeHeader from './customize-header.vue'
  import NoticeCalendar from './notice-calendar.vue'
  import Select from './select.vue'

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      Card,
      NoticeCalendar,
      Select,
      CustomizeHeader,
    },
  })
</script>

<template>
  <demo-sort :cols="1">
    <Basic />
    <Card />
    <NoticeCalendar />
    <Select />
    <CustomizeHeader />
  </demo-sort>
</template>
