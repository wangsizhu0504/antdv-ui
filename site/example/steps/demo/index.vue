<script lang="ts">
  import { defineComponent } from 'vue';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import Clickable from './clickable.vue';
  import CustomizedProgressDot from './customized-progress-dot.vue';
  import Error from './error.vue';
  import Icon from './icon.vue';
  import Inline from './inline.vue';
  import LabelPlacement from './label-placement.vue';
  import Nav from './nav.vue';
  import ProgressDot from './progress-dot.vue';
  import Progress from './progress.vue';
  import Simple from './simple.vue';
  import SmallSize from './small-size.vue';
  import StepNext from './step-next.vue';
  import VerticalSmall from './vertical-small.vue';
  import Vertical from './vertical.vue';

  export default defineComponent({
    CN,
    US,
    components: {
      Simple,
      SmallSize,
      Icon,
      StepNext,
      Vertical,
      VerticalSmall,
      Error,
      ProgressDot,
      CustomizedProgressDot,
      Clickable,
      Nav,
      Progress,
      LabelPlacement,
      Inline,
    },
    setup() {
      return {};
    },
  });
</script>

<template>
  <demo-sort :cols="1">
    <Simple />
    <SmallSize />
    <Icon />
    <StepNext />
    <Vertical />
    <VerticalSmall />
    <Error />
    <ProgressDot />
    <CustomizedProgressDot />
    <Clickable />
    <Nav />
    <Progress />
    <LabelPlacement />
    <Inline />
  </demo-sort>
</template>
