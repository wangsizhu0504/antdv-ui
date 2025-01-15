<script lang="ts">
  import { defineComponent } from 'vue';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import Horizontal from './horizontal.vue';
  import InlineCollapsed from './inline-collapsed.vue';
  import Inline from './inline.vue';
  import SiderCurrent from './sider-current.vue';
  import SubmenuTheme from './submenu-theme.vue';
  import SwitchMode from './switch-mode.vue';
  import Theme from './theme.vue';
  import Vertical from './vertical.vue';

  export default defineComponent({
    CN,
    US,
    components: {
      Horizontal,
      InlineCollapsed,
      Inline,
      SiderCurrent,
      SwitchMode,
      Theme,
      Vertical,
      SubmenuTheme,
    },
  });
</script>

<template>
  <demo-sort :cols="1">
    <Horizontal />
    <Inline />
    <InlineCollapsed />
    <SiderCurrent />
    <Vertical />
    <Theme />
    <SubmenuTheme />
    <SwitchMode />
  </demo-sort>
</template>
