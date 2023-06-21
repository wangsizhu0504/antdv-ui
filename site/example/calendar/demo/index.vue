<template>
  <demo-sort :cols="1">
    <Basic />
    <Card />
    <NoticeCalendar />
    <Select />
    <CustomizeHeader />
  </demo-sort>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CN from '../index.zh-CN.md'
import US from '../index.en-US.md'
import Basic from './basic.vue'
import Card from './card.vue'
import NoticeCalendar from './notice-calendar.vue'
import Select from './select.vue'
import CustomizeHeader from './customize-header.vue'

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
