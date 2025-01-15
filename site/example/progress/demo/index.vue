<script lang="ts">
  import { defineComponent } from 'vue'
  import US from '../index.en-US.md'
  import CN from '../index.zh-CN.md'
  import Circle from './circle.vue'
  import CircleDynamic from './circle-dynamic.vue'
  import CircleMicro from './circle-micro.vue'
  import CircleMini from './circle-mini.vue'
  import Dashboard from './dashboard.vue'
  import Dynamic from './dynamic.vue'
  import Format from './format.vue'
  import GradientLine from './gradient-line.vue'
  import Line from './line.vue'
  import LineMini from './line-mini.vue'
  import LineCap from './linecap.vue'
  import Segment from './segment.vue'
  import Size from './size.vue'
  import Steps from './steps.vue'

  export default defineComponent({
    CN,
    US,
    components: {
      LineDemo: Line,
      CircleDemo: Circle,
      LineMini,
      CircleMini,
      Dynamic,
      CircleDynamic,
      Format,
      Dashboard,
      Segment,
      LineCap,
      GradientLine,
      Steps,
      CircleMicro,
      Size,
    },
    setup() {
      return {}
    },
  })
</script>

<template>
  <demo-sort>
    <LineDemo />
    <CircleDemo />
    <LineMini />
    <CircleMini />
    <CircleMicro />
    <Dynamic />
    <CircleDynamic />
    <Format />
    <Dashboard />
    <Segment />
    <LineCap />
    <GradientLine />
    <Steps />
    <Size />
  </demo-sort>
</template>

<style>
[id^='components-progress-demo-'] .ant-progress {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
